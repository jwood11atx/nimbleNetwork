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
  constructor() {
    super();
    this.state = {
      user: "",
      username: '',
      email: '',
      password: ''
    }
  }

  navigateContacts(){
    this.props.navigator.push({
      title: 'Contacts',           //stubbed for bypass ("Contacts")
      data: {
        user: this.state.user
      }
    })
  }

  handleChange(){
    this.sendUserInfo();
    this.setDisplayName();
  }


  sendUserInfo() {
    const {email, password} = this.state;
    signUp(email, password);
  }

  setDisplayName() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.username = this.state.username;
        this.setState({user});
        this.navigateContacts();
      }
    }.bind(this));
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems: "center"}}>
          <TextInput
            style={styles.inputField}
            placeholder="user name..."
            onChange={(e) => this.setState({username: e.nativeEvent.text})}
           />
          <TextInput
            style={styles.inputField}
            placeholder="email..."
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="password..."
            onChange={(e) => this.setState({password: e.nativeEvent.text})}
          />
        </View>
        <TouchableHighlight
          onPress={this.handleChange.bind(this)}>
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
    backgroundColor: '#F5FCFF'
  },

  inputField: {
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10
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
