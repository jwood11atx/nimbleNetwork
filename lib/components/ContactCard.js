import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';



export default class ContactCard extends Component {
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>Bla!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 40,
    textAlign: 'center',
    color: 'magenta',
  },
});
