/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

export default class List extends Component {
  navigate(id) {
    this.props.navigator.push({
      title: 'ContactCard',
      id: id
    });
  }

  render () {
    const { contacts } = this.props;

    const renderContacts = () {
      return contacts.map((contact) => {
        return (
          <TouchableHighlight onPress={()=> this.navigate(contact.id)}>
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
