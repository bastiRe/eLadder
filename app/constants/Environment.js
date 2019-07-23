import Constants from 'expo-constants';
import { Platform } from "react-native";

const ENV = {
  dev: {
    // Genymotion accesses localhost through 10.0.3.2
    // apiUrl:
    //   Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.3.2:3000"
    apiUrl: Constants.manifest.extra.apiUrl.dev
  },
  prod: {
    apiUrl: Constants.manifest.extra.apiUrl.prod
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("development") !== -1) return ENV.dev;
  if (env.indexOf("production") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
