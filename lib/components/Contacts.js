import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Welcome } from "./Welcome.js";
import firebase, { currentUser } from "./firebase"




export default class Contacts extends Component {
  constructor(){
    super();
    this.state = {
      list: '',
      draftMessage: '',
    }
  }

//component did mount

  navigate(){
  this.props.navigator.push({
    title: 'ContactCard',
  })
}

  render() {
    const {list} = this.state;
    return (
      <View>
        <Welcome user={this.props.data.user}/>

        <TextInput style={{height: 40}} placeholder='add new' onChangeText={(draftMessage)=>this.setState({draftMessage})}/>
        <TouchableHighlight style={styles.textStyle} onPress={()=> this.setState({list: this.state.draftMessage})}>
          <Text>button</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.textStyle} onPress={()=> this.navigate()}>
          <Text>{list}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 100,
    alignItems: 'center',
  },
});
