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
      name: "George Michael",                             //stubbed
      company: "Columbia Records",                        //stubbed
      email: ["yougottahavefaith@yahoo.com"],             //stubbed
      phone: ["813-499-0497", "813-671-1813"],            //stubbed
      websites: ["http://www.georgemichael.com"],         //stubbed
      followUp: false,                                    //stubbed
    }
  }

  displayInfo(infoArray){
    let displayArray = infoArray.map((e, index) => {
      return <Text key={index}>{e}</Text>
    })
    return displayArray;
  }

  toggleFollow(){
    this.state.followUp ?
    this.setState({followUp: false}) :
    this.setState({followUp: true});
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          className="follow-up"
          onPress={() => this.toggleFollow()}>
            <Text
              style={[styles.button, this.state.followUp && styles.follow]}>follow up</Text>
        </TouchableHighlight>

        <TouchableHighlight
          className="destroy">
            <Text>remove</Text>
        </TouchableHighlight>

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
    textAlign: 'center',
    color: 'magenta',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    backgroundColor: "gray",
    color: "lightgray"
  },

  follow: {
    backgroundColor: "lime",
    color: "black"
  }
});
