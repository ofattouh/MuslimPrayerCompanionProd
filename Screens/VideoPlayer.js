/* import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
// import Video from 'react-native-video'; */

/*
function VideoPlayerScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer
        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        // navigator={this.props.navigator}
      />

    </SafeAreaView>
  );
}

export default VideoPlayerScreen;

*/

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class VideoPlayerScreen extends Component {
  state = {
    rate: 1,
    volume: 1,
    muted: false, // default false
    resizeMode: 'contain', // cover, stretch
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    repeat: false,
    audioOnly: false, // default false, poster must be set
  };

  video: Video;

  onLoad = data => {
    this.setState({duration: data.duration});
  };

  onProgress = data => {
    this.setState({currentTime: data.currentTime});
  };

  onEnd = () => {
    this.setState({paused: true});
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true});
  };

  onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
    this.setState({paused: !event.hasAudioFocus});
  };

  onBuffer = () => {
    console.log('buffering....');
  };

  onError = () => {
    console.log('error');
  };

  togglePlay = () => {
    this.setState({rate: 1});
    this.setState({paused: !this.state.paused});
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backgroundVideo}
          onPress={() => this.setState({paused: !this.state.paused})}>
          <Video
            ref={(ref: Video) => {
              this.video = ref;
            }}
            /* For ExoPlayer */
            /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            // source={require('../Components/VideoPlayer/resources/my-video.mp4')}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            onBuffer={this.onBuffer}
            onError={this.onError}
            repeat={this.state.repeat}
            thumbnail={{
              uri: 'https://picsum.photos/500/500.jpg?random=10',
            }}
            style={styles.backgroundVideo}
            audioOnly={this.state.audioOnly}
            poster={'https://picsum.photos/500/500.jpg?random=10'}
            playInBackground={true} // allows to continue listening to audio. default false
            // controls={true} // built-in controls, default false
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.progress}>
            <View
              style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
            />
            <View
              style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
            />
          </View>

          <View style={styles.generalControls}>
            <View style={styles.playerControls}>
              <TouchableOpacity onPress={() => this.togglePlay()}>
                {this.state.paused ? (
                  <Icon name="play" size={35} color="#fff" />
                ) : (
                  <Icon name="pause" size={35} color="#fff" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({rate: 0.25})}>
                <Icon name="step-forward" size={30} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({rate: 2.0})}>
                <Icon name="fast-forward" size={30} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({repeat: !this.state.repeat})}>
                {this.state.repeat ? (
                  <Icon name="repeat" size={30} color="#fff" />
                ) : (
                  <Icon name="repeat-off" size={30} color="#fff" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({muted: !this.state.muted})}>
                {this.state.muted ? (
                  <Icon name="volume-off" size={30} color="#fff" />
                ) : (
                  <Icon name="volume-high" size={30} color="#fff" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({resizeMode: 'cover'})}>
                <Icon name="resize" size={30} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({resizeMode: 'contain'})}>
                <Icon name="move-resize-variant" size={30} color="#fff" />
              </TouchableOpacity>

              {/*
              <TouchableOpacity
                onPress={() =>
                  this.setState({audioOnly: !this.state.audioOnly})
                }
                >
                {this.state.audioOnly ? (
                  <Icon name="audio-video-off" size={30} color="#fff" />
                ) : (
                  <Icon name="audio-video" size={30} color="#fff" />
                )}
              </TouchableOpacity>
                */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  playerControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  innerProgressCompleted: {
    height: 5,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 5,
    backgroundColor: '#2C2C2C',
  },
});

// https://github.com/react-native-video/react-native-video
// https://github.com/react-native-video/react-native-video/tree/master/examples/basic
// https://github.com/react-native-video/react-native-video/blob/master/examples/basic/index.android.js
// https://github.com/cornedor/react-native-video-player
// https://github.com/itsnubix/react-native-video-controls
// https://github.com/react-native-video/react-native-video/tree/master/examples
// https://oblador.github.io/react-native-vector-icons/
