/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

export default class List extends Component {
  constructor(){
    super();
    // this.state = {
    //   contacts: ""
    // }
  }

  componentDidMount() {
    // console.log(this.props);
  }

  navigate() {
    this.props.navigator.push({
      title: 'ContactCard',
      data: {
        user: '',
      } // need to get id to ContactCard
    });
  }


  displayContactsList(){
    const { contacts } = this.props;
    let list = [];
    if(contacts){
      Object.keys(contacts).map((key) => {
        let contact = contacts[key].info;
        list.push(
          <TouchableHighlight key={contact.contactID} onPress={()=> this.navigate(contact.contactID)}>
               <Text style={styles.textStyle}>{contact.name}   {contact.company}</Text>
          </TouchableHighlight>
        )
      })
      return list;
    }
  }

  render () {
    return (
        <View style={styles.textStyle}>
          {this.displayContactsList()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 15,
  },
});
