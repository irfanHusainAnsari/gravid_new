import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions,ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

const ParentingTV = (props) => {
    const [orientation, setOrientation] = useState('')
    console.log('object', orientation)

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
      console.log('orientation', orientation);
    });
  };
  const OnOrientationChange = orientation => {
    setOrientation('Current Screen Orientation is ' + orientation);
  };
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <Text style={styles.haddingTxt}>Parenting TV</Text>
                <View style={styles.radiusView} />
            </View>
            <ScrollView>
                <View style={styles.backgroundVideo}>
                   <VideoPlayer
                            source={{
                                uri: 'https://adminapp.gravidparenting.com/public/videos/Tusshar_Kapoor_7th_Cut.mp4',
                            }}
                            onShowControls={true}
                            paused={true}
                            disableControlsAutoHide={true}
                            onEnterFullscreen={() => {
                                console.log('First');
                                Orientation.lockToLandscape();
                            }}
                            onExitFullscreen={() => {
                                console.log('second');
                                Orientation.unlockAllOrientations();
                            }}
                    
                            />
                </View>
            </ScrollView>
        </View>

    )
}
export default ParentingTV 


