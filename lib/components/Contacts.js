import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';



export default class Contacts extends Component {
  constructor(){
    super();
    this.state = {
      list: ['george', 'phillip', 'juan']
    }
  }

  navigate(){
  this.props.navigator.push({
    title: 'ContactCard',
  })
}

  render() {
    return (
      <View>
        <TouchableHighlight style={styles.textStyle} onPress={()=> this.navigate()}>
          <Text>{this.state.list[1]}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 300,
    alignItems: 'center',
  },
});
