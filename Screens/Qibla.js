import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Image, Tile} from 'react-native-elements';

// use FocusAwareStatusBar instead of StatusBar from React Native to work for tabs
function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

function QiblaScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#ADD8E6" />

      <Text style={styles.paragraph}>Image</Text>

      <Image
        containerStyle={{}}
        onLongPress={() => console.log('onLongPress()')}
        onPress={() => console.log('onPress()')}
        placeholderStyle={{}}
        // transitionDuration={1000}
        source={{
          uri: 'https://picsum.photos/500/500.jpg?random=' + Math.random(),
        }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Text style={styles.paragraph}>Tile</Text>

      <Tile
        imageSrc={require('../Uploads/salah-times.png')}
        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
        featured
        caption="Some Caption Text"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  paragraph: {
    padding: 15,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
    paddingHorizontal: 24,
  },
  image: {
    marginTop: 15,
    width: 370,
    // width: '100%',
    height: 200,
  },
});

export default QiblaScreen;

// https://reactnativeelements.com/docs/image
// https://react-native-elements.js.org/#/image (Live Demo)

// https://react-native-elements.js.org/#/card
// https://reactnativeelements.com/docs/card/

// https://react-native-elements.js.org/#/tile
// https://reactnativeelements.com/docs/tile/
