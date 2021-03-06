import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { HOST } from './constants';

class LoginScreen extends Component {
  state = {
    username: '',
    password: ''
  };

  componentWillMount() {
    if (this.props.isLoggedIn) {
      Actions.home();
    }

  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  }

  login = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return;
    }

    axios.post(`${HOST}/sessions/create`, { username, password })
    .then( response => response.data)
    .then( data => {
      this.saveItem('@login:token', data.id_token);
      Alert.alert('Login Success!', 'Welcome');

      Actions.home();
    })
    .catch( err => {
      if (err.response.status === 401) {
        Alert.alert('Error!', err.response.data);
      } else {
        Alert.alert('Error!', err.message);
      }
    });
  }

  render() {

    return (
      <KeyboardAvoidingView
        style={styles.wrap}
        behavior="padding">
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.title}>Sign In</Text>

            <Image
              style={styles.image}
              source={require('./images/security.png')} />
          </View>

          <View style={styles.form} >
            <TextInput
              style={styles.input}
              underlineColorAndroid="#474955"
              placeholderTextColor="#6e6f78"
              placeholder="Enter your user"
              onChangeText={(username) => this.setState({ username }) }
              returnKeyType='next'
              value={this.state.username} />

            <TextInput
              style={styles.input}
              underlineColorAndroid="#474955"
              placeholderTextColor="#6e6f78"
              placeholder="Enter your password"
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
              returnKeyType='next'
              value={this.state.password} />
          </View>

          <Button
            color="#0bd38a"
            title="Sign In"
            onPress={this.login} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#333642'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  header: {
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 15,
  },
  form: {
    marginTop: 40,
    marginBottom: 10
  },
  input: {
    color: 'white',
    backgroundColor: '#474955',
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 10
  }
});

export default LoginScreen;
