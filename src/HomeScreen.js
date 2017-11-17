import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class HomeScreen extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      Actions.login();
    }
  }

  logout = () => {
    AsyncStorage.removeItem('@login:token')
      .then( ()=> {
        Actions.login();
      })
      .catch( err => {
        console.log('AsyncStorage error', err.message);
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home page</Text>
        <Text>This is a example about authentication</Text>

        <TouchableOpacity onPress={this.logout}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default HomeScreen;
