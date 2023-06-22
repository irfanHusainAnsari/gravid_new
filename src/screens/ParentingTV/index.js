import React, { useEffect, useRef, useState } from "react";
import { View, Text, Alert, TouchableOpacity, BackHandler, Dimensions, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import Orientation from 'react-native-orientation-locker';
import CommonHeader from "../../component/CommonHeader";
import VideoPlay from "../../component/VideoPlay";
import LoaderRow from '../../component/LoaderRow';
const ParentingTV = (props) => {
  const [start, setStart] = useState(false)
  const [Fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStart(true)
    }, 1000);
  }, [])
  return (
    <View style={styles.container}>
      {Fullscreen ? null :
        <CommonHeader HeaderTitle={"Parenting TV"} navigation={() =>
          props.navigation.goBack()
        }
        />
      }
      <View style={styles.radiusView} />
      <View style={{
        marginTop: -10,
        borderWidth: 5,
        borderColor: "white",
        height: Fullscreen ? 460 : 300,
        width: "100%",
        alignSelf: "center",
      }}>
        {start ?
          <View style={styles.extraStyle}>
            <VideoPlay
              url={{ uri: "https://adminapp.gravidparenting.com/public/videos/Tusshar_Kapoor_7th_Cut.mp4" }}
              Fullscreen={(value) => { setFullscreen(value) }} />
          </View>
          :
          <LoaderRow />
        }
      </View>
    </View>

  )
}
export default ParentingTV


