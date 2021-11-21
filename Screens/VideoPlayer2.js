import * as React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import VideoPlayer from 'react-native-video-player';

function VideoPlayer2Screen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        اذاعة القران الكريم من القاهرة بث مباشر
      </Text>
      <VideoPlayer
        video={{
          uri: 'http://stream.radiojar.com/8s5u5tpdtwzuv',
        }}
        videoWidth={1600}
        videoHeight={1200}
        resizeMode={'cover'} // default: contain
        pauseOnPress={true}
        thumbnail={{
          uri: 'https://4.bp.blogspot.com/-0NoeumnmElw/W2hKEB6GHOI/AAAAAAAALGE/fUDn0tXtP6ILxEIzGkJDMSIApC4gpWPDgCLcBGAs/s400/holy-quran-radio-station-cairo-live.jpg',
        }}
        endThumbnail={{
          uri: 'https://picsum.photos/500/500.jpg?random=' + Math.random(),
        }}
        audioOnly={true}
        // autoplay={true}
        // loop
        // duration={} // fallback
        // customStyles={}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',
  },
  paragraph: {
    padding: 15,
  },
});

export default VideoPlayer2Screen;

// https://github.com/cornedor/react-native-video-player
