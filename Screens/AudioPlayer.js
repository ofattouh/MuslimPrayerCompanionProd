import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import localTrack from '../Components/AudioPlayer/resources/sounds/pure.m4a';
import tracksData from '../Components/AudioPlayer/resources/tracks'; // saved locally
import playlistData from '../Components/AudioPlayer/data/playlist.json'; // streaming

const setup = async () => {
  try {
    // make sure everything is initialized
    await TrackPlayer.setupPlayer({waitForBuffer: true});

    await TrackPlayer.updateOptions({
      stopWithApp: true, // (Android) false=> music continues in background even when app is closed
      capabilities: [
        // Media controls capabilities
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      // (Android only) Capabilities that will show up when notification in compact form
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

      // (Android only) Icons for the notification (instead of default ones)
      /* playIcon: require('./play-icon.png'),
        pauseIcon: require('./pause-icon.png'),
        stopIcon: require('./stop-icon.png'),
        previousIcon: require('./previous-icon.png'),
        nextIcon: require('./next-icon.png'),
        icon: require('./notification-icon.png') */
    });
  } catch (e) {
    console.log(e);
    Alert.alert(e);
  }

  // await TrackPlayer.add(playlistData);
  await TrackPlayer.add(playlistData.concat(tracksData));
  TrackPlayer.setRepeatMode(RepeatMode.Queue); // Repeats the whole queue after last song in track
};

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  // Debug
  const state = await TrackPlayer.getState();
  console.log(state + ',' + playbackState);

  // LOG  {"0": "None", "1": "Stopped", "2": "Paused", "3": "Playing", "6": "Buffering", "8": "Connecting", "Buffering": 6, "Connecting": 8, "None": 0, "Paused": 2, "Playing": 3, "Ready": 2, "Stopped": 1}

  if (currentTrack == null) {
    console.log('No track to play!');
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (
      playbackState === State.Ready ||
      playbackState === State.Paused ||
      playbackState === State.Connecting
    ) {
      await TrackPlayer.play();
    } else {
      console.log('\nThe player is paused...');
      await TrackPlayer.pause();
    }
  }
};

function AudioPlayerScreen({navigation}) {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
      Event.RemoteStop,
      Event.PlaybackState,
      Event.PlaybackError,
    ],
    async event => {
      // console.log(event);

      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== undefined
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artist, artwork} = track || {};

        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      } else if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      } else if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      } else if (event.type === Event.PlaybackQueueEnded) {
        console.log('PlaybackQueueEnded.');
      } else if (event.type === Event.PlaybackState) {
        console.log('PlaybackState.');
      } else if (event.type === Event.RemoteStop) {
        console.log('Player stopped.');
      } else if (event.type === Event.PlaybackError) {
        // console.warn(event.code + ': ' + event.message);
        Alert.alert('PlaybackError:');
        Alert.alert(event.code + ',' + event.message);
      }
    },
  );

  useEffect(() => {
    setup();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.contentContainer}>
        {/*
          <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={() => TrackPlayer.setRepeatMode(RepeatMode.Track)}>
            <Text style={styles.repeatModeButton}>
              <Icon name="repeat" size={25} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
        */}

        <Image style={styles.artwork} source={{uri: `${trackArtwork}`}} />
        <Text style={styles.titleText}>{trackTitle}</Text>
        <Text style={styles.artistText}>{trackArtist}</Text>

        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#FFD479"
          minimumTrackTintColor="#FFD479"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>

          <Text style={styles.progressLabelText}>
            {/*
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
            */}
          </Text>
        </View>
      </View>

      <View style={styles.actionRowContainer}>
        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.secondaryActionButton}>
            <Icon name="step-backward" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
          <Text style={styles.primaryActionButton}>
            {playbackState === State.Playing ? (
              <Icon name="pause" size={30} color="#fff" />
            ) : (
              <Icon name="play" size={30} color="#fff" />
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.secondaryActionButton}>
            <Icon name="step-forward" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.playingStats}>
          Track progress: {'\n'} {progress.position} seconds out of{' '}
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
          {'\n\n'}
          Buffered progress: {'\n'} {progress.buffered} seconds buffered out of{' '}
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  artwork: {
    width: 400,
    height: 260,
    marginTop: 5,
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 35,
  },
  artistText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: 'white',
    fontVariant: ['tabular-nums'],
  },
  actionRowContainer: {
    width: '60%',
    flexDirection: 'row',
    marginBottom: 100,
    justifyContent: 'space-between',
  },
  primaryActionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD479',
  },
  secondaryActionButton: {
    fontSize: 14,
    color: '#FFD479',
  },
  playingStats: {
    fontSize: 14,
    marginBottom: '10%',
    color: '#FFD479',
  },
  /*
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  repeatModeButton: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD479',
  },
  */
});

export default AudioPlayerScreen;

// https://react-native-track-player.js.org/getting-started/
// https://github.com/DoubleSymmetry/react-native-track-player
// https://react-native-track-player.js.org/documentation/
// https://github.com/callstack/react-native-slider
// https://oblador.github.io/react-native-vector-icons/

// Audio Streaming API:
// http://www.liveradiu.com/p/radio-stations.html
// https://www.islamicity.org/channels/online-radio/
// http://www.arabic-keyboard.org/
