import React, { useEffect, useRef, useState } from "react";
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import VideoPlayer from "react-native-video-controls";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Orientation from 'react-native-orientation-locker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const VideoPlay = ({ Fullscreen, url }) => {
  const [orientation, setOrientation] = useState('')
  const [widthhandle, setWidthhandle] = useState(false)
  const [isPortrait, setIsPortrait] = React.useState(true);
  const handleEnterFullscreen = (value) => {
    setWidthhandle(value)
    Fullscreen(value);
  };
  useEffect(() => {
    const currentOrientation = Orientation.getInitialOrientation();
    getCurrentScreenOrientation();
    setOrientation('Current Device Orientation is = ' + currentOrientation);
    Orientation.addOrientationListener(OnOrientationChange);
    return () => {
      Orientation.removeOrientationListener(OnOrientationChange);
    };
  }, []);
  const getCurrentScreenOrientation = () => {
    Orientation.getOrientation((err, orientation) => {
      console.log('orientation============', orientation, "rrrrrrrrrrrrrr", err);
    });
  };
  const OnOrientationChange = orientation => {
    setOrientation('Current Screen Orientation is ' + orientation);
  };
  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  const onRotatehandle = (value) => {
    if (value) {
      handleEnterFullscreen(true)
      Orientation.lockToLandscape();
    } else {
      handleEnterFullscreen(false)
      Orientation.lockToPortrait();
    }
    setIsPortrait(!value);
  }
  return (
    <View style={widthhandle ? styles.extraStyle : styles.backgroundVideo}>
      <VideoPlayer
        paused={true}
        source={url}
        onEnterFullscreen={() => {
          onRotatehandle(true)
        }}
        onExitFullscreen={() => {
          onRotatehandle(false)
        }}
        // toggleResizeModeOnFullscreen={false}
        // controlTimeout={1000}
      // fullscreen={widthhandle}
      controls={true}
      // resizeMode="contain"
      // onShowControls={true}
      // disableControlsAutoHide={true}
      // disableBack
      // disableVolume
      // disableFullscreen
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    width: moderateScale(350),
    height: moderateScale(200),
    alignSelf: 'center',
    marginBottom: 50,
  },
  extraStyle: {
    width: moderateScale(600),
    height: moderateScale(310),
    alignSelf: 'center',
    marginBottom: 50,
  }
});
export default VideoPlay;