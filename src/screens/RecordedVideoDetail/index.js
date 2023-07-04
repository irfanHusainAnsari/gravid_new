import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
import styles from './style';
import { svgs, colors } from '@common';
import { imageurl } from '../../Services/constants';
import Pdf from 'react-native-pdf';
import RazorpayCheckout from 'react-native-razorpay';
import Apis from '../../Services/apis';
import RNFetchBlob from 'rn-fetch-blob'
import { useIsFocused } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
// import VideoPlayer from 'react-native-video-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlay from '../../component/VideoPlay'
const { width } = Dimensions.get('window');
const RecordedVideoDetail = (props) => {
  let recordedVideoData = props?.route?.params?.item;
  console.log('recordedVideoData', recordedVideoData?.vedio_link)
  const [start, setStart] = useState(false)
  const [Fullscreen, setFullscreen] = useState(false);
  const url ="https://adminapp.gravidparenting.com/public/videos/Tusshar_Kapoor_7th_Cut.mp4"
  useEffect(() => {
    setTimeout(() => {
      setStart(true)
    }, 1000);
  }, [])
  const isFocused = useIsFocused();
  const [isPaused, setIsPaused] = useState(false);
  const [magazineDetail, setMagazineDetail] = useState({})
  const [isLoader, setIsLoader] = useState(false)
  const [playVideoId, setPlayVideoId] = useState()
  const [userData, setUserData] = useState({})
  const [episodeVideos, setEpisodeVideos] = useState([])
  useEffect(() => {
    setIsPaused(!isFocused)
  }, [isFocused])
  useEffect(() => {
    if (!isFocused) {
      setPlayVideoId(null)
    }
  }, [isFocused])

  useEffect(() => {
    setMagazineDetail(recordedVideoData);
  }, [recordedVideoData])

  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused])
  useEffect(() => {
    PlayEpisodeVideo()
  }, [])
  const PlayEpisodeVideo = (id) => {
    const params = {
      episode_id: recordedVideoData?.episode_id,
      id: recordedVideoData?.id
    };
    Apis.EpisodeVideos(params).then(async json => {
      if (json.status == true) {
        setEpisodeVideos(json?.data)
      }

    });
  }

  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      console.log('jsondataEditProfile', jsondata)
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal)
        console.log('imageurl + newVal.profile', imageurl + newVal.profile);
        setShowdpimage({ path: imageurl + newVal.profile })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  const handleInstamozo = () => {
    setIsLoader(true)
    const params = {
      type: 3,
      type_id: magazineDetail?.id,
      purpose: magazineDetail?.title,
      amount: magazineDetail.amount,
      phone: userData?.mobile,
      buyer_name: userData?.name,
      email: userData?.email,
    }
    Apis.instaMojoPayment(params)
      .then(async (json) => {
        console.log('objectjsonjson>>>>', json)
        if (json.status == true) {
          props.navigation.navigate("InstaMojoWebScreen", { instamojoData: json });
        }
        setIsLoader(false)
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false)
      })
  }

  return (
    <View style={styles.container}>
     {Fullscreen ? null:
      <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex:3}} 
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Episode Detail</Text>
        <View style={{ flex: 3 }} />
      </View>}
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
              url={{ uri:recordedVideoData.vedio_link}}
              Fullscreen={(value) => { setFullscreen(value) }} />
          </View>
          :
          <View style={{marginTop:100}}>
          <ActivityIndicator size="large"/>
          </View>
        }
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.gravidTitleText}>{magazineDetail.title}</Text>
          <Text style={styles.novemberText}>{magazineDetail.short_description}</Text>
        </View>
      </ScrollView>
      {/* {
        magazineDetail?.payment_type != "Paid" || magazineDetail?.check_payment?.id ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {magazineDetail?.url_data?.map((item, index) => {

              return (
                <View style={{ marginBottom: 10 }}>
                  <View style={styles.backgroundVideo}>
                    <VideoPlayer
                      source={{ uri: "https://www.youtube.com/watch?v=6xB7Key3Nys" }}
                      controls={true}
                      paused={true}
                      disableControlsAutoHide={true}
                    />
                  </View>
                  <Text style={{ marginTop: 5, marginHorizontal: 10, fontSize: 16, color: "black" }}>{item.title}</Text>
                </View>
              )
            })
            }
          </ScrollView>
        ) : (
          <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
            <View>
              <Image style={styles.ScreenshotImage} source={{ uri: imageurl + magazineDetail.file }} />
              <Text style={styles.gravidTitleText}>{magazineDetail.title}</Text>
              <Text style={styles.novemberText}>{magazineDetail.short_description}</Text>
            </View>
            <TouchableOpacity
              style={styles.buyIssuesButton}
              disabled={isLoader}
              onPress={handleInstamozo}
            >
              {
                isLoader ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buyIssuesText}>Buy Now Rs {magazineDetail.amount}</Text>
                )
              }
            </TouchableOpacity>

          </ScrollView>
        )
      } */}
    </View>
  );
};

export default RecordedVideoDetail;