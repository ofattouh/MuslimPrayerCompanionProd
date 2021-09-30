/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';

function MedinaLiveScreen({route, navigation}) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Medina live stream video has ended. Try again latter!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={'22hlhTCTUaY'}
        onChangeState={onStateChange}
      />

      <Button
        buttonStyle={{width: 150}}
        containerStyle={{margin: 50}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={togglePlaying}
        title={playing ? 'pause' : 'play'}
        titleProps={{}}
        titleStyle={{marginHorizontal: 5}}
      />
    </View>
  );
}

export default MedinaLiveScreen;

// https://lonelycpp.github.io/react-native-youtube-iframe/basic-usage
// https://lonelycpp.github.io/react-native-youtube-iframe/component-props
