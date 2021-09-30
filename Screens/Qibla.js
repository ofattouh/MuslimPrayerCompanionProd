import * as React from 'react';
import {WebView} from 'react-native-webview';

function QiblaScreen({navigation}) {
  return (
    <WebView
      source={{
        // uri: 'https://can01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fqiblafinder.withgoogle.com%2Fintl%2Far%2Fonboarding%2Fpermissions&data=04%7C01%7Comohamed%40pshsa.ca%7C17c32b36ae5a41998f7408d9773bb012%7Ce532b7e25101423f99287703cf273614%7C0%7C0%7C637671920501992808%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=3HYMBmwPc8E%2FujxE3P8FZI2oA%2Bth3tYbBqbBgOMSq8M%3D&reserved=0',
        uri: 'https://www.verywellhealth.com/exercises-you-can-do-with-therapy-putty-2696612'
      }}
      startInLoadingState={true}
      renderLoading={() => console.log('<Loading />')}
      renderError={errorName => alert('Error: ' + errorName)}
      allowsFullscreenVideo={true}
    />
  );
}

export default QiblaScreen;

// https://reactnativeelements.com/docs/image
// https://react-native-elements.js.org/#/image (Live Demo)

// https://react-native-elements.js.org/#/card
// https://reactnativeelements.com/docs/card/

// https://react-native-elements.js.org/#/tile
// https://reactnativeelements.com/docs/tile/

/*
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
*/
