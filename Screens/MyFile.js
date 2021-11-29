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
      // console.log('\nDir Path: ', pathDir);
      console.log('\nDir contents: ', result);

      // stat the second file only (skip first file: ReactNativeDevBundle.js)
      return Promise.all([RNFS.stat(result[1].path), result[1].path]);
    })
    .then(statResult => {
      console.log('\nstatResult: ', statResult);

      // if we have a file, read it
      if (statResult[0].isFile()) {
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then(contents => {
      Alert.alert('Contents of second File in dir:\n' + contents);
    })
    .catch(err => {
      Alert.alert('Error reading first directory file at: ' + pathDir);
      console.log(err);
    });
}

function writeMyFile() {
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  var path = pathDir + '/' + myFile;

  RNFS.writeFile(path, 'Lorem ipsum, Lorem ipsum ...', 'utf8')
    .then(success => {
      Alert.alert('File: ' + myFile + ' is successfully written!');
    })
    .catch(err => {
      console.log(err.message);
    });
}

function appendMyFile() {
  var path = pathDir + '/' + myFile;

  RNFS.appendFile(path, ', appended text ...', 'utf8')
    .then(success => {
      Alert.alert('File: ' + myFile + ' is successfully appended!');
    })
    .catch(err => {
      console.log(err.message);
    });
}

function readMyFile() {
  var path = pathDir + '/' + myFile;

  RNFS.readFile(path, 'utf8') // utf8 (default), ascii, base64 (binary files)
    .then(contents => {
      Alert.alert(contents);
    })
    .catch(err => {
      Alert.alert('Error reading File: ' + myFile);
      console.log(err.message);
    });
}

function deleteMyFile() {
  var path = pathDir + '/' + myFile;

  RNFS.unlink(path)
    .then(() => {
      Alert.alert(myFile + ' is successfully deleted!');
    })
    // `unlink` will throw an error, if the file/dir to unlink does not exist
    .catch(err => {
      Alert.alert('Error deleting ' + myFile + '! ' + err.message);
      console.log(err.message);
    });
}

function MyFileScreen({navigation}) {
  const [contents, setContent] = useState('');

  // Reads the file relative to the root of assets folder (Android only)
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
        {'Android assets file: '} {myAssetsFile} {' contents:\n'}
        {contents}
      </Text>

      <TouchableWithoutFeedback onPress={() => writeMyFile()}>
        <Text style={styles.paragraph}>Click to write To My File</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => appendMyFile()}>
        <Text style={styles.paragraph}>Click to append To My File</Text>
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

// https://github.com/cjdell/react-native-fs-test/blob/master/index.common.js
// https://dev-yakuza.posstree.com/en/react-native/react-native-fs/
// https://reactnative.dev/docs/permissionsandroid
// https://requestbin.com  // useful for testing files uploads/downloads
