import * as React from 'react';
import {Text, Button, SafeAreaView, StyleSheet} from 'react-native';

function ProfileScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>My Profile</Text>
      <Text>{'\n'}</Text>

      <Button
        onPress={() => navigation.navigate('Settings')}
        title="My Settings"
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
  paragraph: {
    padding: 15,
    fontSize: 17,
  },
});

export default ProfileScreen;

// https://react-native-elements.js.org/#/button
