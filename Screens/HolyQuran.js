import * as React from 'react';
import {SafeAreaView, Dimensions, StyleSheet, Alert} from 'react-native';

import Pdf from 'react-native-pdf';

function HolyQuranScreen({navigation}) {
  const source = {
    // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    // uri: 'https://d1.islamhouse.com/data/ar/ih_books/single_01/ar_Mushaf_Almadina_L.pdf',
    // uri: 'https://d1.islamhouse.com/data/ar/ih_books/single_01/ar_Mushaf_Almadina.pdf',
    uri: 'bundle-assets://pdf/Quran.pdf',
    cache: true,
  };

  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf'};

  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

  return (
    <SafeAreaView style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}, path: ${filePath}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          Alert('File is not available. Try again later' + error);
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default HolyQuranScreen;

// https://islamhouse.com/en/books/5256/
