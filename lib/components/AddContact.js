/*jshint esversion: 6 */
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Dimensions
} from 'react-native';

export const AddContact = () => {
  let { height } = Dimensions.get('window');
  return (
    <View style={{backgroundColor: '#C0C0C0', height: height}}>

      <TextInput style={{height: 40, marginTop: 50, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter a Name'/>

      <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Title'/>

      <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Organization'/>

      <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>Add</Text>
      </TouchableHighlight>

      <TouchableHighlight style={{marginTop: 20, alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>Cancel</Text>
      </TouchableHighlight>
      
    </View>
  );
};
