import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Welcome = (e) => {
  if(e.displayName){
    return (<View style={styles.textStyle}>
      <Text
        accessibilityLabel={'welcome to network!'}
        style={styles.Text}>
        Welcome {e.displayName}
      </Text>
    </View>)
  } else {
    return <View style={styles.View}>
      <Text
        accessibilityLabel={'Please sign in!'}>
        Please sign in
      </Text>
    </View>
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
