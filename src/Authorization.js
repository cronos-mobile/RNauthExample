import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default () => {
  return (ComposedComponent) => {
    return class Authorization extends Component {
      state = {
        isLoggedIn: false,
        isLoading: true
      };

      componentDidMount() {
        AsyncStorage.getItem('@login:token')
          .then( token => {
            this.setState({ isLoggedIn: !!token, isLoading: false });
          })
          .catch( err =>{
            console.warn( 'err',  err)
          })
          .done();
      }

      render() {
        const { isLoading, isLoggedIn } = this.state;

        if (isLoading) {
          return <ActivityIndicator style={styles.loading} />;
        } else {
          return (
            <View style={styles.container}>
              <ComposedComponent {...this.props} isLoggedIn={isLoggedIn} />
            </View>
          );
        }

      }
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  }
});
