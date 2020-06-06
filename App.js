import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeActivity from './components/HomeActivity';
import ProfileActivity from './components/ProfileActivity';
import VerifyScreen from './components/Verify';
import DelivererHome from './components/DelivererHome';


const RootStack = createStackNavigator(
  {
    Home: { screen: HomeActivity },
    Profile: { screen: ProfileActivity },
    Verify: { screen: VerifyScreen },
    DeliverHome: { screen: DelivererHome }
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

