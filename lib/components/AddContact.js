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
      company: "",
      email: "",
      socialMedia: "",
      phone: "",
      image: "",
      followUp: false
    };
  }

  navigateContacts(){
    this.props.navigator.push({
      title: 'Contacts',           //stubbed for bypass ("Contacts")
      data: {
        user: this.props.data.user
      }
    });
  }

  addContact() {
    let info = {};
    let { uid, displayName } = this.props.data.user
    Object.keys(this.state).map((key) => {
      info[key] = this.state[key];
    });
    sendContactInfo(uid, this.state.contactID, info);
    // this.props.data.getList();
    this.navigateContacts();
  }

  setStateArray(key, e) {
    let tempArray = this.state[key];
    tempArray[0] = (e.nativeEvent.text);
    this.setState({[key]: tempArray});
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
            value={this.state.name}
          />

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter Organization'
            onChange={(e) => this.setState({company: e.nativeEvent.text})}
            value={this.state.company}
          />

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter email'
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
            value={this.state.email}
          />

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Enter a Phone Number'
            onChange={(e) => this.setState({phone: e.nativeEvent.text})}
            value={this.state.phone}
          />

          <TextInput
            style={[styles.buttonInput, styles.input]}
            placeholder='Social Media'
            onChange={(e) => this.setState({socialMedia: e.nativeEvent.text})}
            value={this.state.socialMedia}
          />
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
    height: 45,
    width: 300,
    marginTop: 15,
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
