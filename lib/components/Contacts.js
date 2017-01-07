/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Welcome } from "./Welcome.js";
import AddContact from "./AddContact.js";
import List from "./List.js";

import firebase, { currentUser, getContactInfo } from "./firebase";

export default class Contacts extends Component {
  constructor(){
    super();
    this.state = {
      contacts: ""
    };
  }

  componentDidMount(){
    // getContactInfo(this.props.data.user.uid)
    // this.setState({contacts: this.getList()})
    this.getList()
  }

  getList() {
    getContactInfo(this.props.data.user.uid).once("value").then((snapshot) => {
      this.setState({
        contacts: snapshot.val()
      })
      // console.log(snapshot.val());
      // return snapshot.val();
    });
  }

  navigate() {
    this.props.navigator.push({
      title: 'AddContact',
      data: {
        user: this.props.data.user
      }
    });
  }


  render() {
    let { height } = Dimensions.get('window');
    const { contacts } = this.state;
    return (
      <View  style={{backgroundColor: '#C0C0C0', height: height}}>

        <Welcome user={this.props.data.user}/>

        <View style={styles.textStyle}>
          <List contacts={contacts} navigator={this.props.navigator}/>
        </View>



        <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#98cb00'}} onPress={()=> this.navigate()}>
          <Text>Add New</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#98cb00'}} onPress={() => console.log(this.state)}>
          <Text>test</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    alignItems: 'center'
  },
});
