# eLadder App

This app is built as a React Native app using [Expo](https://expo.io).

## Development

* See https://expo.io/learn to install everything necessary for getting started with expo.
* Copy example.app.json to app.json (`cp example.app.json app.json`). For local development you should not need to add any api keys.
* Run `yarn install` to install missing dependencies.
* Run `expo start` to start the application and `expo ios` or `expo android` to preview on your local simulator
* For local development the API server is presumed to be available at http://localhost:3000. Modify `app/constants/environment.js` if the API server is available elsewhere. The `--release-channel production` flag enables the usage of the apiUrl from `app.json`.
