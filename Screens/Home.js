import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// Components
import HomeFlatList from '../Components/Home/HomeFlatList';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <HomeFlatList />
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
