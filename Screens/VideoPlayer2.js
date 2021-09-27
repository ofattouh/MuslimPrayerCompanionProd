import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-player';

function VideoPlayer2Screen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        videoWidth={1600}
        videoHeight={1200}
        resizeMode={'cover'}
        thumbnail={{
          uri: 'https://picsum.photos/500/500.jpg?random=' + Math.random(),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    //backgroundColor: 'black',
  },
});

export default VideoPlayer2Screen;

// https://github.com/cornedor/react-native-video-player
