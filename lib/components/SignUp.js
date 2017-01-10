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
import firebase from 'firebase';


export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      username: '',
      email: '',
      password: ''
    };
  }

  navigateContacts(){
    this.props.navigator.push({
      title: 'Contacts',
      data: {
        user: this.state.user,
        username: this.state.username
      }
    });
  }

  back() {
    this.props.navigator.pop();
  }

  handleChange(){
    let { username, email, password } = this.state;


    if(username &&
      password.length > 6 &&
      /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm.test(email)){
      this.sendUserInfo();
      this.setDisplayName();
    }

    if(!(/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm.test(email))){
      alert('Please enter a valid email.')
    }
    else if(Number(password.length) < 6){
      alert('Password must be 6 characters long.')
    }
  }

  sendUserInfo() {
    const {email, password} = this.state;
    signUp(email, password);
  }

  setDisplayName(num) {
    let count;
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({displayName: this.state.username});
        this.setState({user});
      }
    }.bind(this));

    if(this.state.user){
      this.navigateContacts();
    } else {
      if(num === 0){
        return false;
      } else if (!num) {
        count = 50;
      } else {
        count = num;
        count--;
        unsubscribe();
      }
      setTimeout(this.setDisplayName.bind(this), 50, count);
    }
    unsubscribe();
  }

render(){
  return (
    <View style={styles.container}>
      <Image source={require('../resources/white-pattern.jpg')} style={styles.container}>

        <View>
          <Text
            style={styles.contacts}
            accessibilityLabel={'header'}>
            Sign Up
          </Text>

          <TextInput
            accessible={true}
            accessibilityLabel={'username input for signup'}
            autoCapitalize='none'
            style={[styles.buttonInput, styles.input]}
            placeholder='Set your username...'
            onChange={(e) => this.setState({username: e.nativeEvent.text})}
           />
          <TextInput
            accessible={true}
            accessibilityLabel={'email input for signup'}
            autoCapitalize='none'
            style={[styles.buttonInput, styles.input]}
            placeholder='Your email...'
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
          />
          <TextInput
            accessible={true}
            accessibilityLabel={'password input for signup'}
            autoCapitalize='none'
            secureTextEntry={true}
            style={[styles.buttonInput, styles.input]}
            placeholder='Set your password...'
            onChange={(e) => this.setState({password: e.nativeEvent.text})}
          />
        </View>

        <TouchableHighlight
          accessible={true}
          accessibilityLabel={'tap me to submit'}
          style={[styles.buttonInput, styles.button]}
          onPress={this.handleChange.bind(this)}>
          <Text>submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          accessible={true}
          accessibilityLabel={'tap me to cancel'}
          style={[styles.buttonInput, styles.button]}
          onPress={() => this.back()}>
          <Text>cancel</Text>
        </TouchableHighlight>

      </Image>
    </View>
  );
}
};

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
  backgroundColor: 'transparent',
},
buttonInput: {
  height: 45,
  width: 300,
  marginTop: 15,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  borderWidth: 1,
},
button: {
  backgroundColor: '#9CE9D7',
},
input: {
  paddingLeft: 10,
}
});
