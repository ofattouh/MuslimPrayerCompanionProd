import React from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';

// Components
import Loading from './Loading';

function MosquesMapScreen() {
  return (
    <WebView
      source={{uri: 'https://www.islamicity.org/PrayerTimes/'}}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
      renderError={errorName => Alert.alert('Error: ' + errorName)}
      allowsFullscreenVideo={true}
    />
  );
}

export default MosquesMapScreen;

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
