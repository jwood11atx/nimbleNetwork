/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import { sendContactInfo } from './firebase';

export default class AddContact extends Component {
  constructor(){
    super();
    this.state = {
      contactID: Date.now(),
      name: '',
      company: '',
      email: '',
      secEmail: '',
      socialMedia: '',
      secSocialMedia: '',
      phone: '',
      secPhone: '',
      image: '',
      notes: '',
      followUp: false
    };
  }


  navigateContacts(){
    this.props.navigator.pop();
  }

  addContact() {
    let info = {};
    let { uid, displayName } = this.props.data.user
    Object.keys(this.state).map((key) => {
      info[key] = this.state[key];
    });
    sendContactInfo(uid, this.state.contactID, info);
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
        <Image source={require('../resources/white-pattern.jpg')} style={styles.container}>
          <View>
            <Text
              style={styles.contacts}
              accessibilityLabel={'header'}>
              Add New Contact
            </Text>

            <TextInput
              accessible={true}
              accessibilityLabel={'Name of new contact'}
              style={[styles.buttonInput, styles.input]}
              placeholder='Enter a Name'
              onChange={(e) => this.setState({name: e.nativeEvent.text})}
              value={this.state.name}
            />

            <TextInput
              accessible={true}
              accessibilityLabel={'Company of new contact'}
              style={[styles.buttonInput, styles.input]}
              placeholder='Enter Organization'
              onChange={(e) => this.setState({company: e.nativeEvent.text})}
              value={this.state.company}
            />

            <TextInput
              accessible={true}
              accessibilityLabel={'Email of new contact'}
              autoCapitalize='none'
              style={[styles.buttonInput, styles.input]}
              placeholder='Enter email'
              onChange={(e) => this.setState({email: e.nativeEvent.text})}
              value={this.state.email}
            />

            <TextInput
              accessible={true}
              accessibilityLabel={'Phone number of new contact'}
              style={[styles.buttonInput, styles.input]}
              placeholder='Enter a Phone Number'
              onChange={(e) => this.setState({phone: e.nativeEvent.text})}
              value={this.state.phone}
            />

            <TextInput
              accessible={true}
              accessibilityLabel={'Social media of new contact'}
              autoCapitalize='none'
              style={[styles.buttonInput, styles.input]}
              placeholder='Social Media'
              onChange={(e) => this.setState({socialMedia: e.nativeEvent.text})}
              value={this.state.socialMedia}
            />
          </View>

          <TouchableHighlight
            accessible={true}
            accessibilityLabel={'tap me to add this contact'}
            style={[styles.button, styles.buttonInput]}
            onPress={(this.addContact.bind(this))}>
            <Text>Add</Text>
          </TouchableHighlight>

          <TouchableHighlight
            accessible={true}
            accessibilityLabel={'tap me to add cancel'}
            style={[styles.button, styles.buttonInput]}
            onPress={() => this.back()}>
            <Text>Cancel</Text>
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
