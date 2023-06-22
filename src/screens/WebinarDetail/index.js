import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import { svgs, colors, fonts } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CommonHeader from '../../component/CommonHeader';
const WebinarDetail = props => {
  const isFocused = useIsFocused();
  const paid = props?.route?.params?.paid;
  const [modalVisible, setModalVisible] = useState(false);
  const [delail, setDetail] = useState();
  const [cartData, setCartData] = useState("")
  const [userData, setUserData] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [dates, setDates] = useState(null);
  const [webinarDetailItem, setWebinarDetailItem] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [taxData, setTaxData] = useState("");
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  const date = new Date(delail?.from_date);
  const year = date.toLocaleString('default', { year: 'numeric' });
  const monthh = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const formattedDate = day + '/' + monthh + '/' + year;
  const taxDataitem = parseInt((taxData?.gst / 100) * cartData?.amount)
  const totalAmount = taxDataitem + cartData?.amount


  useEffect(() => {
    HomePagedata();
  }, [isFocused]);

  const HomePagedata = () => {
    const params = {
      id: paid?.id,
    };
    Apis.webinar_detail(params).then(async json => {
      console.log('Detail=====:', json);
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

  const onPressBookNow = () => {
    let form_data = new FormData();
    form_data.append("data_id", paid?.id);
    form_data.append("category_id", paid?.category);
    form_data.append("expert_id", paid?.expert_id);
    form_data.append("amount", paid?.amount);
    form_data.append("sloat_date", paid?.to_date);
    form_data.append("slot_from", paid?.start_time);
    form_data.append("slot_to", paid?.end_time);
    form_data.append("type", "webinar");
    Apis.getCartPostSaveData(form_data).then(async data => {
      if (data.status == true) {
        Toast.show(data?.message, Toast.LONG)
        setIsLoader(true);
        Apis.getCartData({})
          .then(async (json) => {
            if (json.status == true) {
              setCartData(json?.data[0])
              setTaxData(json?.taxData)
            }
            setIsLoader(false);
          }).catch((error) => {
            console.log("error", error);
            setIsLoader(false);
          })
        setWebinarDetailItem(false);
        setOpenCloseCalendar(false)
        setCartOpen(true)
      } else {
        Toast.show(data?.message, Toast.LONG)
      }
    }).catch((err) => { console.log("errrr form_data", err) })
  }


  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);
        setShowdpimage({ path: imageurl + newVal.profile });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const proceedToCkeckout = () => {
    handleInstamozo()
  }

  const handleInstamozo = (id) => {
    setIsLoader(true);
    const params = {
      type: 2,
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
        if (json.status == true) {
          props.navigation.navigate('InstaMojoWebScreen', { instamojoData: json });
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const handleJoinWebinar = async (data) => {
    const params = {
      id: paid.id,
    };
    Apis.webinar_detail(params).then(async json => {
      if (json.status == true) {
        setDetail(json?.data);
        await Linking.openURL(`https://${delail?.web_link}`);
      }
    });


    // props.navigation.navigate('WebViewScreen', {delail});
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        HeaderTitle={webinarDetailItem == true ? "Webinar Detail":
        openCloseCalendar == true ?"Date & Time":
        cartOpen == true ?"Cart":null} 
        navigation={() =>props.navigation.goBack()} />
      <View style={styles.radiusView} />
      {webinarDetailItem && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 20 }}>
            <Image
              source={{ uri: imageurl + delail?.image }}
              style={{ width: '100%', resizeMode: 'contain', height: 300 }}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 15 }}>
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
                    Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OptimaMedium,
                      color: 'gray',
                    }}>
                    {formattedDate}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
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
                    Time
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OptimaMedium,
                      color: 'gray',
                    }}>
                    {delail?.start_time}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginRight: -20, marginLeft: 10 }}>
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
              // <TouchableOpacity style={styles.joinWebinarBtn} onPress={() => { setModalVisible(true) }}>
              //   <Text style={styles.joinWebinarBtnTxt}>Join</Text>
              // </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                // onPress={onSetScreen}
                onPress={onPressBookNow}
              >
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}

      {/* {openCloseCalendar && (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <ScrollView style={{}}>
            <Text style={[styles.haddingTxt, {paddingHorizontal: 20}]}>
              Date & Time
            </Text>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              firstDay={1}
              customDatesStyles={customDatesStylesCallback}
              customDayHeaderStyles={() => {
                return {
                  textStyle: {color: '#FE887E', opacity: 1, fontWeight: 'bold'},
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
            <View style={{marginHorizontal: 1}}>
              <FlatList
                data={timeSlot}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={{alignItems: 'center'}}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedItem1(item.slot_form);
                          setSelectedItem2(item.slot_to);
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
                              selectedItem1 == item.slot_form
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
            style={[styles.joinWebinarBtn, {marginHorizontal: 20}]}
            // onPress={() => setModalVisible(true)}
            // onPress={()=>props.navigation.navigate("Cart")}
            onPress={onPressContinue}>
            <Text style={styles.joinWebinarBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )} */}
      {cartOpen && (
        <View style={styles.mainContainer}>
          <View style={styles.colorContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                <View style={styles.appointmentCard}>
                  <View style={{ flex: 2 }}>
                    <View style={styles.appointmentImage}>
                      <Image source={{ uri: imageurl + cartData?.get_webinar?.image }} style={{ height: 100, resizeMode: "contain" }} />
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
