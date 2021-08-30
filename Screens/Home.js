import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// Components
import MyFlatList from '../Components/MyFlatList';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <MyFlatList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
