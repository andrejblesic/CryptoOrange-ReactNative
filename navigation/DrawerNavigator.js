import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinkScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  drawerBackgroundColor: '#282c34',
  edgeWidth: 0,
  contentOptions: {
    activeTintColor: 'orange',
    inactiveTintColor: 'white'
  }
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Link: {
      screen: LinkScreen
    },
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);
