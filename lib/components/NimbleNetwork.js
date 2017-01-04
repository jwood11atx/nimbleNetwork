import React, { Component } from 'react';
import {Navigator} from 'react-native';

import SignIn from './SignIn';
import Contacts from './Contacts';

export default class NimbleNetwork extends Component {

  renderScene(route, navigator){
    console.log(route.title)
    if(route.title === 'SignIn'){
      console.log('bloo');
      return <SignIn navigator={navigator} />
    }
    if(route.title === 'Contacts'){
      console.log('bla');
      return <Contacts navigator={navigator} />
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
