import React, { Component } from 'react';
import firebase, { signUp, signIn, signOut } from './firebase';
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
      user: null
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

  renderScene(route, navigator){
    switch (route.id) {
      case "Contacts":
      return <Contacts navigator={navigator} data={route.data} />
    }
  }

  navigate(){
    this.props.navigator.push({
      id: 'Contacts',
      data: {
        user: this.state.user
      }
    })
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

        <TouchableHighlight onPress={() => signIn(this.state.email, this.state.pass), () => this.handleChange(), () => this.navigate()}>
          <Text>Sign In</Text>
        </TouchableHighlight>

      </View>




      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Nimble Network
      //   </Text>
      //
      //   <View style={{alignItems: "center"}}>
      //     <TextInput className="input-email"
      //       style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
      //       placeholder="email"
      //       onChangeText={(email) => this.setState({email})}
      //       value={this.state.email}
      //     />
      //
      //     <TextInput className="input-pw"
      //       style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
      //       placeholder="password"
      //       onChangeText={(email) => this.setState({email})}
      //       value={this.state.email}
      //     />
      //   </View>
      //
      //   <TouchableHighlight onPress={() => this.navigate() }>
      //     <Text>Sign In</Text>
      //   </TouchableHighlight>
      // </View>
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
