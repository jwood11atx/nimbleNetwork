/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { getContactInfo } from "./firebase"


export default class List extends Component {
  constructor(){
    super();
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      contacts: source.cloneWithRows(["Please add a contact"]),
    };
  }

  componentDidMount(){
    this.getList()
  }

  getList() {
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    getContactInfo(this.props.uid).once("value").then((snapshot) => {
      let dbContactList = snapshot.val();
      let keys = Object.keys(dbContactList);
      let contactList = {};
      keys.map((key) => {
        let { name, company, contactID} = dbContactList[key].info;
        contactList[contactID] = name + " | " + company
      })
      this.setState({
        contacts: source.cloneWithRows(contactList)
      })
    });
  }

  navigate(id) {
    this.props.navigator.push({
      title: 'ContactCard',
      data: {
        user: this.props.user,
        contactID: id
      } // need to get id to ContactCard
    });
  }

  render () {
    return (
        <ListView
          dataSource={this.state.contacts}
          renderRow={(rowData) =>
            <Text
              style={styles.textStyle}>
              {rowData}
            </Text>}/>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 15,
  },
});
