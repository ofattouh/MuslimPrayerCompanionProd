/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

function DetailsScreen({route, navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Details Screen</Text>
      <Text style={styles.paragraph}>
        {route?.params?.owner ? `${route.params.owner}'s Details` : ''}
      </Text>
      <Text>{'\n'}</Text>

      <Button
        buttonStyle={{width: 150}}
        containerStyle={{margin: 5}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => navigation.goBack()}
        title="Go Back"
        titleProps={{}}
        titleStyle={{marginHorizontal: 5}}
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
  image: {
    width: 350,
    height: 250,
  },
});

export default DetailsScreen;

// https://reactnativeelements.com/docs/button
// https://react-native-elements.js.org/#/button (Live Demo)
