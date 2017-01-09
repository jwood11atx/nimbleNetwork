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
  // constructor(){
  //   super();
  //   const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     dataSource: source.cloneWithRows(["Please add a contact"]),
  //     contacts: "",
  //   };
  // }

  // componentDidMount(){
  //   this.getList()
  // }

  // getList() {
  //   const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //
  //   getContactInfo(this.props.user.uid).once("value").then((snapshot) => {
  //     let dbContactList = snapshot.val();
  //     let keys = Object.keys(dbContactList);
  //     let contactList = {};
  //     keys.map((key) => {
  //       let { name, company, contactID} = dbContactList[key].info;
  //       contactList[contactID] = name + " | " + company
  //     })
  //     this.setState({
  //       dataSource: source.cloneWithRows(contactList),
  //       contacts: snapshot.val()
  //     })
  //   });
  // }

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
