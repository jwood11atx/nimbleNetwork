import React, { Component } from 'react';
import { signUp, signIn, signOut } from './firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import firebase from "firebase";


export default class SignUp extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems: "center"}}>
          <TextInput style={styles.inputField} placeholder="user name..." />
          <TextInput style={styles.inputField} placeholder="email..." />
          <TextInput style={styles.inputField} placeholder="password..." />
        </View>
        <TouchableHighlight>
          <Text>submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  inputField: {
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'gray',
    borderWidth: 1
  },

  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    backgroundColor: "gray",
    color: "lightgray"
  },
});
