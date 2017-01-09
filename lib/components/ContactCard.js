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
      secEmail: null,
      phone: null,
      secPhone: null,
      socialMedia: null,
      secSocialMedia: null,
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
        secEmail: snapshot.val().secEmail,
        phone: snapshot.val().phone,
        secPhone: snapshot.val().secPhone,
        socialMedia: snapshot.val().socialMedia,
        secSocialMedia: snapshot.val().secSocialMedia,
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

  checkNotesCount(event) {
    this.setState({notes: event.nativeEvent.text});
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
            accessible={true}
            accessibilityLabel={'tap me to toggle follow-up status'}
            style={styles.TouchableHighlight}
            className="follow-up"
            onPress={() => this.toggleFollow()}>
              <Text
                style={[styles.button, this.state.followUp && styles.follow]}>
                Follow-up
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              accessible={true}
              accessibilityLabel={'tap me to remove this contact'}
              style={styles.TouchableHighlight}
              className="destroy"
              onPress={() => {this.removeContact()}}>
                <Text style={styles.button}>
                  Remove
                </Text>
              </TouchableHighlight>
        </View>

        <TextInput
          accessible={true}
          accessibilityLabel={'name of contact'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.name}
          onChange={(e) => this.setState({name: e.nativeEvent.text})}
          value={this.state.name}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact organization'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({company: e.nativeEvent.text})}
          value={this.state.company}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact primary email'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({email: e.nativeEvent.text})}
          value={this.state.email}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact secondary email'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({secEmail: e.nativeEvent.text})}
          value={this.state.secEmail}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact primary phone'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({phone: e.nativeEvent.text})}
          value={this.state.phone}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact secondary phone'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({secPhone: e.nativeEvent.text})}
          value={this.state.secPhone}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact primary social media'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({socialMedia: e.nativeEvent.text})}
          value={this.state.socialMedia}
        />

        <TextInput
          accessible={true}
          accessibilityLabel={'contact secondary social media'}
          autoCapitalize="none"
          selectTextOnFocus={true}
          style={styles.data}
          onChange={(e) => this.setState({secSocialMedia: e.nativeEvent.text})}
          value={this.state.secSocialMedia}
        />

        <Text></Text>
        <View style={styles.footer}>
          <View>
            <TextInput ref="notesField"
              accessible={true}
              accessibilityLabel={'notes input for additional information'}
              style={styles.notesField}
              placeholder="Additional information..."
              multiline={true}
              onChange={this.checkNotesCount.bind(this)}
              value={this.state.notes}
            />
          </View>

          <TouchableHighlight
            accessible={true}
            accessibilityLabel={'tap me to update this contact'}
            style={styles.buttonBottom}
            onPress={this.updateContact.bind(this)}>
            <Text>Update Contact</Text>
          </TouchableHighlight>

          <TouchableHighlight
            accessible={true}
            accessibilityLabel={'tap me to return to your full list'}
            style={styles.buttonBottom}
            onPress={()=> this.navigate()}>
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
    flexDirection: 'row',
    marginBottom: 10
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
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    height: 18,
    width: 200
  },

  data: {
    marginLeft: 5,
    marginTop: 8,
    padding: 2,
    fontSize: 16,
    height: 24,
    width: 250
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
