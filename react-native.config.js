module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // ONLY works for fonts
};

// npx react-native link
// link command will ONLY links fonts in Info.plst for IOS and creates fonts directory for Android
// and auto copies custom fonts to: android/app/src/main/assets/fonts

// https://github.com/react-native-community/cli/blob/master/docs/configuration.md#migration-guide
// https://mehrankhandev.medium.com/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4
// https://medium.com/@aravindmnair/add-custom-fonts-to-react-native-0-60-easily-in-3-steps-fcd71459f4c9
