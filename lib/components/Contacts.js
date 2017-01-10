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
import { Welcome } from './Welcome.js';
import AddContact from './AddContact.js';
import List from './List.js';

import firebase, { currentUser, getContactInfo, signOut } from './firebase';

export default class Contacts extends Component {
  constructor(){
    super();
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      user: ',
      dataSource: source.cloneWithRows(['Please add a contact']),
      contacts: ',
    };
  }

  componentDidMount(){
    this.getList();
  }

  componentWillUnmount(){
    signOut();
  }

  getList() {
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    getContactInfo(this.props.data.user.uid).on('value', (snapshot) => {
      if(snapshot.val()){
        let dbContactList = snapshot.val();
        let keys = Object.keys(dbContactList);
        let contactList = {};
        let followUpList = {};
        let finalList = {};

        keys.map((key) => {
          if(dbContactList[key].info.followUp){
            followUpList[key] = dbContactList[key].info.name + ' | ' + dbContactList[key].info.company + ' → follow up'
          } else {
            contactList[key] = dbContactList[key].info.name + ' | ' + dbContactList[key].info.company
          }
        })

        finalList = Object.assign(followUpList, contactList);

        this.setState({
          dataSource: source.cloneWithRows(finalList),
          contacts: snapshot.val()
        });
      }
    });
  }

  checkFollow(followUp){
    if(followUp){
      return styles.followUp;
    }
  }

  navigateAddContact() {
    this.props.navigator.push({
      title: 'AddContact',
      data: {
        user: this.props.data.user,
      }
    });
  }

  back() {
    let route = this.props.navigator.getCurrentRoutes();
    this.props.navigator.popToRoute(route[0]);
  }

  render() {
    let { height } = Dimensions.get('window');

    return (
      <View  style={styles.container}>
        <Image source={require('../resources/white-pattern.jpg')} style={styles.containerImage}>

          <View style={styles.welcome}>

            <Text
              accessibilityLabel={'welcome to network!'}>
              Welcome {this.props.data.username}
            </Text>

             <TouchableHighlight
              accessible={true}
              accessibilityLabel={'tap me to sign-out'}
              onPress={()=> this.back()}>
              <Text>Sign Out</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.background}>
            <TouchableHighlight
              accessible={true}
              accessibilityLabel={'tap me to add a new contact'}
              style={styles.button}
              onPress={()=> this.navigateAddContact()}>
              <Text>Add New</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.contacts}>
            <Text style={styles.header}>Contacts</Text>
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
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  background: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 300,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#9CE9D7',
  },

});
