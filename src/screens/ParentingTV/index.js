import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import Orientation from 'react-native-orientation-locker';
import VideoPlay from "../../component/VideoPlay";
import Apis from "../../Services/apis";

const ParentingTV = ({ props, route }) => {
  const id = route.params.item.id
  const [orientation, setOrientation] = useState('')
  const [Fullscreen, setFullscreen] = useState(false);
  const [isLoader, setIsLoader] = useState(true)
  const [episodeVideos, setEpisodeVideos] = useState()
  console.log('object', orientation)
  useEffect(() => {
    PlayEpisodeVideo(id)
  }, [])
  const PlayEpisodeVideo = (id) => {
    const params = {
      search_id: id
    };
    Apis.ParentigDetailVideos(params).then(async json => {
      setEpisodeVideos(json?.data[0].vedio_link)
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
  return (
    <View style={styles.container}>
      {Fullscreen ? null :
        <>
          <View style={styles.haddingView}>
            <Text style={styles.haddingTxt}>Parenting TV</Text>
            <View style={styles.radiusView} />
          </View>
          
        </>
      }
      <ScrollView>
        <View style={styles.backgroundVideo}>
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
        </View>
      </ScrollView>
    </View>

  )
}
export default ParentingTV


