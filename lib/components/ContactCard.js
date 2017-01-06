import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';



export default class ContactCard extends Component {
  constructor(){
    super();
    this.state = {
      name: "George Michael",
      company: "Columbia Records",
      email: ["yougottahavefaith@yahoo.com"],
      phone: ["813-499-0497", "813-671-1813"],
      websites: ["http://www.georgemichael.com"],
    }
  }

  displayInfo(infoArray){
    let displayArray = infoArray.map((e, index) => {
      return <Text key={index}>{e}</Text>
    })
    return displayArray;
  }


  render() {
    return (
      <View style={styles.container}>
        <Text className="name">
          {this.state.name}
        </Text>
        <Text className="company">
          {this.state.company}
        </Text>
        <View className="email">
          {this.displayInfo(this.state.email)}
        </View>
        <View className="phone">
          {this.displayInfo(this.state.phone)}
        </View>
        <Text className="notes"></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 300,
    textAlign: 'center',
    color: 'magenta',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
