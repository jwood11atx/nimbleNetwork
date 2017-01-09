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
        contactID: id
      }
    });
  }

  render () {
    let keys = Object.keys(this.props.dataSource._dataBlob.s1);
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(rowData, s1, rowID) =>
          <TouchableHighlight key={rowID} onPress={() => this.navigate(rowID)}>
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
});
