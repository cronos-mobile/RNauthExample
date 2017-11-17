import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import Authorization from './src/Authorization';

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={Authorization()(LoginScreen)} hideNavBar title="Login" />
          <Scene key="home" component={Authorization()(HomeScreen)} hideNavBar title="Home" />
        </Stack>
      </Router>
    );
  }
}
