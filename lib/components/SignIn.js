import React, { Component } from 'react';
import firebase, { reference, signUp, signIn, signOut } from './firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
    }
  this.emailOnChange = this.emailOnChange.bind(this);
  this.passOnChange = this.passOnChange.bind(this);
  }

  emailOnChange(e) {
    let input = e.target.value;
    this.setState({email: input})
  }

  passOnChange(e) {
    let input = e.target.value;
    this.setState({email: input})
  }

  navigate(){
  this.props.navigator.push({
    title: 'Contacts',
  })
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nimble Network
        </Text>
        <View style={{alignItems: "center"}}>
          <TextInput className="input-email"
            style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
            placeholder="email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput className="input-pw"
            style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
            placeholder="password"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>
        <TouchableHighlight onPress={() => this.navigate() }>
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
