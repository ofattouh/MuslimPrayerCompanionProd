import * as React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';

function CommunityScreen({navigation}) {
  const [value, setValue] = React.useState('');
  const searchTerm = value !== '' ? 'You searched: ' + value : '';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>My Community</Text>

      <SearchBar
        platform="default"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={newVal => setValue(newVal)}
        onClearText={() => alert(value + 'is cleared!')}
        placeholder="Search listings..."
        placeholderTextColor="#888"
        round
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => alert(value + 'is cancelled!')}
        value={value}
      />

      <Text style={styles.paragraph}>{searchTerm}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    padding: 15,
    fontSize: 17,
  },
});

export default CommunityScreen;

// https://react-native-elements.js.org/#/search-bar (Live Demo)
// https://reactnativeelements.com/docs/searchbar/
