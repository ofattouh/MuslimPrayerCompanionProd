import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="" />
      <Text style={styles.paragraph}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
  },
  paragraph: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Loading;
