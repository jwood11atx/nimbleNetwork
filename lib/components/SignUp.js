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
      title: 'Contacts',
      data: {
        user: this.state.user,
        username: this.state.username
      }
    })
  }

  // navigateContacts(num){
  //   let count;
  //   if(this.state.user){
  //     this.props.navigator.push({
  //       title: 'Contacts',
  //       data: {
  //         user: this.state.user
  //       }
  //     })
  //   } else {
  //     if(num === 0){
  //       alert("Login attempt timed out.")
  //       return false;
  //     } else if (!num) {
  //       count = 100;
  //     } else {
  //       count = num;
  //       count--;
  //       console.log(count);
  //     }
  //     setTimeout(this.navigateContacts.bind(this), 100, count)
  //   }
  // }

back() {
  this.props.navigator.pop({
    title: 'SignIn',
  });
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
        user.updateProfile({displayName: this.state.username})
        this.setState({user});
        this.navigateContacts();
      }
    }.bind(this));
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.contacts}>Sign Up</Text>
          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder="user name..."
            onChange={(e) => this.setState({username: e.nativeEvent.text})}
           />
          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder="email..."
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
          />
          <TextInput
            secureTextEntry={true}
            style={[styles.buttonInput, styles.input]}
            placeholder="password..."
            onChange={(e) => this.setState({password: e.nativeEvent.text})}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonInput, styles.button]}
          onPress={this.handleChange.bind(this)}>
          <Text>submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonInput, styles.button]}
          onPress={() => this.back()}>
          <Text>cancel</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contacts: {
    marginTop: 50,
    alignSelf: 'stretch',
    fontSize: 30,
  },
  buttonInput: {
    height: 50,
    width: 300,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#9CE9D7',
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
  }
});
