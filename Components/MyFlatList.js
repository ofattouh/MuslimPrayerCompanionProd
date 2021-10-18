import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  // ActivityIndicator,
  Image,
} from 'react-native';

const data = [
  {
    id: '1',
    content: 'الله اكبر',
  },
  {
    id: '2',
    content:
      'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
  },
  {
    id: '3',
    content: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِين',
  },
  {
    id: '4',
    content:
      'رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ',
  },
  {
    id: '5',
    content: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={styles.content}>{item.content}</Text>
  </TouchableOpacity>
);

const MyFlatList = () => {
  // const [selectedId, setSelectedId] = useState(null);

  const renderSeparator = () => {
    return <SafeAreaView style={styles.separator} />;
  };

  /* const renderHeader = () => {
    return (
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Header</Text>
      </SafeAreaView>
    );
  }; */

  /*
    const renderFooter = () => {
      return (
        <SafeAreaView style={styles.footer}>
          <Text style={styles.title}>Footer</Text>
        </SafeAreaView>
      );
    };
  */

  // the index corresponding to this item in the data array.
  const renderItem = ({item, index, separators}) => {
    // const backgroundColor = item.id === selectedId ? '#fff' : '#fff';
    // const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        // backgroundColor={{backgroundColor}}
        // textColor={{color}}
        // onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // keyExtractor={item => item.id} // The default extractor checks item.key, then item.id, and then falls back to using the index
        // extraData={selectedId} // FlatList will re-render for any state changes outside of the data prop since it is pure component
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    width: '97%',
    padding: 10,
  },
  content: {
    // paddingTop: 10,
    // paddingBottom: 10,
    fontSize: 35,
    paddingRight: 35,
    fontFamily: '_PDMS_Saleem_QuranFont',
    // fontFamily: 'Al-Qalam-Quran-Majeed',
    // fontFamily: 'Me-Quran-Volt-Newmet',
  },
  item: {
    // marginVertical: 10,
    // marginHorizontal: 5,
    margin: 5,
    height: 250,
    width: '100%',
  },
  separator: {
    height: 1,
    backgroundColor: '#ADD8E6',
  },
  image: {
    // width: 370,
    width: '100%',
    height: 300,
  },
  header: {
    backgroundColor: '#CECE',
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    height: 50,
    width: 450,
  },
  /*
  footer: {
    borderTopWidth: 1,
    borderColor: '#CED0CE',
    backgroundColor: '#CECE',
    padding: 10,
    height: 70,
    width: 450,
  }, */
});

export default MyFlatList;

// https://reactnative.dev/docs/flatlist
// https://reactnative.dev/docs/sectionlist (sectioned)
// https://reactnative.dev/docs/virtualizedlist (mutable data instead of plain arrays, improves memory consumption and performance of large lists)

// https://reactnativeelements.com/docs/
// https://react-native-elements.js.org/#/card (Live Demo)
// https://reactnativeelements.com/docs/listitem/ (contacts with avatar)

// http://quran.mursil.com/Web-Print-Publishing-Quran-Text-Graphics-Fonts-and-Downloads/fonts-optimized-for-quran
