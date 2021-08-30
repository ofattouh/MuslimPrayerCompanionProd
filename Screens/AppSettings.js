import * as React from 'react';
import {Text, Button, SafeAreaView, StyleSheet} from 'react-native';

function AppSettingsScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>App Settings</Text>
      <Text>{'\n'}</Text>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Text>{'\n'}</Text>

      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      <Text>{'\n'}</Text>

      <Button
        onPress={() => navigation.navigate('Profile')}
        title="My Profile"
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

export default AppSettingsScreen;
