import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Swiper from 'react-native-swiper';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import { useIsFocused } from '@react-navigation/native';
import Modelmain from '../../component/Modelmain';
const Webinar = (props) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [webinarrecoded, setWebinarRecoded] = useState([]);
  const [webinarLive, setWebinarListApi] = useState([]);
  const [webinarLiveSearch, setWebinarListSearch] = useState([]);
  const [recordedList, setRecordedList] = useState([]);
  const [recordedListSearch, setRecordedListSearch] = useState([]);
  const [type, setType] = useState("live");
  const [btmSlider, setBtmSlider] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isVideoLoader, setIsVideoLoader] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [cartCount, setCartCount] = useState("")
  const [item, setItem] = useState()
  useEffect(() => {
    recordedVideo();
    getCart();
  }, [type, isFocused]);

  const getCart = () => {
    setIsLoader(true);
    Apis.getCartData({})
      .then(async json => {
        setCartCount(json?.cartCount)
        if (json.status == true) {
          setCartData(json?.data[0]);
          setTaxData(json?.taxData);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  useEffect(() => {
    if (searchTxt && searchTxt != '') {
      setWebinarListSearch(
        webinarLive.filter(item =>
           item.short_description?.toLowerCase().includes(searchTxt.toLowerCase()) || item.title?.toLowerCase().includes(searchTxt.toLowerCase())
        ),
      );
      setRecordedListSearch(
        recordedList.filter(item =>
          item.title?.toLowerCase().includes(searchTxt.toLowerCase()),
        ),
      );
    }
  }, [searchTxt]);

  // new added
  const recordedVideo = () => {
    setIsVideoLoader(true);
    Apis.recordedVideo({})
      .then(async json => {

        if (json.status == true) {
          setRecordedList(json.data);
        }
        setIsVideoLoader(false);
      })
      .catch(err => {
        setIsVideoLoader(false);
        console.log('recordedVideo err : ', err);
      });
  };
  const EpisodeAddtocard = (paid) => {
    setModalVisible(false)
    setIsLoader(true);
    let form_data = new FormData();
    form_data.append("data_id", paid?.id); //id
    form_data.append("category_id", paid?.category_id); //category_id
    form_data.append("type", "episode"); //"episode"
    form_data.append("amount", paid?.amount); //amount
    Apis.getCartPostSaveData(form_data).then(async data => {
      if (data.status == true) {
        ToastAndroid.show(data?.message, ToastAndroid.LONG)
        setIsLoader(false);
        props.navigation.navigate("Cart")
      }
      else {
        setIsLoader(false);
        ToastAndroid.show(data?.message, ToastAndroid.LONG)
      }
    }).catch((err) => {
      setIsLoader(false);
      console.log("errrr form_data", err);
    })
  }
  const renderVideos = ({ item }) => {
    console.log('item=========', item);
    return (
      <TouchableOpacity
        style={styles.NewsLetterView}
        onPress={() => {
          item?.payment_type == "Paid" && item?.check_payment == null ?
            (setItem(item),
              setModalVisible(true))
            :
            (props.navigation.navigate("RecordedWebinarVidioList", { item: item }))
        }
        }>
        <Image source={{ uri: imageurl + item.file }} style={styles.newsImg}/>
        <View style={styles.paidType}>
          <Text style={styles.paidTypeTxt}>{item.payment_type}</Text>
        </View>
        {/* <TouchableOpacity style={styles.wifiCon} onPress={() => handleDelete(item.type, item.type == "blog" ? item.blogs.id : item.magzine.id)}>
          {svgs.deleteIcon(colors.white, 10, 10)}
        </TouchableOpacity> */}
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.issueDes} numberOfLines={3}>
            {item.short_description}
          </Text>
        </View>
      </TouchableOpacity >
    );
  };

  const handleWebinarType = type => {
    setType(type);
  };

  const handleWebinarDetail = item => {
   
    props.navigation.navigate('webinarDetail', { paid: item });
  };

  useEffect(() => {
    // if (isFocused) {
    HomePagedata();
    recoder();
    // }
  }, [isFocused, type]);

  const HomePagedata = () => {
    const params = {
      type: type == 'live',
    };
    setIsLoader(true);
    Apis.webinarlistLive(params)
      .then(async json => {

        if (json.status == true) {
          setWebinarListApi(json?.data?.webinarList);
          setBtmSlider(json?.data?.other_sliders?.data);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };
  const recoder = () => {
    const params = {
      type: type == 'recorded',
    };
    Apis.webinarrecoded(params).then(async json => {

      if (json.status == true) {
        setWebinarRecoded(json?.data?.webinarList);
        setBtmSlider(json?.data?.other_sliders?.data);
      }
    });
  };
  const LiverenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleWebinarDetail(item)}
        style={styles.NewsLetterView}>
        <Image source={{ uri: imageurl + item.image }} style={styles.newsImg} />
        <View style={styles.paidType}>
          <Text style={styles.paidTypeTxt}>{item.payment_type}</Text>
        </View>
        <View style={styles.newsleftView}>
          <Text style={styles.issuetitle}>{item.title}</Text>
          <Text style={styles.issueDes}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleOtherSlider = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <Text style={styles.haddingTxt}>Webinar</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20, top: 15 }}
          onPress={() => { props.navigation.navigate('Cart') }}>
          <Image style={styles.cart} source={require('../../assets/images/cart.png')} />
          <View style={{ position: "absolute", borderWidth: 1, borderRadius: 100, borderColor: colors.themeColor, width: 13, height: 13, right: -6, top: -8, backgroundColor: "white" }}>
            <Text style={{ fontSize: 10, color: colors.themeColor, marginHorizontal: 2.3, marginTop: -2 }}>
              {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.radiusView} />
      <View style={styles.searchBoxView}>
        {svgs.search(colors.grayRegular, 17, 17)}
        <TextInput
          placeholder="Search                                                                         "
          style={styles.searchBox}
          value={searchTxt}
          onChangeText={setSearchTxt}
        />
      </View>

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.tabView}>
          <TouchableOpacity
            style={
              type == 'live'
                ? styles.WebinarActiveBtn
                : styles.WebinarInactiveBtn
            }
            onPress={() => handleWebinarType('live')}>
            {type == 'live' ? (
              <>
                <View style={styles.talkBubbleTriangleLeft} />
                <View style={styles.talkBubbleTriangleRight} />
              </>
            ) : null}
            <Text
              style={
                type == 'live'
                  ? styles.WebinarActiveBtnTxt
                  : styles.WebinarInactiveBtnTxt
              }>
              Webinar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type == 'record'
                ? styles.WebinarActiveBtn
                : styles.WebinarInactiveBtn
            }
            onPress={() => handleWebinarType('record')}>
            {type == 'record' ? (
              <>
                <View style={styles.talkBubbleTriangleLeft} />
                <View style={styles.talkBubbleTriangleRight} />
              </>
            ) : null}
            <Text
              style={
                type == 'record'
                  ? styles.WebinarActiveBtnTxt
                  : styles.WebinarInactiveBtnTxt
              }>
              Episodes
            </Text>
          </TouchableOpacity>
        </View>
        {isLoader ? (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {type == 'live' ? (
              <>
                <FlatList
                  data={
                    searchTxt && searchTxt != ''
                      ? webinarLiveSearch
                      : webinarLive
                  }
                  numColumns={2}
                  style={{ paddingLeft: 16, marginTop: 26, flexDirection: 'row' }}
                  renderItem={LiverenderItem}
                  keyExtractor={item => item.id}
                />
              </>
            ) : (
              <>
                <FlatList
                  data={
                    searchTxt && searchTxt != ''
                      ? recordedListSearch
                      : recordedList
                  }
                  numColumns={2}
                  style={{ paddingLeft: 16, marginTop: 40, flexDirection: 'row' }}
                  renderItem={renderVideos}
                  keyExtractor={item => item.id}
                />
              </>
            )}

            <View style={styles.endView}>
              <Swiper
                activeDotStyle={{ backgroundColor: 'transparent' }}
                dotStyle={{ backgroundColor: 'transparent' }}
                autoplay={true}>
                {btmSlider?.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={
                        item.slider_url
                          ? () => handleOtherSlider(item.slider_url)
                          : null
                      }>
                      <Image
                        style={styles.endImg}
                        source={{ uri: imageurl + item.image }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Swiper>
            </View>
          </View>
        )}
      </ScrollView>
      {modalVisible &&
        <Modelmain
          onPayment={() => { EpisodeAddtocard(item) }}
          modalVisible={modalVisible}
          onpress={() => { setModalVisible(false) }}
        />
      }
    </View>
  );
};

export default Webinar;
