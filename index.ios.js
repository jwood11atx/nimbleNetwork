import React, { Component } from 'react';
import { Welcome } from "./lib/components/Welcome.js"
import firebase, { currentUser, signUp, signIn, signOut } from './lib/components/firebase';
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
      user: null
    }
  }

  componentDidMount() {
    console.log(this.state.user);
  }

  handleChange() {
    this.setState({email: "", pass: "", user: currentUser});
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nimble Network
        </Text>

        <Welcome user={this.state.user}/>

        <TouchableHighlight onPress={() => signUp(this.state.email, this.state.pass) }>
          <Text>Sign Up</Text>
        </TouchableHighlight>



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

        <TouchableHighlight onPress={() => signIn(this.state.email, this.state.pass), ()=> this.handleChange()}>
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
