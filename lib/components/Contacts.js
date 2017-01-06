/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Welcome } from "./Welcome.js";
import { AddContact } from "./AddContact.js";
import List from "./List.js";

import firebase, { currentUser } from "./firebase";

export default class Contacts extends Component {
  constructor(){
    super();
    this.state = {
      //contacts: get firebase list
      fakeContacts: [
        {
          id: 1,
          name: 'josh',
          title: 'wizard',
          org: 'xyz'
        },
        {
          id: 2,
          name: 'justin',
          title: 'wheelbarrel',
          org: 'zzz'
        }
      ]
    };
  }

  navigate() {
    this.props.navigator.push({
      title: 'AddContact'
    });
  }

  render() {
    let { height } = Dimensions.get('window');
    const { fakeContacts } = this.state;
    return (
      <View  style={{backgroundColor: '#C0C0C0', height: height}}>

        <Welcome user={this.props.data.user}/>

        <List contacts={fakeContacts} navigator={this.props.navigator}/>

        <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#98cb00'}} onPress={()=> this.navigate()}>
          <Text>Add New</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   textStyle: {
//     marginTop: 20,
//     alignItems: 'center'
//   },
// });
