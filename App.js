import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginScreen} hideNavBar initial title="Login" />
          <Scene key="home" component={HomeScreen} hideNavBar title="Home" />
        </Stack>
      </Router>
    );
  }
}
