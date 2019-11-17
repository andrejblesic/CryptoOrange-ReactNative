import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinkScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const WIDTH = Dimensions.get('window').width;

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Link: {
    screen: LinkScreen
  },
  Settings: {
    screen: SettingsScreen
  }
});

export default createAppContainer(DrawerNavigator);
