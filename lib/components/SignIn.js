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
import firebase from "firebase"


export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: 'Jwood11atx@gmail.com', //stubbed for quick access ("")
      pass: 'Password',              //stubbed for quick access ("")
      user: null
    }
  }

  componentDidMount(){
    signOut();
  }

  getCurrentUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({user});
      }
      else {
        this.setState({user: null});
      }
    }.bind(this));
  }

  navigate(num){
    let count;
    if(this.state.user){
      this.props.navigator.push({
        title: 'ContactCard',           //stubbed for bypass ("Contacts")
        data: {
          user: this.state.user
        }
      })
    } else {
      if(num === 0){
        alert("Login attempt timed out.")
        return false;
      } else if (!num) {
        count = 100;
      } else {
        count = num;
        count--;
      }
      setTimeout(this.navigate.bind(this), 100, count)
    }
  }

  handleChange() {
    this.getCurrentUser();
    this.setState({email: "", pass: ""});
    this.navigate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nimble Network
        </Text>

        <TouchableHighlight onPress={() => signUp(this.state.email, this.state.pass) }>
          <Text>Sign Up</Text>
        </TouchableHighlight>

        <View style={{alignItems: "center"}}>
          <TextInput className="input-email"
          style={{height: 40, width: 300, justifyContent: "center", alignItems: "center", borderColor: 'gray', borderWidth: 1}}
          placeholder="email"
          onChangeText={(input) => this.setState({email: input})}
          value={this.state.email}
          />

          <TextInput className="input-pw"
          style={{height: 40, width: 300, justifyContent: "center", alignItems: "center", borderColor: 'gray', borderWidth: 1}}
          placeholder="password"
          onChangeText={(input) => this.setState({pass: input})}
          value={this.state.pass}
          />

        </View>

        <TouchableHighlight onPress={() => {signIn(this.state.email, this.state.pass), this.handleChange()}}>
          <Text>Sign In</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => console.log(this.state)}>
          <Text>test</Text>
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
