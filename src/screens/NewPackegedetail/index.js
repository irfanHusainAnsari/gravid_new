/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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
import {svgs, colors, fonts} from '@common';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
import RazorpayCheckout from 'react-native-razorpay';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-simple-toast';
import styles from './styles';
const {width, height} = Dimensions.get('window');
const NewPackegedetail = props => {
  const isFocused = useIsFocused();
  const paid = props?.route?.params?.paid;

  const [modalVisible, setModalVisible] = useState(false);
  const [delail, setDetail] = useState();
  console.log('delail', delail);
  const [cartData, setCartData] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [dates, setDates] = useState(null);
  const [dateforcartsave, setdateforcartsave] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [programDetailItem, setProgramDetailItem] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [taxData, setTaxData] = useState('');
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  const taxDataitem = parseInt((taxData?.gst / 100) * cartData?.amount);
  const totalAmount = taxDataitem + cartData?.amount;
  useEffect(() => {
    getPackageData();
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused]);

  const getPackageData = () => {
    setIsLoader(true);
    const params = {
      search_id: paid?.id,
    };
    Apis.getPackageItemDetail(params)
      .then(async json => {
        console.log('getPackageDatails==?????', json.data);
        if (json.status == true) {
          setDetail(json?.data[0]);
          setIsLoader(false);
        }
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };
  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);

        setShowdpimage({path: imageurl + newVal.profile});
      }
    } catch (error) {}
  };

  const onSetScreen = () => {
    setIsLoader(true);
    let form_data = new FormData();
    form_data.append('data_id', paid?.id);
    form_data.append('amount', paid?.price);
    form_data.append('type', 'package');

    Apis.getCartPostSaveData(form_data)
      .then(async data => {
        if (data.status == true) {
          Toast.show(data?.message, Toast.LONG);
          setIsLoader(true);
          Apis.getCartData({})
            .then(async json => {
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
          props.navigation.navigate('Cart');
        } else {
          setIsLoader(false);
          Toast.show(data?.message, Toast.LONG);
        }
      })
      .catch(err => {
        console.log('errrr form_data', err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Package Detail</Text>
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
      </View>
      <View style={styles.radiusView} />
      {programDetailItem && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20}}>
            {isLoader ? (
              <View style={{marginTop: 100, height: 200}}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <Image
                source={{uri: imageurl + delail?.image}}
                style={{width: '100%', resizeMode: 'contain', height: 300}}
              />
            )}
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
              {delail?.duration != null && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/calendar.png')}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginRight: 6,
                    }}
                  />
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
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
                      {delail?.duration}
                    </Text>
                  </View>
                </View>
              )}
              {delail?.total_sessions != null && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/watch.png')}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginRight: 6,
                    }}
                  />
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: fonts.OptimaMedium,
                        color: '#000',
                      }}>
                      Sessions
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: fonts.OptimaMedium,
                        color: 'gray',
                      }}>
                      {delail?.total_sessions}
                    </Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/images/card.png')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginRight: 6,
                  }}
                />
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                    ₹ {delail?.discounted_price} /-
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.webinarTitle}></Text>
            <Text style={{fontFamily:fonts.OptimaMedium}}>{delail?.title}</Text>
            <Text style={styles.webinarTitle}></Text>
            <RenderHtml
              contentWidth={width}
              source={{html: delail?.short_description}}
            />
            <Text style={styles.webinarTitle}></Text>
            <Text style={{fontFamily:fonts.OptimaMedium}}>{delail?.register_By}</Text>
            {/* <Text style={styles.webinarTitle}>Includes :</Text> */}
            <Text style={{fontFamily:fonts.OptimaMedium}}>{delail?.include_description}</Text>
            {/* <Text style={styles.webinarTitle}>Description :</Text> */}
            <RenderHtml
              contentWidth={width}
              source={{html: delail?.description}}
            />
            {/* <TouchableOpacity
                            style={styles.joinWebinarBtn}
                            onPress={onSetScreen}>
                            <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                        </TouchableOpacity> */}
            {delail?.check_payment?.id ? (
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={() => Linking.openURL(`${delail?.web_link}`)}>
                <Text style={styles.joinWebinarBtnTxt}>Join Link</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onSetScreen}>
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
          {delail?.check_payment?.id && delail?.community_banner != null && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.grayLight,
                borderRadius: 20,
                marginHorizontal: 20,
                flex: 1,
              }}
              onPress={() => Linking.openURL(`${delail?.community_link}`)}>
              <Image
                style={{
                  width: '100%',
                  height: 160,
                  resizeMode: 'stretch',
                  borderRadius: 20,
                  flex: 1,
                }}
                source={{uri: imageurl + delail?.community_banner}}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default NewPackegedetail;
