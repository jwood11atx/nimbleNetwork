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
    // let testArr = [<Text>test1</Text>, <Text>test2</Text>, <Text>test3</Text>];
    this.state = {
      dataSource: source.cloneWithRows(["Please add a contact"]),
      contacts: "",
      // testArr: source.cloneWithRows(testArr)
    };
  }

  componentDidMount(){
    this.getList()
  }

  getList() {
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    getContactInfo(this.props.user.uid).once("value").then((snapshot) => {
      let dbContactList = snapshot.val();
      let keys = Object.keys(dbContactList);
      let contactList = {};
      keys.map((key) => {
        let { name, company, contactID} = dbContactList[key].info;
        contactList[contactID] = name + " | " + company
      })
      this.setState({
        dataSource: source.cloneWithRows(contactList),
        contacts: snapshot.val()
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
    let keys = Object.keys(this.state.dataSource._dataBlob.s1);
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, s1, rowID) =>
            <TouchableHighlight key={rowID} onPress={() => this.navigate(rowID)}>
              <Text
                style={styles.textStyle}>
                {rowData}
              </Text>
            </TouchableHighlight>
          }/>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 15,
  },
});
