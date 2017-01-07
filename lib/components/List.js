/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class List extends Component {
  navigate() {
    this.props.navigator.push({
      title: 'ContactCard',
      data: {
        user: this.state.user
      } // need to get id to ContactCard
    });
  }

  render () {
    const { contacts } = this.props;

    const renderContacts = () => {
      return contacts.map((contact) => {
        return (
            <TouchableHighlight key={contact.id} onPress={()=> this.navigate(contact.id)}>
              <Text>{contact.name} | {contact.title} | {contact.org}</Text>
            </TouchableHighlight>
        );
      });
    }

    return (
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text>Contacts</Text>
        {renderContacts()}
      </View>
    )
  }
}
