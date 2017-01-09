/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Image
} from 'react-native';
import { Welcome } from "./Welcome.js";
import AddContact from "./AddContact.js";
import List from "./List.js";

import firebase, { currentUser, getContactInfo, signOut } from "./firebase";

export default class Contacts extends Component {
  constructor(){
    super();
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      user: "",
      dataSource: source.cloneWithRows(["Please add a contact"]),
      contacts: "",
    };
  }

  componentDidMount(){
    this.getList();
    this.setState({user: this.props.data.user})
  }

  getList() {
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    getContactInfo(this.props.data.user.uid).on("value", (snapshot) => {
      if(snapshot.val()){
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
      }
    });
  }

  navigateAddContact() {
    this.props.navigator.push({
      title: 'AddContact',
      data: {
        user: this.props.data.user,
        getList: this.getList.bind(this)
      }
    });
  }

  navigateSignIn() {
    this.props.navigator.push({
      title: 'SignIn',
    });
  }

  back() {
    this.props.navigator.pop({
      title: 'SignIn',
    })
  }

  render() {
    let { height } = Dimensions.get('window');

    return (
      <View  style={styles.container}>
        <Image source={require('./network.png')} style={styles.containerImage}>
        <View style={styles.welcome}>
          <Welcome
            displayName={this.props.data.username}/>
          <TouchableHighlight
            onPress={()=> {signOut(); this.navigateSignIn()}}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.contacts}>Contacts</Text>

        <View style={styles.background}>
          <TouchableHighlight
            style={[styles.button, styles.buttonInput]}
            onPress={()=> this.navigateAddContact()}>
            <Text>Add New</Text>
          </TouchableHighlight>
        </View>

        <List
          dataSource={this.state.dataSource}
          contacts={this.state.contacts}
          user={this.props.data.user}
          navigator={this.props.navigator}/>

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    alignItems: 'center'
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    backgroundColor: '#9CE9D7',
    marginTop: 20,
    padding: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contacts: {
    alignSelf: 'stretch',
    fontSize: 30,
    padding: 20,
    marginLeft: 20,
    backgroundColor: "rgba(0,0,0,0)"
  },
  background: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonInput: {
    height: 50,
    width: 300,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#9CE9D7',
  }
});
