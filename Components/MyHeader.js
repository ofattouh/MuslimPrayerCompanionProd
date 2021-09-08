import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

function MyHeader() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ADD8E6" />
      <Text style={styles.paragraph}>رفيق المسلم</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
  },
  paragraph: {
    marginLeft: '30%',
    marginTop: 23,
    fontSize: 22,
    color: '#fff',
  },
});

export default MyHeader;

// https://reactnativeelements.com/docs/searchbar
// https://react-native-elements.js.org/#/search-bar (Live Demo)
