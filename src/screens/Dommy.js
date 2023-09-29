import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, BackHandler, Dimensions, ScrollView, Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import Orientation from 'react-native-orientation-locker';
import { svgs, colors } from '@common';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Vediorotate from "../component/Vediorotate";
import Apis from "../Services/apis";
import fonts from "../common/fonts";
const windowHeight = Dimensions.get('window').height;
const Dummy = (props) => {
  const [orientation, setOrientation] = useState('')
  const [Fullscreen, setFullscreen] = useState(false);
  const [isLoader, setIsLoader] = useState(true)
  const [episodeVideos, setEpisodeVideos] = useState()
  const [episodeImage, setEpisodeImage] = useState()
  const [backhandler, setBackhandler] = useState(false)
  console.log('object', orientation)
  useEffect(() => {
    PlayEpisodeVideo(2)
  }, [])
  const PlayEpisodeVideo = (id) => {
    const params = {
      search_id: 2
    };
    Apis.ParentigDetailVideos(params).then(async json => {
      setEpisodeVideos(json?.data[0]?.vedio_link)
      setEpisodeImage(json?.data[0]?.image)
      console.log("=========================result", json?.data[0].vedio_link);
      if (json.status == true) {
        setIsLoader(false)
        if (json?.data?.length == 0) {
          setIsLoader(false)
        }

      }
    });
  }
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
  //  const toggleFullScreen =()=>{
  //   setFullscreen(!Fullscreen)
  //  }
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  const toggleFullScreen = () => {
    setBackhandler(!backhandler)
    if (Fullscreen) {
      // Exit full-screen mode
      Orientation.lockToPortrait();
    } else {
      // Enter full-screen mode
      Orientation.lockToLandscape();
    }
    setFullscreen(!Fullscreen);
  };
  const handleBackButton = () => {
    console.log("backhandler", backhandler);
    if (backhandler === true) {
      toggleFullScreen();
      // navigation.goBack();
      return true; // Prevent the default back button behavior
    }
    else {
      return false;
    }
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [backhandler]);
  return (
    <View style={styles.container}>
      <View style={[Fullscreen ? {
        height: windowHeight,
        width: "100%",
        alignSelf: "center",
      } : {
        height:"100%",
        width: "100%",
      }]}>
        <Vediorotate
          VedioUrl={episodeVideos}
          isFullScreen={Fullscreen}
          toggleFullScreen={() => { toggleFullScreen() }}
          imageUri={episodeImage}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  haddingView: {
    backgroundColor: colors.themeColor,
    paddingTop: 16,
    paddingBottom: 40,
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: 'space-between'
  },
  haddingTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
  },
  radiusView: {
    height: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -30,
  },
  backgroundVideo: {
    marginTop: 10,
    //   borderWidth:5,
    //   borderColor:"black",
    width: "90%",
    alignSelf: "center",
  },
})
export default Dummy;


