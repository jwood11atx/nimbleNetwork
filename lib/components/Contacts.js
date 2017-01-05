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
      list: ''
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
        <TextInput style={{height: 40}} placeholder='add new' onChangeText={(list)=>this.setState({list})}/>
        <TouchableHighlight style={styles.textStyle} onPress={()=> this.navigate()}>
          <Text>{list}</Text>
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
