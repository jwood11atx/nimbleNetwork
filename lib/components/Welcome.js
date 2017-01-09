import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export const Welcome = (e) => {
  if(e.displayName){
    return (<View style={styles.textStyle}><Text style={styles.Text}>Welcome {e.displayName} </Text></View>)
  } else {
    return <View style={styles.View}><Text>Sign in yo</Text></View>
  }
}

const styles = StyleSheet.create({
  View: {
    alignItems: 'flex-start',
  },

  Text: {
    fontSize: 20,
  },
});
