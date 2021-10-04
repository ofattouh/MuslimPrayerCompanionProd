import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Slider, Icon} from 'react-native-elements';

function MySlider() {
  return (
    <View style={styles.container}>
      <Slider
        animateTransitions
        animationType="spring"
        maximumTrackTintColor="#222"
        maximumValue={100}
        minimumTrackTintColor="#fff"
        minimumValue={0}
        // onSlidingComplete={() => console.log('onSlidingComplete()')}
        // onSlidingStart={() => console.log('onSlidingStart()')}
        // onValueChange={value => console.log('onValueChange()', value)}
        // orientation="vertical"
        orientation="horizontal" // default
        step={1}
        style={styles.slider}
        thumbStyle={styles.thumbStyle}
        thumbProps={{
          children: (
            <Icon
              name="volume-up"
              type="font-awesome"
              size={20}
              reverse
              containerStyle={styles.containerStyle}
              // color="#fff"
            />
          ),
        }}
        thumbTintColor="#fff"
        // thumbTouchSize={styles.thumbTouchSize}
        // trackStyle={{height: 10, borderRadius: 20}}
        value={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  slider: {
    height: 150,
    width: '80%',
  },
  thumbStyle: {
    height: 20,
    width: 20,
  },
  containerStyle: {
    bottom: 20,
    right: 20,
  },
  thumbTouchSize: {
    width: 40,
    height: 40,
  },
});

export default MySlider;

// https://react-native-elements.js.org/#/slider
// https://react-native-elements.js.org/#/icon
// https://reactnativeelements.com/docs/slider/
// https://oblador.github.io/react-native-vector-icons/
