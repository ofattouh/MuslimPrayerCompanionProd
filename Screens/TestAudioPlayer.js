/* import * as React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider'; */

function TestAudioPlayerScreen({navigation}) {
  /*  const progress = useProgress();

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    // You can then [add](https://react-native-track-player.js.org/react-native-track-player/documentation/#addtracks-insertbeforeindex) the items to the queue
    await TrackPlayer.add({
      id: 'trackId',
      url: require('../Uploads/braveheart.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
      artwork: require('../Uploads/salah-times.png'),
    });

    // Start playing it
    // await TrackPlayer.play();

    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`Title: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log(`${duration - position} seconds left.`);
  };

  // start();

  // TrackPlayer.play();
  // TrackPlayer.pause();
  // TrackPlayer.stop();
  // TrackPlayer.reset();

  // Seek to 12.5 seconds:
  // TrackPlayer.seekTo(12.5);

  // Set volume to 50%:
  // TrackPlayer.setVolume(0.5);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Audio Player Screen</Text>

      <Slider
        style={{width: '70%', height: 40}}
        minimumValue={0}
        maximumValue={track.duration}
        minimumTrackTintColor="#52527a"
        maximumTrackTintColor="#52527a"
        thumbTintColor="#52527a"
        value={progress.position}
      />
    </SafeAreaView>
  ); */
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    padding: 15,
    fontSize: 17,
  },
}); */

export default TestAudioPlayerScreen;
