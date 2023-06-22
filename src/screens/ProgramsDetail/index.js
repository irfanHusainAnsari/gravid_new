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
import styles from './style';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
import RazorpayCheckout from 'react-native-razorpay';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-simple-toast';
import CommonHeader from '../../component/CommonHeader';
import LoaderRow from '../../component/LoaderRow';
const { width, height } = Dimensions.get('window');
const ProgramsDetail = props => {
  const isFocused = useIsFocused();
  const paid = props?.route?.params?.paid;
  const [modalVisible, setModalVisible] = useState(false);
  const [delail, setDetail] = useState();
  const [cartData, setCartData] = useState("")
  const [userData, setUserData] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [dates, setDates] = useState(null);
  const [dateforcartsave, setdateforcartsave] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItem2, setSelectedItem2] = useState("");
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [programDetailItem, setProgramDetailItem] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [taxData, setTaxData] = useState("");
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  const taxDataitem = parseInt((taxData?.gst / 100) * cartData?.amount)
  const totalAmount = taxDataitem + cartData?.amount

  useEffect(() => {
    HomePagedata();
  }, [isFocused]);

  const HomePagedata = () => {
    const params = {
      id: paid?.id,
    };
    Apis.programs_detail(params).then(async json => {
      console.log('programs_detail', json);
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
    // console.log('object');
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      // console.log('jsondata', jsondata);
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

  const onSetScreen = () => {
    setProgramDetailItem(false);
    setOpenCloseCalendar(true);
  };

  const onPressContinue = () => {
    if (selectedItem1 == "") {
      alert("please select a time slot")
    } else {
      let form_data = new FormData();
      form_data.append("data_id", paid?.id);
      form_data.append("category_id", paid?.category);
      form_data.append("expert_id", paid?.expert_id);
      form_data.append("amount", paid?.amount);
      form_data.append("sloat_date", dateforcartsave);
      form_data.append("slot_from", selectedItem1);
      form_data.append("slot_to", selectedItem2);
      form_data.append("type", "program");
      console.log('form_data', form_data)
      Apis.getCartPostSaveData(form_data).then(async data => {
        if (data.status == true) {
          Toast.show(data?.message, Toast.LONG)
          setIsLoader(true);
          Apis.getCartData({})
            .then(async (json) => {
              console.log('json++++', json)
              if (json.status == true) {
                setCartData(json?.data[0])
                setTaxData(json?.taxData)
              }
              setIsLoader(false);
            }).catch((error) => {
              console.log("error", error);
              setIsLoader(false);
            })
          setProgramDetailItem(false);
          setOpenCloseCalendar(false)
          setCartOpen(true)
        } else {
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err) => { console.log("errrr form_data", err); })
    }
  };

  const proceedToCkeckout = () => {
    handleInstamozo()
  }

  const handleInstamozo = (id) => {
    setIsLoader(true);
    const params = {
      type: 4,
      type_id: cartData?.data_id,
      amount: totalAmount,
      purpose: cartData?.category?.title,
      phone: userData?.mobile,
      buyer_name: userData?.name,
      email: userData?.email,
      cart_id: cartData?.id,
      tax_amount: taxDataitem,
      tax_percent: taxData?.gst,
      paid_amount: totalAmount,
    };
    Apis.instaMojoPayment(params)
      .then(async json => {
        console.log('json,,,', json)
        if (json.status == true) {
          props.navigation.navigate('InstaMojoWebScreen', {
            instamojoData: json,
          });
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };


  const handleJoinWebinar = async data => {
    // console.log("newaoiurl" , JSON.stringify(data)?.data?.web_link);
    const params = {
      id: paid.id,
    };
    Apis.programs_detail(params).then(async json => {
      if (json.status == true) {
        setDetail(json?.data);
      }
    });
     await Linking.openURL(`https://${delail?.web_link}`);
    // props.navigation.navigate('WebViewScreen', { delail });
  };

  const onDateChange = date => {
    var date = new Date(date);
    var year = date.toLocaleString('default', { year: 'numeric' });
    var monthh = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });
    var formattedDate = day + '/' + monthh + '/' + year;
    var newFormateDate = year + "-" + monthh + "-" + day
    console.log('objectformattedDate', newFormateDate);
    setdateforcartsave(newFormateDate)
    setDates(formattedDate);
    const params = {
      id: delail?.expert_id,
      date: date,
    };
    console.log('params', params);
    Apis.SendDateWebinar(params).then(async json => {
      console.log('SendDateWebinar', json)
      if (json.status == true) {
        setTimeSlot(json?.data);
      }
    });
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
      <CommonHeader
        HeaderTitle={programDetailItem == true ? "Programs Detail" :
          openCloseCalendar == true ? "Date & Time" :
            cartOpen == true ? "Cart" : null}
        navigation={() => props.navigation.goBack()} />
      <View style={styles.radiusView} />

      {programDetailItem && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 20 }}>
            <Image
              source={{ uri: imageurl + delail?.image }}
              style={{ width: '100%', resizeMode: 'contain', height: 300 }}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10, }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../assets/images/calendar.png')}
                  style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 6 }}
                />
                <View style={{ alignItems: "center", justifyContent: "center" }}>
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

              <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../assets/images/watch.png')}
                  style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 6 }}
                />
                <View style={{ alignItems: "center", justifyContent: "center" }}>
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

              <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../assets/images/card.png')}
                  style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 6 }}
                />

                <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                    ₹ {delail?.amount} /-
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
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onSetScreen}>
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}

      {openCloseCalendar && (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
            <Text style={styles.datetext}>{dates}</Text>
            <View style={{ marginHorizontal: 1 }}>
              <FlatList
                data={timeSlot}
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
                          if (item.id) {
                            setSelectedSlotId(item.id)
                            setSelectedItem1(item.slot_form);
                            setSelectedItem2(item.slot_to);
                          } else {

                          }

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
                              selectedSlotId == item.id
                                ? colors.themeColor
                                : null,
                          }}>
                          {item.slot_form} - {item.slot_to}
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
            // onPress={() => setModalVisible(true)}
            // onPress={()=>props.navigation.navigate("Cart")}
            onPress={onPressContinue}>
            <Text style={styles.joinWebinarBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {cartOpen && (
        <View style={styles.mainContainer}>
          <View style={styles.colorContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                <View style={styles.appointmentCard}>
                  <View style={{ flex: 2 }}>
                    <View style={styles.appointmentImage}>
                      <Image source={{ uri: imageurl + cartData?.get_program?.image }} style={{ height: 100, resizeMode: "contain" }} />
                    </View>
                  </View>
                  <View style={{ flex: 5, marginLeft: 10 }}>
                    <Text style={styles.appointmentText}>Appointment: 1</Text>
                    <Text style={styles.appointmentText}>Appointment info : <Text style={styles.one1Text}>Local Time</Text></Text>
                    <Text style={styles.time}>{cartData?.sloat_date}, {cartData?.slot_form}-{cartData?.slot_to}</Text>
                    <Text style={styles.appointmentText}>Service   <Text style={styles.time}>{cartData?.category?.title}</Text></Text>
                    <Text style={styles.appointmentText}>Consultant: <Text style={styles.time}>{cartData?.get_expert?.name}</Text></Text>
                    <Text style={styles.appointmentText}>Price <Text style={styles.time}>{cartData.amount}/-</Text></Text>
                  </View>
                  {/* <View style={{ flex: 1, }}>
                    <TouchableOpacity style={styles.cancelImageCOntainer}>
                        <Image style={{ width: 15, height: 15 }} source={item.Cancel_Image} />
                    </TouchableOpacity>
                </View> */}
                </View>
                <View style={styles.boderContainer}></View>
              </View>
              <View style={styles.couponContainer}>
                <TextInput style={styles.couponCodeText} placeholder='Coupon Code' />
                <TouchableOpacity style={styles.buttonApply}>
                  <Text style={styles.buttonTitle}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Subtotal</Text>
                <Text style={{ color: colors.themeColor, fontSize: 15, fontFamily: fonts.OptimaBold }}>₹{paid?.amount}</Text>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  borderColor: 'red',
                  marginTop: 10,
                  height: 0.5
                }}></View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Tax</Text>
                <Text style={{ color: colors.themeColor, fontSize: 15, fontFamily: fonts.OptimaBold }}>₹ {taxDataitem}</Text>
              </View>

              <View style={styles.countButton}>
                <Text style={styles.titleText}>Total Amount</Text>
                <Text style={{ color: '#000', fontSize: 15, fontFamily: fonts.OptimaBold }}>
                  ₹ {totalAmount}
                </Text>
              </View>
              <TouchableOpacity style={styles.buttonBookNow} onPress={proceedToCkeckout}>
                <Text style={styles.buttonTitle}>Proceed to checkout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}

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
                <LoaderRow/>
                // <ActivityIndicator />
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

export default ProgramsDetail;