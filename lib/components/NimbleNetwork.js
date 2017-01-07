import React, { Component } from 'react';
import { Navigator } from 'react-native';

import SignIn from './SignIn';
import SignUp from "./SignUp"
import Contacts from './Contacts';
import ContactCard from './ContactCard';
import AddContact from './AddContact';


export default class NimbleNetwork extends Component {
  renderScene(route, navigator){
    if(route.title === "SignUp"){
      return <SignUp navigator={navigator} />
    }
    if(route.title === 'SignIn'){
      return <SignIn navigator={navigator} />
    }
    if(route.title === 'Contacts'){
      return <Contacts navigator={navigator} data={route.data} />
    }
    if(route.title === 'ContactCard'){
      return <ContactCard navigator={navigator} data={route.data} />
    }
    if(route.title === 'AddContact'){
      return <AddContact navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'SignIn'}}
        renderScene={this.renderScene}
      />
    );
  }
}
