/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

export default class List extends Component {
  navigate() {
    this.props.navigator.push({
      title: 'ContactCard'
      // need to get id to ContactCard
    });
  }

  render () {
    const { contacts } = this.props;

    const renderContacts = () => {
      return contacts.map((contact) => {
        return (
            <TouchableHighlight onPress={()=> this.navigate()}>
              <Text>{contact.name} | {contact.title} | {contact.org}</Text>
            </TouchableHighlight>
        );
      });
    }

    return (
      <View>
        <Text>Contacts</Text>
        {renderContacts()}
      </View>
    )
  }
}
