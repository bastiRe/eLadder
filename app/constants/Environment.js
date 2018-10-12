import { Constants } from "expo";
import { Platform } from "react-native";

const ENV = {
  dev: {
    // Genymotion accesses localhost through 10.0.3.2
    // apiUrl:
    //   Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.3.2:3000"
    apiUrl: "http://192.168.178.23:3000"
  },
  prod: {
    apiUrl: Constants.manifest.extra.apiUrl
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("development") !== -1) return ENV.dev;
  if (env.indexOf("production") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
