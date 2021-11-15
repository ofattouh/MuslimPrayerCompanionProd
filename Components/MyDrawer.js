import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Components
import MyHeader from '../Components/MyHeader';
import MyTabs from '../Components/MyTabs';
import MySlider from '../Components/MySlider';

// Screens
import ProfileScreen from '../Screens/UserProfile';
import AppSettingsScreen from '../Screens/AppSettings';
import MedinaVideoScreen from '../Screens/MedinaLive';
import MakkahLiveScreen from '../Screens/MakkahLive';
import MosquesMapScreen from '../Screens/MosquesMap';
import AudioPlayerScreen from '../Screens/AudioPlayer';
import VideoPlayerScreen from '../Screens/VideoPlayer';
import VideoPlayer2Screen from '../Screens/VideoPlayer2';
import VideoPlayer3Screen from '../Screens/VideoPlayer3';
import HolyQuranScreen from '../Screens/HolyQuran';
import MyFileScreen from '../Screens/MyFile';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Details"
        onPress={() =>
          props.navigation.navigate('Details', {owner: 'My Drawer'})
        }
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="MyTabs"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        headerTitle: props => <MyHeader {...props} />,
        /* headerRight: () => (
        ), */
        headerStyle: {
          backgroundColor: '#ADD8E6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={AppSettingsScreen} />
      <Drawer.Screen name="MedinaLive" component={MedinaVideoScreen} />
      <Drawer.Screen name="MakkahLive" component={MakkahLiveScreen} />
      <Drawer.Screen name="MosquesMap" component={MosquesMapScreen} />
      <Drawer.Screen name="AudioPlayer" component={AudioPlayerScreen} />
      <Drawer.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Drawer.Screen name="VideoPlayer2" component={VideoPlayer2Screen} />
      <Drawer.Screen name="VideoPlayer3" component={VideoPlayer3Screen} />
      <Drawer.Screen name="HolyQuran" component={HolyQuranScreen} />
      <Drawer.Screen name="MySlider" component={MySlider} />
      <Drawer.Screen name="MyFileScreen" component={MyFileScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

// https://reactnavigation.org/docs/drawer-based-navigation
// https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
