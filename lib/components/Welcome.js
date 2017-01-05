import React from "react";
import { View, Text } from 'react-native';

export const Welcome = (e) => {
  if(e.user){
    return (<View><Text> Welcome {e.user.email} </Text></View>)
  } else {
    return <View><Text>Sign in yo</Text></View>
  }
}
