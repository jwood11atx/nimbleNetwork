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
import { sendContactInfo, getContactInfo, currentUser } from "./firebase";

export default class ContactCard extends Component {
  constructor(){
    super();
    this.state = {
      userID: null,
      contactID: null,
      image: null,
      name: null,
      company: null,
      email: null,
      phone: null,
      socialMedia: null,
      followUp: null,
      notes: null,
    }
  }

  componentDidMount(){
    getContactInfo(this.props.data.user.uid, this.props.data.contactID).once("value").then((snapshot) => {
      this.setState({
        userID: this.props.data.user.uid,
        contactID: this.props.data.contactID,
        name: snapshot.val().name,
        company: snapshot.val().company,
        email: snapshot.val().email,
        phone: snapshot.val().phone,
        socialMedia: snapshot.val().socialMedia,
        image: snapshot.val().image,
        followUp: snapshot.val().followUp
        // notes: snapshot.val().notes
      })
    });
  }

  navigate() {
    console.log(this.state.followUp);
    this.props.navigator.push({
      title: 'Contacts',
      data: {
        user: this.props.data.user
      }
    });

  }

  // displayInfo(infoArray){
  //   let displayArray = infoArray.map((e, index) => {
  //     return <Text key={index}>{e}</Text>
  //   })
  //   return displayArray;
  // }

  toggleFollow(){
    !this.state.followUp ?
    this.setState({followUp: true}) :
    this.setState({followUp: false});
  }

  toggleNotesField(event) {
    this.refs.notesField.blur();
  }

  checkNotesCount(event) {
    this.setState({notes: event.nativeEvent.text})
  }

  updateContact() {
    let info = {};
    Object.keys(this.state).map((key) => {
      info[key] = this.state[key];
    });
     sendContactInfo(this.state.userID,
                    this.state.contactID,
                    info);
    this.navigate();
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
        <Text className="email">
          {this.state.email}
        </Text>
        <Text className="phone">
          {this.state.phone}
        </Text>
        <Text className="websites">
          {this.state.socialMedia}
        </Text>
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

        <TouchableHighlight onPress={()=> this.navigate()}>
          <Text>Return to List</Text>
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
