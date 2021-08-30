import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

function MyHeader() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ADD8E6" />
      <Text style={styles.paragraph}>Muslim Companion Prod</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  paragraph: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MyHeader;

// https://reactnativeelements.com/docs/searchbar
// https://react-native-elements.js.org/#/search-bar (Live Demo)
