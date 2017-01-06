import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export const Welcome = (e) => {
  if(e.user){
    return (<View style={styles.textStyle}><Text style={{color: '#FFFFFF'}}> Welcome {e.user.email} </Text></View>)
  } else {
    return <View style={styles.textStyle}><Text>Sign in yo</Text></View>
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    alignItems: 'center',
  },
});
