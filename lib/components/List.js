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
    console.log(this.props);
    this.props.navigator.push({
      title: 'ContactCard',
      data: {
        user: this.props.user,
        contactID: id,
        username: this.props.user.displayName
      }
    });
  }

  followUpCheck(contactID) {
    let contact = this.props.contacts[contactID];
    if (contact){
      let style;
      contact.info.followUp ?
      style = styles.followUp :
      style = styles.textStyle;
      return style;
    }
  }

  render () {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(rowData, s1, rowID) =>
          <TouchableHighlight
            key={rowID}
            style={this.followUpCheck(rowID)}
            onPress={() => this.navigate(rowID)}>
            <Text
              style={styles.textStyle}>
              {rowData}
            </Text>
          </TouchableHighlight>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 15,
    width: Dimensions.get("window").width,
  },
  followUp: {
    width: Dimensions.get("window").width,
    height: 30,
    backgroundColor: 'magenta'
  }
});
