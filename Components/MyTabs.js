import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../Screens/Home';
import DetailsScreen from '../Screens/Details';
import QiblaScreen from '../Screens/Qibla';
import PrayersScreen from '../Screens/Prayers';
import CommunityScreen from '../Screens/Community';
import SettingsScreen from '../Screens/Settings';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ADD8E6',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Qibla') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Prayers') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // Any other component: https://ionic.io/ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="Qibla" component={QiblaScreen} />
      <Tab.Screen name="Prayers" component={PrayersScreen} />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;

// https://reactnavigation.org/docs/tab-based-navigation
