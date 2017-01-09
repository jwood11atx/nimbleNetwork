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
      email: 'jwood11atx@gmail.com',        //stubbed for quick access ("")
      pass: 'password',              //stubbed for quick access ("")
      user: null
    };
  }

  componentDidMount(){
    signOut();
    this.setState({user: null});
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
    if(this.state.user && this.props.navigator.state.routeStack.length === 1){
      this.props.navigator.push({
        title: 'Contacts',
        data: {
          user: this.state.user,
          username: this.state.user.displayName
        }
      });
    } else {
      if(num === 0){
        return false;
      } else if (!num) {
        count = 25;
      } else {
        count = num;
        count--;
      }
      setTimeout(this.navigateContacts.bind(this), 25, count);
    }
  }

  navigateSignUp(){
    this.props.navigator.push({
      title: "SignUp"
    });
  }

  handleChange() {
    signIn(this.state.email, this.state.pass);
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
          onPress={() => this.handleChange()}>
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
