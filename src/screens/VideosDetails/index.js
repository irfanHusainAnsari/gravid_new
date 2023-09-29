import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView,Image} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

import Orientation from 'react-native-orientation-locker';
import VideoPlay from "../../component/VideoPlay";
import Apis from "../../Services/apis";
import { svgs, colors } from '@common';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Vediorotate from "../../component/Vediorotate"
import { imageurl } from "../../Services/constants";
import styles from "./style";

const windowHeight = Dimensions.get('window').height;
const VideosDetails = (props) => {

  let recordedVideoData = props?.route?.params?.item;
  console.log('recordedVideoData', recordedVideoData)

  const [orientation, setOrientation] = useState('')
  const [Fullscreen, setFullscreen] = useState(false);
  const [isLoader, setIsLoader] = useState(true)
  const [episodeVideos, setEpisodeVideos] = useState(recordedVideoData?.vedio)
  const [episodeImage, setEpisodeImage] = useState(recordedVideoData?.image)
  console.log('object', orientation)
  // useEffect(() => {
  //   PlayEpisodeVideo(id)
  // }, [])
  // const PlayEpisodeVideo = (id) => {
  //   const params = {
  //     search_id: id
  //   };
  //   Apis.ParentigDetailVideos(params).then(async json => {
  //     setEpisodeVideos(json?.data[0]?.vedio_link)
  //     setEpisodeImage(json?.data[0]?.image)
  //     console.log("=========================result", json?.data[0].vedio_link);
  //     if (json.status == true) {
  //       setIsLoader(false)
  //       if (json?.data?.length == 0) {
  //         setIsLoader(false)
  //       }

  //     }
  //   });
  // }
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
 const toggleFullScreen =()=>{
  setFullscreen(!Fullscreen)
 }
  return (
    <View style={styles.container}>
      {/* {Fullscreen ? null :
        <>
          {/* <View style={styles.haddingView}>
            <Text style={styles.haddingTxt}>Parenting TV</Text>
            <View style={styles.radiusView} />
          </View> */}
      <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Video</Text>
        <View style={{ flex: 3 }} />
      </View>

      {/* </>
      } */}
      <View style={styles.radiusView} />
      <ScrollView>
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
          height: responsiveHeight(33),
          width: "100%",
          alignSelf: "center",
        }]}>
          <Vediorotate
            VedioUrl={episodeVideos}
            isFullScreen={Fullscreen}
            toggleFullScreen={() => { toggleFullScreen() }}
            imageUri={episodeImage}
          />
          {/* <VideoPlay
                                                    VedioUrl={viewDetailsList[0]?.vedio_file}
                                                    Fullscreen={(value) => { setFullscreen(value) }} /> */}
        </View>
       
      </ScrollView>

    </View>

  )
}
export default VideosDetails



















// import React from 'react';
// import { Text, View, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
// import styles from './style';
// import { svgs, colors } from '@common';
// import { imageurl } from '../../Services/constants';
// import RenderHtml from 'react-native-render-html';
// const { width, height } = Dimensions.get('window')
// import VideoPlayer from 'react-native-video-controls';

// const VideosDetails = (props) => {
//     const videoDetail = props?.route?.params?.item;
//     console.log('video?????????????', videoDetail)
//     return (
//         <View style={styles.container}>
//             <View style={styles.haddingView}>
//                 <TouchableOpacity style={{ flex: 3 }} onPress={() => props.navigation.goBack()}>
//                     {svgs.backArrow("black", 24, 24)}
//                 </TouchableOpacity>
//                 <Text style={styles.haddingTxt}>Video</Text>
//                 <View style={{ flex: 3 }} />
//             </View>
//             <View style={styles.radiusView} />
//             <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
//                 <View style={{ marginTop:-20,
//                                 borderWidth:5,
//                                 borderColor:"black",
//                                 height:290,
//                                 width:"90%",
//                                 alignSelf:"center",
//                                 }}>
     
//                 <VideoPlayer 
//                             // source={{ uri: 'http://adminapp.gravidparenting.com/public/videos/Tusshar_Kapoor_7th.mp4' }}
//                             source={{ uri: videoDetail?.video }}
//                             controls={true}
//                             paused={true} 
//                             disableControlsAutoHide={true}
//                             />
//                     {/* <VideoPlayer
//                         source={{ uri: imageurl + videoDetail.video, initOptions: ['--codec=avcodec'] }}
//                         // source={{ uri: imageurl + 'public\vedio\Tusshar Kapoor 7th Cut.mov' }}
//                         onPause={() => console.log("pause")}
//                         onPlay={() => console.log("Play")}
//                         navigator={props.navigator}
//                         onError={err => console.log("err", err)}
//                         style={{ width: width - 32, height: 200 }}
//                     /> */}
//                     {/* <ImageBackground source={{ uri: imageurl + videoDetail.image }} style={styles.imageBackgroundImage} >
//                         <Image style={styles.playVideoIcons} source={require('../../assets/images/playIcons.png')} />
//                     </ImageBackground> */}
                    
//                 </View>
//                     <Text style={styles.CONTRIBUTORSTEXT}>{videoDetail.title}</Text>
//                     <Text style={styles.gravidDigestText}>{videoDetail.short_description}</Text>
//                 <RenderHtml
//                     contentWidth={width}
//                     source={{ html: videoDetail.description }}
//                 />

//                 {/* <Text style={styles.loremText}>{videoDetail.description}</Text> */}
//             </ScrollView>
//         </View>
//     );
// };

// export default VideosDetails;