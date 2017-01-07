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
import AddContact from "./AddContact.js";
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
      ],
      contacts: '',
    };
  }

componentDidMount() {
  console.log(this.props.data.user);
  // let contacts = getContactInfo()
}

  navigate() {
    console.log(this);
    this.props.navigator.push({
      title: 'AddContact',
      data: {
        user: this.props.data.user
      }
    });
  }

  back() {
    this.props.navigator.pop({
      title: 'AddContact',
    })
  }


  render() {
    // let { height } = Dimensions.get('window');
    const { fakeContacts } = this.state;
    return (
      <View  style={styles.container}>

        <Welcome user={this.props.data.user}/>

        <List contacts={fakeContacts} navigator={this.props.navigator}/>

        <TouchableHighlight
          style={styles.button}
          onPress={()=> this.navigate()}>
          <Text>Add New</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={()=> this.back()}>
          <Text>SignOut</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={()=> console.log(this.state)}>
          <Text>log</Text>
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
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    paddingLeft: 10,
    backgroundColor: '#DBDBDB',
  },
  button: {
    backgroundColor: '#9CE9D7',
  }
});
