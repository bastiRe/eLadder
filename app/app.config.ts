import "dotenv/config";

export default {
  expo: {
    name: "eLadder",
    description:
      "eLadder is a small app to create an online league to keep track of your games of Fifa, Foosball or similar. You can create a league, share your league with friends and keep track of your games. An ELO-algorithm calculates each player's points based on their games and gives you a table that never lies about who's currently the best among your league.",
    slug: "eLadder",
    privacy: "public",
    version: "2.3.2",
    orientation: "portrait",
    primaryColor: "#33B67A",
    icon: "./assets/icons/icon.png",
    scheme: "eladder",
    assetBundlePatterns: ["assets/*"],
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
      backgroundColor: "#33B67A"
    },
    notification: {
      icon: "./assets/icons/icon.png",
      color: "#33B67A"
    },
    packagerOpts: {
      assetExts: ["ttf"]
    },
    ios: {
      bundleIdentifier: "de.sebastianrehm.eladder",
      icon: "./assets/icons/ios-icon.png",
      buildNumber: "2.4.0",
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      package: "de.sebastianrehm.eladder",
      icon: "./assets/icons/icon.png",
      versionCode: 10
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "sebastian-rehm",
            project: "eladderapp",
            authToken: process.env.SENTRY_AUTH_TOKEN
          }
        }
      ]
    },
    extra: {
      sentryDsn: process.env.SENTRY_DSN,
      amplitudeKey: process.env.AMPLITUDE_KEY,
      endpointUrl: process.env.ENDPOINT_URL
    },
    plugins: [
      "sentry-expo",
      [
        "expo-camera",
        {
          cameraPermission:
            "This app uses the camera to scan qr codes to add other user's leagues."
        }
      ]
    ]
  }
};
