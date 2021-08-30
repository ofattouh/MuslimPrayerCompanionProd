import * as React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Settings Screen</Text>
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

export default SettingsScreen;
