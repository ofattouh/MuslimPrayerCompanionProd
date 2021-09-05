import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  // TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import localTrack from '../Components/AudioPlayer/resources/sounds/pure.m4a';
import tracksData from '../Components/AudioPlayer/resources/tracks';
import playlistData from '../Components/AudioPlayer/data/playlist.json';

const setup = async () => {
  try {
    await TrackPlayer.setupPlayer({});

    await TrackPlayer.updateOptions({
      stopWithApp: true, // false=> music continues in background even when app is closed
      capabilities: [
        // Media controls capabilities
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

      // Icons for the notification on Android (if you don't like the default ones)
      /* playIcon: require('./play-icon.png'),
    pauseIcon: require('./pause-icon.png'),
    stopIcon: require('./stop-icon.png'),
    previousIcon: require('./previous-icon.png'),
    nextIcon: require('./next-icon.png'),
    icon: require('./notification-icon.png') */
    });
  } catch (e) {
    console.log(e);
    // to-do handle error
  }

  // await TrackPlayer.add(localTrack);
  // console.log('\n\n\ntracksData=========================\n');
  // console.log(tracksData);
  // console.log(playlistData.concat(tracksData));

  await TrackPlayer.add(playlistData.concat(tracksData));
  // TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  // Debug
  const state = await TrackPlayer.getState();
  console.log('\nstate: ' + state);
  console.log('\nplaybackState: ' + playbackState);
  /* if (state === State.Playing) {
    console.log('\n\nThe player is playing.......');
  } */

  // console.log('\n============State=====');
  // console.log(State);
  // LOG  {"0": "None", "1": "Stopped", "2": "Paused", "3": "Playing", "6": "Buffering", "8": "Connecting", "Buffering": 6, "Connecting": 8, "None": 0, "Paused": 2, "Playing": 3, "Ready": 2, "Stopped": 1}
  // console.log('\ncurrentTrack: ' + currentTrack);
  // console.log('\nState.Paused: ' + State.Paused);

  if (currentTrack == null) {
    console.log('No track to play!');
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState === State.Paused) {
      console.log('\n\nState.Paused: The player is playing.......');
      await TrackPlayer.play();
    } else if (playbackState === State.Connecting) {
      console.log('Player is buffering ...(in pause state)');
      await TrackPlayer.play();
    } else {
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
    ],
    async event => {
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
        console.log('Event.PlaybackQueueEnded fired.');
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
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={() => TrackPlayer.setRepeatMode(RepeatMode.Queue)}>
            <Text style={styles.queueButton}>
              <Icon name="repeat" size={25} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>

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
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
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
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  queueButton: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD479',
  },
  artwork: {
    width: 280,
    height: 240,
    marginTop: 30,
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 30,
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
});

export default AudioPlayerScreen;

// https://react-native-track-player.js.org/getting-started/
// https://github.com/DoubleSymmetry/react-native-track-player
// https://react-native-track-player.js.org/documentation/
// https://github.com/callstack/react-native-slider
// https://oblador.github.io/react-native-vector-icons/
