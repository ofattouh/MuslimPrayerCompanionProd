import * as React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function PrayersScreen({navigation}) {
  return (
    <WebView
      // default whitelisted origins are http:// and https:// - (all)
      originWhitelist={['*']}
      source={{
        html:
          '<div>' +
          '<iframe width="940" height="350" border="0" scrolling="no" src="https://www.islamicfinder.org/prayer-widget/"></iframe>' +
          '<hr style="margin-bottom: 140px;" />' +
          '<iframe width="940" height="1160" src="https://www.youtube.com/embed/su1qwW56Rco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
          '</div>',
      }}
      containerStyle={styles.screenContainer}
    />
  );
}

export default PrayersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    margin: '1%',
    // backgroundColor: '#212121',
  },
});

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
// https://www.islamicfinder.org/widgets/#prayertimeswidget
