/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Welcome } from "./Welcome.js";
import AddContact from "./AddContact.js";
import List from "./List.js";

import firebase, { currentUser, getContactInfo, signOut } from "./firebase";

export default class Contacts extends Component {

  navigateAddContact() {
    this.props.navigator.push({
      title: 'AddContact',
      data: {
        user: this.props.data.user
      }
    });
  }

  navigateSignIn() {
    this.props.navigator.push({
      title: 'SignIn',
    });
  }

  back() {
    this.props.navigator.pop({
      title: 'AddContact',
    })
  }

  render() {
    let { height } = Dimensions.get('window');

    return (
      <View  style={styles.container}>
        <View style={styles.welcome}>
          <Welcome
            user={this.props.data.user}/>
          <TouchableHighlight
            onPress={()=> {signOut(); this.navigateSignIn()}}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.contacts}>Contacts</Text>

        <View style={styles.background}>

          <TouchableHighlight
            style={[styles.button, styles.buttonInput]}
            onPress={()=> this.navigateAddContact()}>
            <Text>Add New</Text>
          </TouchableHighlight>
        </View>

        <List
          uid={this.props.data.user.uid}
          navigator={this.props.navigator}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    backgroundColor: '#9CE9D7',
    marginTop: 20,
    padding: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contacts: {
    alignSelf: 'stretch',
    fontSize: 30,
    padding: 20,
    marginLeft: 20,
  },
  background: {
    alignSelf: 'stretch',
    alignItems: 'center',
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
  }
});
