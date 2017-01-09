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
import { sendContactInfo, getContactInfo, currentUser, removeContact } from "./firebase";

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
    };
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
        followUp: snapshot.val().followUp,
        notes: snapshot.val().notes
      });
    });
  }

  navigate() {
    this.props.navigator.push({
      title: 'Contacts',
      data: {
        user: this.props.data.user
      }
    });

  }

  toggleFollow(){
    !this.state.followUp ?
    this.setState({followUp: true}) :
    this.setState({followUp: false});
  }

  // toggleNotesField(event) {
  //   this.refs.notesField.blur();
  // }

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

  removeContact() {
    removeContact(this.state.userID, this.state.contactID);
    this.navigate();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.TouchableHighlight}
            className="follow-up"
            onPress={() => this.toggleFollow()}>
            <Text
              style={[styles.button, this.state.followUp && styles.follow]}>Follow-up</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.TouchableHighlight}
              className="destroy"
              onPress={() => {this.removeContact()}}
              >
                <Text style={styles.button}>Remove</Text>
              </TouchableHighlight>
        </View>

        <Text
          style={styles.name}
          className="name">
          {this.state.name}
        </Text>
        <Text
          style={styles.data}
          className="company">
          {this.state.company}
        </Text>
        <Text
          style={styles.data}
          className="email">
          {this.state.email}
        </Text>
        <Text
          style={styles.data}
          className="phone">
          {this.state.phone}
        </Text>
        <Text
          style={styles.data}
          className="websites">
          {this.state.socialMedia}
        </Text>

        <Text></Text>
        <View style={styles.footer}>
          <View>
            <TextInput ref="notesField" style={styles.notesField} placeholder="Notes..." multiline={true} onChange={this.checkNotesCount.bind(this)}
            value={this.state.notes}/>
          </View>

          <TouchableHighlight style={styles.buttonBottom} onPress={this.updateContact.bind(this)}>
            <Text>Update Contact</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonBottom} onPress={()=> this.navigate()}>
            <Text>Return to List</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: 'magenta',
  },

  header: {
    justifyContent: 'center',
    flexDirection: 'row'
  },

  footer: {
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  TouchableHighlight: {
    width: 160,
    height: 40,
    margin: 5
  },

  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "gray",
    color: "lightgray"
  },

  follow: {
    backgroundColor: "#9CE9D7",
    color: "black"
  },

  name: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },

  data: {
    marginLeft: 5,
    marginTop: 8,
    padding: 2,
    fontSize: 16
  },

  notesField: {
    height: 150,
    width: 300,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 14
  },

  buttonBottom: {
    backgroundColor: '#9CE9D7',
    height: 45,
    width: 300,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }
});
