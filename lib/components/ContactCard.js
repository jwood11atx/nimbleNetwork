import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { sendContactInfo, getContactInfo } from "./firebase";

export default class ContactCard extends Component {
  constructor(){
    super();
    this.state = {
      userID: "",
      img: "",
      name: "",             
      company: "",
      email: [],
      phone: [],
      websites: [],
      followUp: false,
      notes: "",
    }
  }

  componentDidMount(){
    getContactInfo("testID").once("value").then((snapshot) => {
      this.setState({
        userID: "testID",
        name: snapshot.val().name,
        company: snapshot.val().company,
        email: snapshot.val().email,
        phone: snapshot.val().phone,
        img: snapshot.val().img,
        notes: snapshot.val().notes
      })
    });
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

  toggleNotesField(event) {
    this.refs.notesField.blur();
  }

  checkNotesCount(event) {
    this.setState({notes: event.nativeEvent.text})
  }

  updateContact() {
    sendContactInfo(this.state.userID,
                    this.state.name,
                    this.state.company,
                    this.state.email,
                    this.state.phone,
                    this.state.img,
                    this.state.notes);
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

        <View>
          <TextInput ref="notesField" style={styles.notesField} placeholder="Notes..." multiline={true} onChange={this.checkNotesCount.bind(this)}
          value={this.state.notes}/>
        </View>

        <TouchableHighlight onPress={this.toggleNotesField.bind(this)}>
          <Text>add note</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.updateContact.bind(this)}>
          <Text>update contact</Text>
        </TouchableHighlight>
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
  },

  notesField: {
    height: 300,
    width: 300,
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 18
  }
});
