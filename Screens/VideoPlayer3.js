import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

function VideoPlayer3Screen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        paused={true}
        tapAnywhereToPause={true}
        onBack={() => navigation.goBack()}
        onError={() => alert('Error! video is not available')}
        // source={require('path/to/file')}
        // onBack={() => navigation.navigate('Details', {owner: 'My Drawer'})}
        // videoStyle={styles.style}
        // style={styles.style}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    // backgroundColor: 'black',
  },
});

export default VideoPlayer3Screen;

// https://github.com/itsnubix/react-native-video-controls
