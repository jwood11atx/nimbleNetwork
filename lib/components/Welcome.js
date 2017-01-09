import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export const Welcome = (e) => {
  if(e.user){
    return (<View style={styles.View}><Text style={styles.Text}>Welcome {e.user.displayName} </Text></View>)
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
