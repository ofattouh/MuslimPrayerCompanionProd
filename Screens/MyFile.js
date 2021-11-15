import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  // TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';

var RNFS = require('react-native-fs');

const myFile = 'test.txt';
const myAssetsFile = 'myFile.txt';
const pathDir = RNFS.DocumentDirectoryPath;

// get a list of files and directories in the main bundle
function readMyDir() {
  RNFS.readDir(pathDir)
    .then(result => {
      console.log('\nDir Path: ', pathDir);
      console.log('\nDir contents: ', result);

      // stat the second file only (skip first file: ReactNativeDevBundle.js)
      return Promise.all([RNFS.stat(result[1].path), result[1].path]);
    })
    .then(statResult => {
      // if we have a file, read it
      if (statResult[0].isFile()) {
        console.log('\nSecond File: ', statResult);
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then(contents => {
      Alert.alert('Contents of second File in dir:\n' + contents);
      console.log(contents);
    })
    .catch(err => {
      Alert.alert(err.message);
      console.log(err.message, err.code);
    });
}

function writeMyFile() {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  var path = pathDir + '/' + myFile;

  RNFS.writeFile(path, 'Lorem ipsum, Lorem ipsum ...', 'utf8')
    .then(success => {
      console.log(path);
      Alert.alert('File is successfully written!');
    })
    .catch(err => {
      console.log(err.message);
    });
}

function readMyFile() {
  var path = pathDir + '/' + myFile;

  RNFS.readFile(path, 'utf8')
    .then(contents => {
      Alert.alert(contents);
    })
    .catch(err => {
      Alert.alert('Error reading ' + myFile);
      console.log(err.message);
    });
}

function deleteMyFile() {
  var path = pathDir + '/' + myFile;

  RNFS.unlink(path)
    .then(() => {
      Alert.alert(myFile + ' is deleted!');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch(err => {
      Alert.alert(myFile + ' ' + err.message);
      console.log(err.message);
    });
}

function MyFileScreen({navigation}) {
  const [contents, setContent] = useState('');

  // Android app's assets folder. Android Only
  RNFS.readFileAssets(myAssetsFile, 'ascii')
    .then(file => {
      setContent(file);
    })
    .catch(err => {
      Alert(err.message);
      console.log(err.message, err.code);
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        {'Android Assets File:\n'}
        {contents}
      </Text>

      <TouchableWithoutFeedback onPress={() => writeMyFile()}>
        <Text style={styles.paragraph}>Click to write To File</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => readMyFile()}>
        <Text style={styles.paragraph}>Click to read My File</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => deleteMyFile()}>
        <Text style={styles.paragraph}>Click to delete My File</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => readMyDir()}>
        <Text style={styles.paragraph}>Click to read My Dir</Text>
      </TouchableWithoutFeedback>
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
    padding: 20,
    fontSize: 17,
  },
});

export default MyFileScreen;
