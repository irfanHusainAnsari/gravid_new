import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, BackHandler, Dimensions, ScrollView, Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import Orientation from 'react-native-orientation-locker';
import VideoPlay from "../../component/VideoPlay";
import Apis from "../../Services/apis";
import { svgs, colors } from '@common';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Vediorotate from "../../component/Vediorotate"
import { imageurl } from "../../Services/constants";
const windowHeight = Dimensions.get('window').height;
const ParentingTV = (props) => {
  const id = props.route.params.item.id
  const [orientation, setOrientation] = useState('')
  const [Fullscreen, setFullscreen] = useState(false);
  const [isLoader, setIsLoader] = useState(true)
  const [episodeVideos, setEpisodeVideos] = useState()
  const [episodeImage, setEpisodeImage] = useState()
  const [backhandler, setBackhandler] = useState(false)
  console.log('object', orientation)
  useEffect(() => {
    PlayEpisodeVideo(id)
  }, [])
  const PlayEpisodeVideo = (id) => {
    const params = {
      search_id: id
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
      {/* {Fullscreen ? null :
        <>
          {/* <View style={styles.haddingView}>
            <Text style={styles.haddingTxt}>Parenting TV</Text>
            <View style={styles.radiusView} />
          </View> */}
     {!Fullscreen && <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Parenting TV</Text>
        <View style={{ flex: 3 }} />
      </View>}

      {/* </>
      } */}
      <View style={styles.radiusView} />
      <View>
        {/* <View style={styles.backgroundVideo}>
          {!isLoader ?
            <View style={styles.extraStyle}>
              <VideoPlay
                url={{ uri: episodeVideos }}
                Fullscreen={(value) => { setFullscreen(value) }} />
            </View>
            :
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator size="large" />
            </View>
          }
        </View> */}
        <View style={[Fullscreen ? {
          height: windowHeight,
          width: "100%",
          alignSelf: "center",
        } : {
          height:"55%",
          width: "100%",
          alignSelf: "center",
        }]}>
          <Vediorotate
            VedioUrl={episodeVideos}
            isFullScreen={Fullscreen}
            toggleFullScreen={() => { toggleFullScreen() }}
            imageUri={episodeImage}
          />
        </View>

      </View>

    </View>

  )
}
export default ParentingTV


