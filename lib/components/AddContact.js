/*jshint esversion: 6 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Dimensions
} from 'react-native';
import { sendContactInfo } from "./firebase";

export default class AddContact extends Component {
  constructor(){
    super();
    this.state = {
      contactID: Date.now(),
      name: "",
      email: "",
      company: "",
    }
  }

  addContact() {
    let info = {};
    Object.keys(this.state).map((key) => {
      info[key] = this.state[key];
    })
    sendContactInfo("testdisplayname2", this.state.contactID, info)
  }

  render(){
    let {height} = Dimensions.get("window");
    return (
      <View style={{backgroundColor: '#C0C0C0', height: height}}>
        <TextInput
          style={{height: 40, marginTop: 50, textAlign: 'center', backgroundColor: '#98cb00'}}
          placeholder='Enter a Name'
          onChange={(e) => this.setState({name: e.nativeEvent.text})}
          value={this.state.name}/>

        <TextInput
          style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Organization'
          onChange={(e) => this.setState({company: e.nativeEvent.text})}
          value={this.state.company}/>

        <TextInput
          style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Email'
          onChange={(e) => this.setState({email: e.nativeEvent.text})}
          value={this.state.email}/>

        <TouchableHighlight
          style={{marginTop: 20, alignItems: 'center', backgroundColor: '#ffffff'}}
          onPress={(this.addContact.bind(this))}>
          <Text>Add</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#ffffff'}}
          onPress={() => console.log(this.props)}>
          <Text>Cancel</Text>
        </TouchableHighlight>

      </View>
    );
  }
};
