import * as React from 'react';
import {WebView} from 'react-native-webview';

function PrayersScreen({navigation}) {
  return (
    <WebView
      // default whitelisted origins are http:// and https:// - (all)
      originWhitelist={['*']}
      source={{
        html:
          '<div>' +
          '<h2>Salah Times</h2>' +
          '<iframe style="width: 582px; height: 358px; border: 0;" scrolling="no" src="https://www.islamicfinder.org/prayer-widget/"></iframe>' +
          '</div>',
      }}
      style={{marginTop: 5}}
      containerStyle={{flex: 0, height: '100%'}}
    />
  );
}

export default PrayersScreen;

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
// https://www.islamicfinder.org/widgets/#prayertimeswidget
