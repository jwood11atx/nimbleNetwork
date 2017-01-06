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
import firebase, { currentUser } from "./firebase";

export default class Contacts extends Component {
  constructor(){
    super();
    this.state = {
      //contacts: get firebase list
      fakeContacts: [
        {
          id: 1,
          name: 'josh',
          title: 'wizard',
          org: 'xyz'
        },
        {
          id: 2,
          name: 'justin',
          title: 'wheelbarrel',
          org: 'zzz'
        }
      ]
    };
  }

//component did mount

  render() {
    let { height, width } = Dimensions.get('window');
    const { fakeContacts } = this.state;
    return (
      <View  style={{backgroundColor: '#C0C0C0', height: height}}>
        <Welcome user={this.props.data.user}/>

        <List contacts={fakeContacts} navigator={this.props.navigator}/>

        <AddContact/>

        <TouchableHighlight style={styles.textStyle} onPress={()=> this.navigate()}>
          <Text>{list}</Text>
        </TouchableHighlight>
        <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter a Name' onChangeText={(draftMessage)=>this.setState({draftMessage})}/>
        <TouchableHighlight style={styles.textStyle} onPress={()=> this.setState({list: this.state.draftMessage})}>
          <Text>Add</Text>
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
