/**
 * Muslim Prayer Companion App
 * https://muslimprayercompanion.com
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// ToDo: Fix/ignore Android react native Reanimated 2 warnings
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

// Components
import MyDrawer from './Components/MyDrawer';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

// yarn install // will install all package.json dependancies
// npx react-native init MyApp
// npx react-native run-android
// c:\>adb devices

// Run with xcode IDE
// c:\>CD ios
// npx pod-install // will install all ios dependancies defined in ios/podfile

// Debug (Android)
// cd android && ./gradlew clean
// npx react-native start --reset-cache
// 192.168.0.10:8081          // c:\>ipconfig
