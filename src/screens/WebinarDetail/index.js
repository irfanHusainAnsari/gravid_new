/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import { svgs, colors, fonts } from '@common';
import styles from './styles';
import Swiper from 'react-native-swiper';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"

const WebinarDetail = props => {
  const isFocused = useIsFocused();
  const paid = props?.route?.params?.paid;
  const [modalVisible, setModalVisible] = useState(false);
  const [delail, setDetail] = useState();
  const [userData, setUserData] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [dates, setDates] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
 console.log('delailprops', delail?.expert_id)
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);

  dummyArray = [
    {id:1, time1: '06:00 PM', time2: '06:30 PM' },
    {id:2, time1: '07:00 PM', time2: '07:30 PM' },
    {id:3,time1: '08:00 PM', time2: '08:30 PM' },
    {id:4,time1: '09:00 PM', time2: '09:30 PM' },
    {id:5,time1: '10:00 PM', time2: '10:30 PM' },
    {id:6,time1: '11:00 PM', time2: '11:30 PM' },
  ];
  var date = new Date(dates);
  var year = date.toLocaleString("default", { year: "numeric" });
  var monthh = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });
  var formattedDate = year + "/" + monthh + "/" + day;
 
  useEffect(() => {
    HomePagedata();
  }, []);

  const HomePagedata = () => {
    const params = {
      id: paid?.id,
    };
    Apis.webinar_detail(params).then(async json => {
      console.log('Detail=====:', JSON.stringify(json));
      if (json.status == true) {
        setDetail(json.data);
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused]);

  const setUserProfileData = async () => {
    console.log('object');
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      console.log('jsondata', jsondata);
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);
        console.log('imageurl + newVal.profile', imageurl + newVal.profile);
        setShowdpimage({ path: imageurl + newVal.profile });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleInstamozo = () => {
    console.log('objectsssssss');
    setIsLoader(true);
    const params = {
      type: 2,
      type_id: delail?.id,
      amount: delail?.amount,
      purpose: delail?.title,
      phone: userData?.mobile,
      buyer_name: userData?.name,
      email: userData?.email,
    };
    Apis.instaMojoPayment(params)
      .then(async json => {
        console.log('objectjsonjson>>>>', json);
        if (json.status == true) {
          props.navigation.navigate('InstaMojoWebScreen', {
            instamojoData: json,
          });
          // handleUpdatePayment(json?.payment_request?.id)
          // console.log('paymentInstamojo', JSON.stringify(json.payment_request));
          // alert("Payment Success")
          // setMagazineDetail({ ...magazineDetail, check_payment: json.data });
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const handleRazorpay = () => {
    var options = {
      description: 'Credits towards consultation',
      image: imageurl + 'uploads/setting/41142.png',
      currency: 'INR',
      // key: 'rzp_test_2dCKxMSjz9CEKT', // Your api key old
      key: 'rzp_live_BlaEnmZv0WaFAe', // Your api key new for update
      amount: parseFloat(delail?.amount) * 100,
      name: 'Gravid',
      // prefill: {
      //   email: '',
      //   contact: '',
      //   name: ''
      // },
      theme: { color: '#F37254' },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        setModalVisible(false);
        console.log(`Success: ${data?.razorpay_payment_id}`);
        handleUpdatePayment(data?.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        setModalVisible(false);
        console.log('error', JSON.stringify(error));
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const handleUpdatePayment = paymentID => {
    const params = {
      type: 2,
      type_id: delail?.id,
      pay_id: paymentID,
      currency: 'INR',
      amount: parseFloat(delail?.amount),
      rozerpay_status: 'success',
    };
    Apis.updatePayment(params).then(async json => {
      // console.log('datalistHomePage=====:', JSON.stringify(json));
      if (json.status == true) {
        HomePagedata();
        alert('Payment Success');
      }
    });
  };

  const handleJoinWebinar = async data => {
    console.log('newaoiurl', data);
    // console.log("newaoiurl" , JSON.stringify(data)?.data?.web_link);
    const params = {
      id: paid.id,
    };
    Apis.webinar_detail(params).then(async json => {
      console.log('Detail=====:', JSON.stringify(json));
      if (json.status == true) {
        setDetail(json?.data);
        console.log('delaildelaildelaildelaildelail', delail?.web_link);
      }
    });
    // await Linking.openURL(`https://${delail?.web_link}`);
    props.navigation.navigate('WebViewScreen', { delail });
  };

  const onDateChange = date => {
    setDates(date);
    const params = {
      id: delail?.expert_id,
      date: formattedDate,
     
    }
    Apis.SendDateWebinar(params)
    .then(async (json) => {
      console.log('SendDateWebinar=====:',json);
    })
  };



  const startDate = dates ? dates.toString() : '';
  console.log('date', startDate);
  const customDatesStylesCallback = date => {
    switch (date.isoWeekday()) {
      case 1: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#E3E3E3',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };

      case 2: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 3: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 4: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 5: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };
      case 6: // Saturday
        return {
          style: {
            backgroundColor: '#E3E3E3',
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };
      case 7: // Sunday
        return {
          style: {
            backgroundColor: '#E3E3E3',
            // borderRadius:100,
            // borderWidth:1,
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{ flex: 3 }}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Webinar Detail</Text>
        <View style={{ flex: 3 }} />
      </View>
      <View style={styles.radiusView} />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 }}>
          <Image
            source={{ uri: imageurl + delail?.image }}
            style={{ width: '100%', resizeMode: 'contain', height: 300 }}
          />

          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={require('../../assets/images/calendar.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              />
              <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.OptimaMedium,
                    color: '#000',
                  }}>
                  Duration
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fonts.OptimaMedium,
                    color: 'gray',
                  }}>
                  22nd April
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={require('../../assets/images/watch.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              />
              <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.OptimaMedium,
                    color: '#000',
                  }}>
                  Time of Sessions
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fonts.OptimaMedium,
                    color: 'gray',
                  }}>
                  5pm to 6pm
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={require('../../assets/images/card.png')}
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
              />

              <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.OptimaMedium,
                    color: '#000',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fonts.OptimaMedium,
                    color: 'gray',
                  }}>
                  Free Session
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.webinarTitle}>{delail?.title}</Text>
          {/* <Text style={styles.webinarDes}>{delail?.description}</Text> */}
          <RenderHtml
            contentWidth={width}
            source={{ html: delail?.description }}
          />
          {delail?.check_payment?.id || delail?.payment_type == 'Free' ? (
            <TouchableOpacity
              style={styles.joinWebinarBtn}
              onPress={delail => handleJoinWebinar(delail)}>
              <Text style={styles.joinWebinarBtnTxt}>Get Link</Text>
            </TouchableOpacity>
          ) : (
            // <TouchableOpacity style={styles.joinWebinarBtn} onPress={() => { setModalVisible(true) }}>
            //   <Text style={styles.joinWebinarBtnTxt}>Join</Text>
            // </TouchableOpacity>
            <TouchableOpacity
              style={styles.joinWebinarBtn}
              onPress={() => setOpenCloseCalendar(!openCloseCalendar)}>
              <Text style={styles.joinWebinarBtnTxt}>Join</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal
        isVisible={openCloseCalendar}
        style={{
          top: 0,
          left: 0,
          right: 0,
          padding: 0,
          margin: 0,
          marginHorizontal: 0,
          justifyContent: 'flex-end',
        }}>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <View style={styles.haddingView}>
            <TouchableOpacity
              style={{ flex: 3 }}
              onPress={() => props.navigation.goBack()}>
              {svgs.backArrow('black', 24, 24)}
            </TouchableOpacity>
            <Text style={styles.haddingTxt}>Date & Time</Text>
            <View style={{ flex: 3 }} />
          </View>
          <View style={styles.radiusView} />

          <ScrollView style={{}}>
            <Text style={[styles.haddingTxt, { paddingHorizontal: 20 }]}>
              Date & Time
            </Text>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              firstDay={1}
              customDatesStyles={customDatesStylesCallback}
              customDayHeaderStyles={() => {
                return {
                  textStyle: { color: '#FE887E', opacity: 1, fontWeight: 'bold' },
                };
              }}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              onDateChange={onDateChange}
              todayBackgroundColor="#FE887E"
            />
            <View
              style={{
                borderBottomColor: '#E3E3E3',
                borderWidth: 1,
                marginHorizontal: 20,
                marginVertical: 15,
                opacity: 0.1,
              }}
            />
            <Text style={styles.datetext}>May 2,2023</Text>
            <View style={{ marginHorizontal: 1 }}>
              <FlatList
                data={dummyArray}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedItem(item.time1);
                          setModalVisible(true);
                        }}>
                        <Text
                          style={{
                            borderWidth: 1,
                            borderColor: '#F1F1F1',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            fontFamily: fonts.OptimaBold,
                            backgroundColor:
                              selectedItem == item.time1
                                ? colors.themeColor
                                : null,
                          }}>
                          {item.time1}-{item.time2}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.joinWebinarBtn, { marginHorizontal: 20 }]}
            onPress={() => setOpenCloseCalendar(!openCloseCalendar)}>
            <Text style={styles.joinWebinarBtnTxt}>Join</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{flex:1, backgroundColor: "white"}}>
          <TouchableOpacity style={styles.joinWebinarBtn} onPress={() =>setOpenCloseCalendar(!openCloseCalendar)}>
              <Text>openCloseCalendar</Text>
              </TouchableOpacity>
          </View> */}
      </Modal>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 25,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/images/GRAVID_O.png')}
                style={{ height: 104, width: 104 }}
              />
              <Text style={styles.offHadding}>
                To Access Paid Features{'\n'} you need to pay
              </Text>
              <Text style={styles.offDes}>
                {'\u20B9'}
                {delail?.amount}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleInstamozo}
            //  onPress={handleRazorpay}
            >
              {isLoader ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.submitBtnTxt}>Make Payment</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default WebinarDetail;
