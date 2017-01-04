import React, { Component } from 'react';
import firebase, { reference, signUp, signIn, signOut } from './lib/components/firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

export default class nimbleNetwork extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
    }
  }

  onChange(e) {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nimble Network
        </Text>
        <TextInput onChangeText={this.onChange}></TextInput>
        <TextInput onChangeText={this.onChange}></TextInput>
        <TouchableHighlight onPress={() => signUp() }>
          <Text>Sign In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nimbleNetwork', () => nimbleNetwork);
