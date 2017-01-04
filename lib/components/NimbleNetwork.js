import React, { Component } from 'react';
import {Navigator} from 'react-native';

import SignIn from './SignIn';

export default class NimbleNetwork extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'SignIn', index: 0 }}
        renderScene={(route, navigator) => {
        return <SignIn title={route.title} />
      }}
      />
    );
  }
}
