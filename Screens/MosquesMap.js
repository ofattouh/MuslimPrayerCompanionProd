import React from 'react';
import {WebView} from 'react-native-webview';

// Components
import Loading from './Loading';

function MosquesMapScreen() {
  return (
    <WebView
      source={{uri: 'http://radio.garden/listen/al-quran-al-karem/GQxvGBNK'}}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
      renderError={errorName => alert('Error: ' + errorName)}
      allowsFullscreenVideo={true}
    />
  );
}

export default MosquesMapScreen;

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
