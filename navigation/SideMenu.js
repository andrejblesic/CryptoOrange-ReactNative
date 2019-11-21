import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DrawerNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LinksScreen from './screens/LinksScreen';

const sideMenu = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Links: {
    screen: <Text>eeeeeeeee</Text>
  },
  Settings: {
    screen: SettingsScreen
  }
});
