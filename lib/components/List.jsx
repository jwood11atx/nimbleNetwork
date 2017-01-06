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
      <Text>Contacts</Text>
    )

    );
  }

}


  const renderContacts = () {
    return contacts.map((contact) => {
      return (

        <TouchableHighlight onPress={()=> this.navigate(contact.id)}>
          <Text>{list}</Text>
        </TouchableHighlight>


        <ContactCard navigator={navigator} key={contact.id} {...contact}/>
      );
    });
  }
};

export default List;
