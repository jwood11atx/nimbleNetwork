import React, { Component } from 'react';
import {Navigator} from 'react-native';

import SignIn from './SignIn';
import Contacts from './Contacts';
import ContactCard from './ContactCard';

export default class NimbleNetwork extends Component {

  renderScene(route, navigator){
    console.log(route.title)
    if(route.title === 'SignIn'){
      console.log('bloo');
      return <SignIn navigator={navigator} />
    }
    if(route.title === 'Contacts'){
      return <Contacts navigator={navigator} />
    }
    if(route.title === 'ContactCard'){
      return <ContactCard navigator={navigator} />
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
