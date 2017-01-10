/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ListView,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { getContactInfo } from "./firebase";


export default class List extends Component {

  navigate(id) {
    this.props.navigator.push({
      title: 'ContactCard',
      data: {
        user: this.props.user,
        contactID: id,
        username: this.props.user.displayName
      }
    });
  }

  followUpCheck(contactID, listview) {
    let contact = this.props.contacts[contactID];
    if (contact){
      let style;
      contact.info.followUp ?
      style = styles.followUp :
      style = styles.textStyle;
      return style;
    }
  }

  textFollowUpCheck(contactID, listview) {
    let contact = this.props.contacts[contactID];
    if (contact){
      let style;
      contact.info.followUp ?
      style = styles.textFollowUp :
      style = styles.textStyle;
      return style;
    }
  }

  render () {
    return (
      <ListView
        removeClippedSubviews={false}
        dataSource={this.props.dataSource}
        renderRow={(rowData, s1, rowID) =>
          <TouchableHighlight
            key={rowID}
            style={[styles.button, this.followUpCheck(rowID, this)]}
            onPress={() => this.navigate(rowID)}>
            <Text
              style={this.textFollowUpCheck(rowID, this)}>
              {rowData}
            </Text>
          </TouchableHighlight>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  textFollowUp: {
    color: 'white',
  },
  followUp: {
    backgroundColor: "#0F9CB4",
  },
  button: {
    maxWidth: Dimensions.get('window').width,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#82CCD8',
  },
});
