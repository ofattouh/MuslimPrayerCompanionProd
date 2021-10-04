import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  // Animated,
} from 'react-native';
import Video from 'react-native-video';
import {Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class VideoPlayerScreen extends Component {
  state = {
    rate: 1, // 0.0 - Pauses the video, 1.0 - Play at normal speed
    volume: 0.0, // 1.0 maximum (default), 0.0 - muted
    muted: true, // default false
    resizeMode: 'contain', // contain(default), cover, stretch
    duration: 0.0,
    currentTime: 0.0, // beginning
    paused: true, // default false, Don't auto-play
    repeat: false, // default false
    audioOnly: false, // default false, if true, poster prop must be set to play the audio
  };

  video: Video;

  onLoad = data => {
    // callback when the media is loaded and ready to play
    this.setState({duration: data.duration});
  };

  onProgress = data => {
    // Callback on progressUpdateInterval seconds about which position media is currently playing
    this.setState({currentTime: data.currentTime});
  };

  setVolume = step => {
    this.setState({muted: false});
    this.setState({volume: Number.parseInt(step.value, 10) / 100});
    // console.log('Volume: ' + this.state.volume);
  };

  onEnd = () => {
    this.setState({paused: true});
    // Seek to the specified position represented by seconds. seconds is a float value
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    // audio output is being switched from external source like headphones back to internal speaker
    this.setState({paused: true});
  };

  onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
    this.setState({paused: !event.hasAudioFocus});
  };

  onBuffer = () => {
    console.log('buffering....');
  };

  onError = () => {
    Alert.alert('Error playing video! Try again later');
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
            /* For ExoPlayer Android */
            // source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }}
            // source={require('../Components/VideoPlayer/resources/my-video.mp4')} // local
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}} // network
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
            minLoadRetryCount={3} // default, minimum number of times to retry loading data before reporting error. Useful to recover from transient internet failures
            repeat={this.state.repeat}
            style={styles.backgroundVideo}
            audioOnly={this.state.audioOnly}
            poster={'https://picsum.photos/500/500.jpg?random=70'} // Image to display while video is loading
            posterResizeMode={'contain'} // contain(default), cover, center
            playInBackground={true} // continue listening to audio when app in background. default false
            // controls={true} // built-in basic controls, default false
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
                {/* cover: Fill the whole screen at aspect ratio */}
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

          <View style={styles.sliderVolume}>
            <TouchableOpacity>
              <Slider
                // animateTransitions // default: false
                // animationType="spring" // timing, default: spring
                maximumTrackTintColor="#2C2C2C"
                maximumValue={100}
                minimumTrackTintColor="#fff"
                minimumValue={0}
                // onSlidingComplete={() => console.log('Slider is released)')}
                // onSlidingStart={() => console.log('Slider is pressed')}
                onValueChange={value => this.setVolume({value})}
                // orientation="vertical"
                orientation="horizontal" // default
                step={1}
                style={styles.slider}
                thumbStyle={styles.thumbStyle}
                // thumbImage // Sets an image for the thumb
                thumbProps={{
                  /* Replace Thumb icon with custom image
                  Component: Animated.Image,
                  source: {
                    uri: 'https://findicons.com/files/icons/1637/file_icons_vs_2/48/jpg.png',
                  },
                  */
                  children: (
                    <Icon
                      name="volume-high"
                      type="MaterialCommunityIcons"
                      size={20}
                      reverse
                      containerStyle={styles.containerStyle}
                      color="#fff"
                    />
                  ),
                }}
                thumbTintColor="#2C2C2C"
                thumbTouchSize={styles.thumbTouchSize}
                trackStyle={styles.trackStyle}
                value={0} // initial value, default: 0
              />
            </TouchableOpacity>
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
    top: 650,
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
  volumeControl: {
    padding: 5,
  },
  sliderVolume: {
    width: '60%',
    /* height: 200, */ // Vertical slider
  },
  sliderText: {
    color: '#fff',
  },
  thumbStyle: {
    height: 20,
    width: 20,
    backgroundColor: 'transparent',
  },
  thumbTouchSize: {
    width: 40,
    height: 40,
  },
  trackStyle: {
    height: 3,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  containerStyle: {
    bottom: 20,
    right: 20,
  },
});

// https://github.com/react-native-video/react-native-video
// https://github.com/react-native-video/react-native-video/blob/master/examples/basic/index.android.js
// https://github.com/cornedor/react-native-video-player
// https://github.com/itsnubix/react-native-video-controls
// https://github.com/react-native-video/react-native-video/tree/master/examples
// https://oblador.github.io/react-native-vector-icons/
// https://reactnativeelements.com/docs/slider/
// https://react-native-elements.js.org/#/slider
