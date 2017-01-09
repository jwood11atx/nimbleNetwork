import React, { Component } from 'react';
import { signUp, signIn, signOut } from './firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
} from 'react-native';
import firebase from "firebase"


export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: 'Adam@gmail.com', //stubbed for quick access ("")
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

  navigateContacts(num){
    let count;
    if(this.state.user){
      this.props.navigator.push({
        title: 'Contacts',
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
        console.log(count);
      }
      setTimeout(this.navigateContacts.bind(this), 100, count)
    }
  }

  navigateSignUp(){
    this.props.navigator.push({
      title: "SignUp"
    })
  }

  handleChange() {
    this.getCurrentUser();
    this.setState({email: "", pass: ""});
    this.navigateContacts();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./ocean.png')} style={styles.container}>
        <Image source={require('./lobsta.png')}></Image>
        <Text style={styles.welcome}>
          Network
        </Text>


        <View>
          <TextInput
            className="input-email"
            style={[styles.buttonInput, styles.input]}
            placeholder="email"
            onChangeText={(input) => this.setState({email: input})}
            value={this.state.email}
          />

          <TextInput
            secureTextEntry={true}
            className="input-pw"
            style={[styles.buttonInput, styles.input]}
            placeholder="password"
            onChangeText={(input) => this.setState({pass: input})}
            value={this.state.pass}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonInput, styles.button]}
          onPress={() => {signIn(this.state.email, this.state.pass), this.handleChange()}}>
          <Text>Sign In</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonInput, styles.button]}
          onPress={() => this.navigateSignUp()}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: '#3D4145',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 40,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonInput: {
    height: 50,
    width: 300,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#9CE9D7',
    borderWidth: 1,
  }
});
