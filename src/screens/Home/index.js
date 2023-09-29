
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Dimensions, Linking } from 'react-native';
import { svgs, colors } from '@common';
import Modal from "react-native-modal";
import styles from './styles';
import Swiper from 'react-native-swiper';
import Apis from '../../Services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageurl } from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import PushNotification from 'react-native-push-notification';
// import Carousel from 'react-native-reanimated-carousel';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
const { width } = Dimensions.get('window');

const Home = (props, { route }) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [textinputVal, setTextinputVal] = useState("Gravid Digital 1 Year")
  const [price, setPrice] = useState("1800")
  const [type, setType] = useState("Select")
  const [sliderlist, setSliderList] = useState([])
  const [issuelist, setIssueList] = useState([])
  const [blogslist, setBlogsList] = useState([])
  const [offerlist, setOfferList] = useState([])
  const [videolist, setVideoList] = useState([])
  const [searchTxt, setSearchTxt] = useState("")
  const [issuelistSearch, setIssueListSearch] = useState([])
  const [blogslistSearch, setBlogsListSearch] = useState([])
  const [offerListSearch, setofferListSearch] = useState([])
  const [videolistSearch, setVideoListSearch] = useState([])
  const [btmSlider, setBtmSlider] = useState([])
  const [cartCount, setCartCount] = useState("")
  const [isLoader, setIsLoader] = useState(false)
  const [isSave, setIsSave] = useState(false)

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      console.log('handle in foregound====', remoteMessage.data.body)
    })
    return unsubscribe
  }, [])

  PushNotification.configure({
    onNotification: function (notification) {
      if (notification.userInteraction) {
        if (notification?.data?.body === "webinar") {
          props.navigation.navigate("Webinar")
        }
        else if (notification?.data?.body === "package") {
          props.navigation.navigate("Packages")
        }
        else if (notification?.data?.body === "programs") {
          props.navigation.navigate("Programs")
        }
        else if (notification?.data?.body === "magazine") {
          props.navigation.navigate("CurrentIssue")
        }
        else if (notification?.data?.body === "offer") {
          props.navigation.navigate("Offers")
        }
        else if (notification?.data?.body === "expert") {
          props.navigation.navigate("ExpertList")
        }
        else if (notification?.data?.body === "payment") {
          // alert("Work in processing")
          // props.navigation.navigate("Offers")
        }
      }
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  useEffect(() => {
    if (isFocused) {
      HomePagedata();
      setProfileAndHomeData();
      addBookmark();
      getCart();
      userCategoryStore();
    }
  }, [isFocused])

  // useEffect(() => {
  //   if (searchTxt && searchTxt != "") {
  //     setIssueList(issuelist.filter((item) => item.title?.toLowerCase().includes(searchTxt.toLowerCase()) || item.short_description?.toLowerCase().includes(searchTxt.toLowerCase())))
  //     setBlogsList(blogslist.filter((item) => item.title?.toLowerCase().includes(searchTxt.toLowerCase()) || item.short_description?.toLowerCase().includes(searchTxt.toLowerCase())))
  //     setVideoList(videolist.filter((item) => item.title?.toLowerCase().includes(searchTxt.toLowerCase()) || item.short_description?.toLowerCase().includes(searchTxt.toLowerCase())))
  //     setofferListSearch(offerlist.filter((item) => item.title?.toLowerCase().includes(searchTxt.toLowerCase()) || item.short_description?.toLowerCase().includes(searchTxt.toLowerCase())))
  //     HomePagedata();
  //   }
  // }, [searchTxt])
  const onSearch = (text) => {
    if (text?.length == 0) {
      HomePagedata()
    } else {
      setIssueList(issuelist.filter((item) => item.title?.toLowerCase().includes(text.toLowerCase()) || item.short_description?.toLowerCase().includes(text.toLowerCase())))
      setBlogsList(blogslist.filter((item) => item.title?.toLowerCase().includes(text.toLowerCase()) || item.short_description?.toLowerCase().includes(text.toLowerCase())))
      setVideoList(videolist.filter((item) => item.title?.toLowerCase().includes(text.toLowerCase()) || item.short_description?.toLowerCase().includes(text.toLowerCase())))
      setOfferList(offerlist.filter((item) => item.title?.toLowerCase().includes(text.toLowerCase()) || item.short_description?.toLowerCase().includes(text.toLowerCase())))
    }
  }
  const setProfileAndHomeData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal)
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  const HomePagedata = () => {
    setIsLoader(true);
    Apis.HomePagedata({})
      .then(async (json) => {
        console.log('HomePagedata', json)
        if (json.status == true) {
          setBlogsList(json?.data?.blog?.data);
          setOfferList(json?.data?.offer?.data);
          setSliderList(json?.data?.sliders?.data);
          setVideoList(json?.data?.expVedios?.data);
          setIssueList(json?.data?.issuelist?.data);
          setBtmSlider(json?.data?.other_sliders?.data);
        }
        setIsLoader(false);
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false);
      })
  }

  const getCart = () => {
    setIsLoader(true);
    Apis.getCartData({})
      .then(async json => {


        if (json.status == true) {
          setCartCount(json?.cartCount)
          setIsLoader(false);
        }

      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const userCategoryStore = async () => {
    let categoryId = await AsyncStorage.getItem('catID')
    if (categoryId.length > 0) {
      let formdata = new FormData();
      formdata.append("category_id", categoryId)
      // console.log('formdataqqqqqq', formdata)
      Apis.userCategory(formdata)
        .then(async (json) => {
          // console.log('userCategory ====== ', json);
          if (json.status == true) {
            setIsLoader(false)
          } else (json)(
          )
        }).catch((error) => {
          console.log("error", error);
          setIsLoader(false)
        })
    }
  }
  const addBookmark = (bookmarkID, bookmarkType) => {
    const params = {
      id: bookmarkID,
      type: bookmarkType
    }

    // console.log('params', params)
    Apis.AddBookmark(params)
      .then(async (json) => {
        console.log('json', json)
        if (json.status == true) {
          Toast.show(json.message, Toast.LONG);
          HomePagedata()
          // setIsSave(!isSave)
        }
      })
  }

  const clinkOntype = async (item) => {
    if (item.offer_type === "webinar") {
      props.navigation.navigate("Webinar")
    }
    else if (item.offer_type === "episode") {
      props.navigation.navigate("Webinar", { offer_type: "record" })
    }
    else if (item.offer_type === "package") {
      props.navigation.navigate("Packages")
    }
    else if (item.offer_type === "program") {
      props.navigation.navigate("Programs")
    }
    else if (item.offer_type === "Magzine") {
      props.navigation.navigate("CurrentIssue")
    }
    else if (item.offer_type == "parenting_tv") {
      props.navigation.navigate("ParentingList")
    }
    else if (item.offer_type === "expert") {
      props.navigation.navigate("ExpertList")
    }
    else if (item.offer_type === "tracker") {
      props.navigation.navigate("TrackerLink")
    }
  }

  const renderItemIssue = ({ item, index }) => {
    console.log('itm11111111', item)
    return (
      <TouchableOpacity
        style={[styles.currenIssueView, {
          alignItems: "center", elevation: 2,
          borderRadius: 10,
          marginBottom: 3,
        }, index == 0 ? { marginLeft: 15 } : null]}
        onPress={() => props.navigation.navigate("RecentIssuesDetail", { item, HomePagedata })}
      >
        <View style={styles.leftView}>
          <View style={styles.isFreeView}>
            <Text style={styles.isFree}>{item.payment_type}</Text>
          </View>
          <Text style={styles.issuetitle}>{item.title}</Text>
          {/* <RenderHtml
            contentWidth={100}
            source={{ html: item.description }}
          /> */}
          <Text style={styles.issueDes}> {item.short_description} </Text>
          <TouchableOpacity onPress={() => addBookmark(item.id, "magazine")}
            style={[styles.bkmrkBtn, { marginTop: 10 }]}>
            {item?.bookmark != null?
              <View style={{
                backgroundColor: colors.themeColor,
                padding: 6,
                borderRadius: 100
              }}>
                {svgs.bookmark("", 8, 8)}
              </View>
              :
              <View style={styles.bkmrkIcn}>
                {svgs.bookmark("", 8, 8)}
              </View>
            }
            {/* <View style={styles.bkmrkIcn}>
              {svgs.bookmark("", 8, 8)}
            </View> */}
            <Text style={styles.bkmrkBtnTxt}>Bookmark</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: imageurl + item.image }} style={[styles.issueImg, { marginRight: 9 }]} />
      </TouchableOpacity>
    );
  };

  const renderItemNewsLetter = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("RecentBlogsDetail", { item })}
        style={[styles.NewsLetterView, {
          alignItems: "center", elevation: 2,
          borderRadius: 10,
          marginBottom: 3,
        }, index == 0 ? { marginLeft: 15 } : null]}
      >
        <Image source={{ uri: imageurl + item.image }} style={[styles.newsImg, { marginTop: 9 }]} />
        <View style={styles.newsleftView}>
          <View style={styles.bookanddo}>
            <TouchableOpacity style={styles.bkmrkBtn} onPress={() => addBookmark(item.id, "blog")}>
              {item?.bookmark != null ?
                <View style={{
                  backgroundColor: colors.themeColor,
                  padding: 6,
                  borderRadius: 100
                }}>
                  {svgs.bookmark("", 8, 8)}
                </View>
                :
                <View style={styles.bkmrkIcn}>
                  {svgs.bookmark("", 8, 8)}
                </View>
              }
              <Text style={styles.bkmrkBtnTxt}>Bookmark</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemOffers = ({ item, index }) => {
    return (
      // <TouchableOpacity
      //   onPress={async () => clinkOntype(item)}
      //   style={[styles.NewsLetterView, index == 0 ? { marginLeft: 15 } : null]}
      // >
      //   <View style={styles.offeringImage}>
      //     <Image source={{ uri: imageurl + item.image }} style={styles.newsImg} />
      //   </View>
      // </TouchableOpacity>
      <TouchableOpacity onPress={async () => clinkOntype(item)}
        style={[{ marginRight: 7 }, index == 0 ? { marginLeft: 15 } : null]}


      >
        <Image source={{ uri: imageurl + item.image }} style={{
          width:80,
          height:80,
          resizeMode: "cover",
          borderRadius: 65
        }} />
      </TouchableOpacity>
    );
  };
  const renderItemvideo = ({ item, index }) => {
    console.log('item>>>>>>>>222222', item)
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("VideosDetails", { item })}
        style={[styles.NewsLetterView2, {
          elevation: 2,
          borderRadius: 10,
          marginBottom: 3,
        }, index == 0 ? { marginLeft: 15 } : null]}>
        <Image source={{ uri: imageurl + item.image }} style={[styles.newsImg, { marginTop: 9 }]} />
        <View style={styles.newsleftView}>
          <View style={styles.bookanddo}>
            <TouchableOpacity style={styles.bkmrkBtn} onPress={() => addBookmark(item.id, "video")}>
              {item?.bookmark != null ?
                <View style={{
                  backgroundColor: colors.themeColor,
                  padding: 6,
                  borderRadius: 100
                }}>
                  {svgs.bookmark("", 8, 8)}
                </View>
                :
                <View style={styles.bkmrkIcn}>
                  {svgs.bookmark("", 8, 8)}
                </View>
              }
              <Text style={styles.bkmrkBtnTxt}>Bookmark</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.bkmrkBtn}>
              <View style={styles.bkmrkIcn}>
                {svgs.download("", 12, 12)}
              </View>
              <Text style={styles.bkmrkBtnTxt}>Download</Text>
            </TouchableOpacity> */}
          </View>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOtherSlider = (url) => {
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <TouchableOpacity
          onPress={() => { props.navigation.navigate('Profile') }}>
          <Image
            style={styles.signupImg}
            source={userData?.profile ? { uri: imageurl + userData?.profile } : require('../../assets/images/profileicon.png')} />
        </TouchableOpacity>
        <View style={styles.headingText}>
          {/* <Text style={styles.hello}>{userData?.fname}</Text> */}
          <Text style={styles.hello}>{userData?.name} {userData?.lname}</Text>
          {/* <Text style={styles.userName}>{userData?.lname}</Text> */}
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 5, padding: 8, borderRadius: 100 }}
          onPress={() => { props.navigation.navigate('Notifications') }}>
          <Image style={styles.notification} source={require('../../assets/images/notification.png')} />
          {/* <Text style={{position:"absolute",fontSize:8,right:5,top:2.5,color:colors.themeColor}}>5</Text> */}
        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => { props.navigation.navigate('Cart') }}>
          <Image style={styles.cart} source={require('../../assets/images/cart.png')} />
          <View style={{ position: "absolute", borderWidth: 1, borderRadius: 100, borderColor: colors.themeColor, width: 12, height: 12, right: -5, top: -8, backgroundColor: colors.themeColor }}>
            <Text style={{ fontSize: 10, color: "white", marginHorizontal: 2, marginTop: -2 }}>{cartCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isLoader == true ?
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.searchBoxView}>
            {svgs.search(colors.grayRegular, 17, 17)}
            <TextInput
              placeholder='Search'
              style={styles.searchBox}
              // value={searchTxt}
              onChangeText={(text) => { onSearch(text) }}
            // onChangeText={setSearchTxt}
            />
          </View>
          <View style={styles.endView}>
            <Swiper style={{}}
              activeDotStyle={{ backgroundColor: 'transparent', }}
              dotStyle={{ backgroundColor: 'transparent', }}
              autoplay={true}
            >
              {
                sliderlist?.map((item) => {
                  return (
                    <TouchableOpacity key={item.id} onPress={item.slider_url ? () => handleOtherSlider(item.slider_url) : null}>
                      <Image key={item.id} style={styles.endImg} source={{ uri: imageurl + item.image }} />
                    </TouchableOpacity>
                  )
                })
              }
            </Swiper>

          </View>

          {/* Offers  */}

          <View style={styles.sliderHadding}>
            <Text style={styles.haddingTxt}>Our Offerings</Text>
            <TouchableOpacity style={styles.viewAllBtn} onPress={() => props.navigation.navigate("Offers", { adsense: btmSlider, offerlist })}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchTxt && searchTxt != "" ? offerListSearch : offerlist}
            // style={{ paddingLeft: 24 }}
            renderItem={renderItemOffers}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          // extraData={selectedId}
          />
          <View style={styles.sliderHadding}>
            <Text style={styles.haddingTxt}>Magazines</Text>
            <TouchableOpacity style={styles.viewAllBtn} onPress={() => props.navigation.navigate("CurrentIssue")}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={issuelist} //searchTxt && searchTxt != "" ? issuelistSearch : issuelist
            renderItem={renderItemIssue}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          {/* Blogs & Artical */}
          <View style={styles.sliderHadding}>
            <Text style={styles.haddingTxt}>Blogs & Articles</Text>
            <TouchableOpacity style={styles.viewAllBtn} onPress={() => props.navigation.navigate("blogs", { adsense: btmSlider })}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={blogslist} //searchTxt && searchTxt != "" ? blogslistSearch : blogslist
            // style={{ paddingLeft: 24 }}
            renderItem={renderItemNewsLetter}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          // extraData={selectedId}
          />

          <View style={styles.sliderHadding}>
            <Text style={styles.haddingTxt}>Video Library</Text>
            <TouchableOpacity style={styles.viewAllBtn} onPress={() => props.navigation.navigate("Video_Library")}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ paddingHorizontal: 10 }}> */}
          <FlatList
            data={videolist.slice(0, 5)} //searchTxt && searchTxt != "" ? videolistSearch : videolist.slice(0, 5)
            // style={{ paddingLeft: 14 }}
            renderItem={renderItemvideo}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          {/* </View> */}
          <View style={styles.endView} >
            <Swiper style={{}}
              activeDotStyle={{ backgroundColor: 'transparent', }}
              dotStyle={{ backgroundColor: 'transparent', }}
              autoplay={true}
            >
              {
                btmSlider?.map((item) => {
                  return (
                    <TouchableOpacity key={item.id} onPress={item.slider_url ? () => handleOtherSlider(item.slider_url) : null}>
                      <Image key={item.id} style={styles.endImg} source={{ uri: imageurl + item.image }} />
                    </TouchableOpacity>
                  )
                })
              }

            </Swiper>
          </View>

          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
          >
            <View style={{ backgroundColor: "white", borderRadius: 10 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ position: "absolute", top: -34, left: -34 }}>
                  <Image source={require('../../assets/images/Polygon-off.png')} style={styles.discount} />
                </View>
                <View style={{ position: "absolute", top: 0, left: 0 }}>
                  <Image source={require('../../assets/images/off-text.png')} style={{ height: 40, width: 40 }} />
                </View>
                <View style={{ alignItems: "center", marginHorizontal: 20, marginTop: 10 }}>
                  <Image source={require('../../assets/images/GRAVID_O.png')} style={{ height: 104, width: 104 }} />
                  <Text style={styles.offHadding}>Now Enjoy Reading the latest Gravid Readings on the app</Text>
                  <Text style={styles.offDes}>Subscribe to Gravid Digital & Get Unlimited Access anywhere , anytime.</Text>
                  <Text style={styles.offType}>Gravid Digital</Text>
                  <Image source={require('../../assets/images/digital-reading.png')} style={styles.digitalReading} />
                </View>
                <TextInput
                  style={styles.gravidTime}
                  editable={false}
                  value={textinputVal}
                />
                <View style={styles.priceView}>
                  <TextInput
                    style={styles.gravidPrice}
                    editable={false}
                    value={price}
                  />
                  <TextInput
                    style={styles.gravidSelect}
                    editable={false}
                    value={type}
                  />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={() => { setModalVisible(false) }}>
                  <Text style={styles.submitBtnTxt}>SUBMIT</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>

      }


    </View>

  );
};

export default Home;
