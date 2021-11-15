import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, Alert} from 'react-native';

// require the module
var RNFS = require('react-native-fs');

function MyFileScreen({navigation}) {
  const [contents, setContent] = useState('');

  // Android app's assets folder. Android Only
  RNFS.readFileAssets('myFile.txt', 'ascii')
    .then(file => {
      setContent(file);
    })
    .catch(err => {
      Alert(err.message);
      console.log(err.message, err.code);
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>{contents}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    padding: 15,
    fontSize: 17,
  },
});

export default MyFileScreen;
