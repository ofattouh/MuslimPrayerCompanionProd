import * as React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import VideoPlayer from 'react-native-video-player';

function VideoPlayer2Screen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Video player has limited features</Text>
      <VideoPlayer
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        videoWidth={1600}
        videoHeight={1200}
        resizeMode={'cover'} // default: contain
        pauseOnPress={true}
        thumbnail={{
          uri: 'https://picsum.photos/500/500.jpg?random=' + Math.random(),
        }}
        endThumbnail={{
          uri: 'https://picsum.photos/500/500.jpg?random=' + Math.random(),
        }}
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
