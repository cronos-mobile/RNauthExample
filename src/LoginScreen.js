import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class LoginScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;
