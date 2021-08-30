import React, {useState, useRef} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from 'react-native-elements';

function MakkahLiveScreen() {
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();

  const onStateChange = state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Makkah live stream video has ended. Try again latter!');
    }

    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };

  const seekBackAndForth = control => {
    // console.log('currentTime');
    controlRef.current?.getCurrentTime().then(currentTime => {
      control === 'forward'
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };

  const muteVideo = () => setMute(!isMute);

  const ControlIcon = ({name, onPress}) => (
    <Icon onPress={onPress} name={name} size={40} color="#ADD8E6" />
  );

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        ref={controlRef}
        play={playing}
        mute={isMute}
        videoId={'YQu9Br72PP8'}
        onChangeState={onStateChange}
      />

      <View style={styles.controlsContainer}>
        <ControlIcon
          onPress={muteVideo}
          name={isMute ? 'volume-up' : 'volume-off'}
        />

        <ControlIcon
          onPress={() => seekBackAndForth('rewind')}
          name="skip-previous"
        />

        <ControlIcon
          onPress={togglePlaying}
          name={playing ? 'pause' : 'play-arrow'}
        />

        <ControlIcon
          onPress={() => seekBackAndForth('forward')}
          name="skip-next"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MakkahLiveScreen;

// https://dzone.com/articles/how-to-embed-youtube-video-in-react-native
// https://lonelycpp.github.io/react-native-youtube-iframe/component-ref-methods
