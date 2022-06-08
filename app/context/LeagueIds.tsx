import React, {
  Context,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Amplitude from "expo-analytics-amplitude";

const storageKey = "@leagueIds";

interface LeagueIdsContextData {
  leagueIds: string[];
  addLeagueId: (leagueId: string) => void;
  removeLeagueId: (leagueId: string) => Promise<void>;
}

const LeagueIdsContext: Context<LeagueIdsContextData | null> = createContext(
  null
);

// fetches leagueIds originally stored via apollo-cache-persist
const getApolloIds = async (): Promise<string[]> => {
  const dataString = await AsyncStorage.getItem("apollo-cache-persist");
  const data = JSON.parse(dataString);
  // remove to prevent future conflicts
  await AsyncStorage.removeItem("apollo-cache-persist");
  return data?.ROOT_QUERY?.leagueIds?.json;
};

const getStoredIds = async (): Promise<string[]> => {
  const dataString = await AsyncStorage.getItem(storageKey);
  const savedIds = JSON.parse(dataString);
  return savedIds;
};

const storeIds = async (leagueIds: string[]): Promise<void> => {
  return AsyncStorage.setItem(storageKey, JSON.stringify(leagueIds));
};

const LeagueIdsProvider: React.FC = ({ children }) => {
  const initialLeagueIds: string[] = [];
  const [leagueIds, setLeagueIds] = useState(initialLeagueIds);

  useEffect(() => {
    const getStoredLeagueIds = async () => {
      let storedIds = await getApolloIds();
      if (storedIds && storedIds.length) {
        storeIds(storedIds);
      } else {
        storedIds = await getStoredIds();
      }

      if (storedIds && storedIds.length) {
        setLeagueIds(storedIds);
      }
    };
    getStoredLeagueIds();
  }, []);

  const addLeagueId = (leagueId: string) => {
    const newLeagueIds = leagueIds.concat(leagueId);
    storeIds(newLeagueIds);
    setLeagueIds(newLeagueIds);
  };

  const removeLeagueId = async (leagueId: string) =>
    // eslint-disable-next-line
    new Promise(resolve => {
      Alert.alert(
        "Remove League?",
        "Do you really want to remove this league from your device?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false)
          },
          {
            text: "OK",
            onPress: async () => {
              const newLeagueIds = leagueIds.filter(id => id !== leagueId);
              storeIds(newLeagueIds);
              setLeagueIds(newLeagueIds);
              resolve(true);
              Amplitude.logEventWithPropertiesAsync("RemoveLeague", {
                leagueId
              });
            }
          }
        ]
      );
    });

  return (
    <LeagueIdsContext.Provider
      value={{
        leagueIds,
        addLeagueId,
        removeLeagueId
      }}
    >
      {children}
    </LeagueIdsContext.Provider>
  );
};

function useLeagueIds(): LeagueIdsContextData {
  const context = useContext(LeagueIdsContext);

  if (!context) {
    throw new Error("useLeagueIds must be used within an LeagueIdsProvider");
  }

  return context;
}

export { LeagueIdsContext, LeagueIdsProvider, useLeagueIds };
