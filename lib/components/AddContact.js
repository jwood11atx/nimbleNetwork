/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { sendContactInfo } from "./firebase";

export default class AddContact extends Component {
  constructor(){
    super();
    this.state = {
      contactID: Date.now(),
      name: "",
      email: "",
      company: "",
    }
  }

  navigateContacts(){
    this.props.navigator.push({
      title: 'Contacts',           //stubbed for bypass ("Contacts")
      data: {
        user: this.props.data.user
      }
    })
  }

  addContact() {
    let info = {};
    let { uid, displayName } = this.props.data.user
    Object.keys(this.state).map((key) => {
      info[key] = this.state[key];
    })
    sendContactInfo(uid, this.state.contactID, info);
    this.navigateContacts()
  }

  back() {
    this.props.navigator.pop({
      title: 'AddContact',
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.contacts}>Add New Contact</Text>
          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter a Name'
            onChange={(e) => this.setState({name: e.nativeEvent.text})}
            value={this.state.name}/>

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter Organization'
            onChange={(e) => this.setState({company: e.nativeEvent.text})}
            value={this.state.company}/>

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter Email'
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
            value={this.state.email}/>
        </View>

        <TouchableHighlight
          style={[styles.button, styles.buttonInput]}
          onPress={(this.addContact.bind(this))}>
          <Text>Add</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.buttonInput]}
          onPress={() => this.back()}>
          <Text>Cancel</Text>
        </TouchableHighlight>

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
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
  }
});
