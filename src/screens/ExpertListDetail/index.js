import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import { svgs, colors, fonts } from '@common';
import Apis from '../../Services/apis';
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('window');
import { imageurl } from '../../Services/constants';
import { useIsFocused } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const ExpertListDetail = props => {
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  // const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
  // const totalAmount = taxDataitem+cartData?.amount
  const isFocused = useIsFocused();
  const expertDetail = props?.route?.params?.item;
  const [detail, setDetail] = useState('');
  console.log('detail?.check_payment?.sloat_date', detail)
  const [expert, setExpert] = useState(true);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [dates, setDates] = useState(null);
  const [dateforcartsave, setdateforcartsave] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [taxData, setTaxData] = useState('');
  const [cartData, setCartData] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [showdpimage, setShowdpimage] = useState({});
  const [userData, setUserData] = useState({});
  const taxDataitem = parseInt((taxData?.gst / 100) * cartData?.amount);
  const totalAmount = taxDataitem + cartData?.amount;

  const sloatDat = new Date(detail?.check_payment?.sloat_date); // back date
  const sloatDate = moment(sloatDat).format("YYYY-MM-DD");

  const Hourfrom = detail?.check_payment?.slot_form
  var ff = moment(Hourfrom, 'HHmmss');
  let from = ff.format('HH:mm:ss')

  const HourTo = detail?.check_payment?.slot_to
  var tt = moment(HourTo, 'HHmmss');
  let to = tt.format('HH:mm:ss')



  const minuDate = new Date(); // Today
  const Currdate = moment(minuDate).format("YYYY-MM-DD");
  console.log('object', sloatDate, Currdate)
  const current_time = moment(minDate).format("HH:mm:ss")
  console.log('current_time', current_time)

  const dateForJoinAndBookNow = detail?.check_payment?.sloat_date
  let dateForButton = new Date(dateForJoinAndBookNow);
  const today = new Date()

  var diff = dateForButton - today

  console.log('dateForButton', dateForButton)
  console.log('today', today)
  console.log('diff', diff)
  useEffect(() => {
    ExpertListDetailData();
    setUserProfileData();
  }, [isFocused]);

  const setUserProfileData = async () => {
    // console.log('object');
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      // console.log('jsondata', jsondata);
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);
        // console.log('imageurl + newVal.profile', imageurl + newVal.profile);
        setShowdpimage({ path: imageurl + newVal.profile });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const ExpertListDetailData = () => {
    const params = {
      id: expertDetail?.id,
    };
    setIsLoader(true);
    Apis.expert_detail(params)
      .then(async json => {
        if (json.status == true) {
          setIsLoader(false);
          setDetail(json.data);
        } else {
          setIsLoader(false);
        }
      })
      .catch(err => {
        console.log('errrr form_data', err);
        setIsLoader(false);
      });
  };

  const onPressBookNow = () => {
    setExpert(false);
    setOpenCloseCalendar(true);
  };
  const onDateChange = date => {
    var date = new Date(date);
    var year = date.toLocaleString('default', { year: 'numeric' });
    var monthh = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });
    var formattedDate = day + '/' + monthh + '/' + year;
    var newFormateDate = year + '-' + monthh + '-' + day;
    // console.log('objectformattedDate', newFormateDate);
    setdateforcartsave(newFormateDate);
    setDates(formattedDate);

    const params = {
      id: detail?.id,
      date: date,
    };
    // console.log('params', params);
    Apis.SendDateWebinar(params).then(async json => {
      // console.log('SendDateWebinar', json)
      if (json.status == true) {
        setTimeSlot(json?.data);
      }
    });
  };

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
  const proceedToCkeckout = () => {
    setIsLoader(true);
    const params = {
      type: 5,
      type_id: cartData?.data_id,
      amount: cartData.amount,
      purpose: cartData?.get_expert?.name,
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
        // console.log('instaMojoPayment', json)
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

  const onPressContinue = () => {
    // console.log('selectedItem1', selectedItem1)
    if (selectedItem1 == '') {
      alert('please select a time slot');
    } else {
      let form_data = new FormData();
      form_data.append('data_id', detail?.id);
      form_data.append('expert_id', detail?.id);
      form_data.append('amount', detail?.amount);
      form_data.append('sloat_date', dateforcartsave);
      form_data.append('slot_from', selectedItem1);
      form_data.append('slot_to', selectedItem2);
      form_data.append('type', 'expert');
      // console.log('form_data', form_data)
      Apis.getCartPostSaveData(form_data)
        .then(async data => {
          // console.log('data', data)
          if (data.status == true) {
            // console.log('object', data)
            Toast.show(data?.message, Toast.LONG);
            setIsLoader(true);
            Apis.getCartData({})
              .then(async json => {
                // console.log('json++++123', json)
                if (json.status == true) {
                  setCartData(json?.data[0]);
                  setTaxData(json?.taxData);
                  setOpenCloseCalendar(true);
                  props.navigation.navigate('Cart');
                  // setCartOpen(true)
                }
                setIsLoader(false);
              })
              .catch(error => {
                console.log('error', error);
                setIsLoader(false);
              });
            setProgramDetailItem(true);
            setOpenCloseCalendar(false);
            props.navigation.navigate('Cart');
            // setCartOpen(true)
          } else {
            Toast.show(data?.message, Toast.LONG);
          }
        })
        .catch(err => {
          console.log('errrr form_data', err);
        });
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
        {expert == true ? (
          <Text style={styles.haddingTxt}>Expert</Text>
        ) : openCloseCalendar == true ? (
          <Text style={styles.haddingTxt}>Date & Time</Text>
        ) : cartOpen == true ? (
          <Text style={styles.haddingTxt}>Cart</Text>
        ) : null}
        <View style={{ flex: 3 }} />
      </View>
      <View style={styles.radiusView} />

      {expert && (
        <View style={{ flex: 1 }}>
          {isLoader == true ? (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ScrollView
              style={{ paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{ position: 'absolute', right: 10, top: 190, zIndex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => console.log('object')}>
                    <Image
                      source={require('../../assets/images/call.png')}
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                  <View style={{ width: 10 }} />

                  <TouchableOpacity style={{}}>
                    <Image
                      source={require('../../assets/images/videoCall.png')}
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                style={styles.ScreenshotImage}
                source={{ uri: imageurl + detail.file }}
              />

              <Text style={styles.contributorText}>{detail.name}</Text>
              <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700' }}>Consultation charge : </Text>
                <Text style={{ fontSize: 16 }}>₹ {detail.amount}/-</Text>
              </View>

              <RenderHtml
                contentWidth={width}
                source={{ html: detail.description }}
              />
              {detail?.check_payment?.id ? null : (
                <View style={{ paddingBottom: 100 }}>
                  <FlatList
                    data={detail?.expert_slots}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      // console.log('item', item)
                      let slotFrom = item.slot_form;
                      let newSlotFrom = slotFrom.slice(0, 5);
                      let slotTo = item.slot_to;
                      let newSlotTo = slotTo.slice(0, 5);
                      return (
                        <View style={{ paddingBottom: 10, flexDirection: 'row' }}>
                          <Text style={{ fontFamily: fonts.OptimaBold }}>
                            {item.WeekDay}:
                          </Text>
                          <Text style={{ fontFamily: fonts.OptimaMedium }}>
                            {' '}
                            {newSlotFrom} - {newSlotTo}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </ScrollView>
          )}
<View style={{paddingHorizontal:20}}>
          {
            detail?.check_payment?.id && sloatDate > Currdate ?
              <TouchableOpacity
                style={styles.joinWebinarBtn}
              >
                <Text style={styles.joinWebinarBtnTxt}>Join</Text>
              </TouchableOpacity>
              :
              sloatDate == Currdate ?

                <TouchableOpacity
                  style={styles.joinWebinarBtn}
                  onPress={() => Linking.openURL(`${detail?.web_link}`)}
                >
                  <Text style={styles.joinWebinarBtnTxt}>join</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.joinWebinarBtn}
                  onPress={onPressBookNow}>
                  <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                </TouchableOpacity>

          }


          {diff > 0 ?
            <>
              <View style={{ paddingBottom: 10, flexDirection: 'row' }}>
                <Text style={{ fontFamily: fonts.OptimaBold }}>
                  Appointment Date:{' '}
                </Text>
                <Text style={{ fontFamily: fonts.OptimaMedium }}>
                  {detail.check_payment.sloat_date}
                </Text>
              </View>



              <View style={{ paddingBottom: 10, flexDirection: 'row' }}>
                <Text style={{ fontFamily: fonts.OptimaBold }}>
                  Appointment Time:{' '}
                </Text>
                <Text style={{ fontFamily: fonts.OptimaMedium }}>
                  {detail.check_payment.slot_form} -{' '}
                  {detail.check_payment.slot_to}
                </Text>
              </View>
            </>
            :
            null
          }

</View>

          {/* 
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              paddingHorizontal: 20,
            }}>
            {detail?.check_payment?.id ? (
              <>
                {diff < 0 ?
                  <TouchableOpacity
                    style={styles.bookNowBtn}
                    onPress={onPressBookNow}
                  >
                    <Text style={styles.bookNowBtnTxt}>Book Now</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={styles.bookNowBtn}
                    onPress={() => Linking.openURL(`${detail?.web_link}`)}
                  >
                    <Text style={styles.bookNowBtnTxt}>Join</Text>
                  </TouchableOpacity>
                }


                {diff > 0 ?
<>
                  <View style={{paddingBottom: 10, flexDirection: 'row'}}>
                  <Text style={{fontFamily: fonts.OptimaBold}}>
                    Appointment Date:{' '}
                  </Text>
                  <Text style={{fontFamily: fonts.OptimaMedium}}>
                    {detail.check_payment.sloat_date}
                  </Text>
                  </View>



                  <View style={{paddingBottom: 10, flexDirection: 'row'}}>
                  <Text style={{fontFamily: fonts.OptimaBold}}>
                    Appointment Time:{' '}
                  </Text>
                  <Text style={{fontFamily: fonts.OptimaMedium}}>
                    {detail.check_payment.slot_form} -{' '}
                    {detail.check_payment.slot_to}
                  </Text>
                </View>
</>
                  :
                  null
                }


              </>
            ) : (
              <TouchableOpacity
                style={styles.bookNowBtn}
                onPress={onPressBookNow}>
                <Text style={styles.bookNowBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View> */}

        </View>
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
              previousTitle="Previous"
              nextTitle="Next"
              previousTitleStyle={{ marginLeft: 13, color: "#000000" }}
              nextTitleStyle={{ marginRight: 13, color: "#000000" }}
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
                  let slotFrom = item.slot_form;
                  let newSlotFrom = slotFrom.slice(0, 5);
                  let slotTo = item.slot_to;
                  let newSlotTo = slotTo.slice(0, 5);
                  return (
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.id) {
                            setSelectedSlotId(item.id);
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
                          {newSlotFrom} - {newSlotTo}
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
                      <Image
                        source={{ uri: imageurl + cartData?.get_program?.image }}
                        style={{ height: 100, resizeMode: 'contain' }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 5, marginLeft: 10 }}>
                    <Text style={styles.appointmentText}>Appointment: 1</Text>
                    <Text style={styles.appointmentText}>
                      Appointment info :{' '}
                      <Text style={styles.one1Text}>Date & Time :</Text>
                    </Text>
                    <Text style={styles.time}>
                      {dates}, {cartData?.slot_form}-{cartData?.slot_to}
                    </Text>
                    <Text style={styles.appointmentText}>
                      Service{' '}
                      <Text style={styles.time}>
                        {cartData?.category?.title}
                      </Text>
                    </Text>
                    <Text style={styles.appointmentText}>
                      Consultant:{' '}
                      <Text style={styles.time}>
                        {cartData?.get_expert?.name}
                      </Text>
                    </Text>
                    <Text style={styles.appointmentText}>
                      Price <Text style={styles.time}>{cartData.amount}/-</Text>
                    </Text>
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
                <TextInput
                  style={styles.couponCodeText}
                  placeholder="Coupon Code"
                  placeholderTextColor={'#000'}
                />
                <TouchableOpacity style={styles.buttonApply}>
                  <Text style={styles.buttonTitles}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Subtotal</Text>
                <Text
                  style={{
                    color: colors.themeColor,
                    fontSize: 15,
                    fontFamily: fonts.OptimaBold,
                  }}>
                  ₹{cartData?.amount}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  borderColor: 'red',
                  marginTop: 10,
                  height: 0.5,
                }}></View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Tax(GST 18%)</Text>
                <Text
                  style={{
                    color: colors.themeColor,
                    fontSize: 15,
                    fontFamily: fonts.OptimaBold,
                  }}>
                  ₹ {taxDataitem}
                </Text>
              </View>

              <View style={styles.countButton}>
                <Text style={styles.titleText}>Total Amount</Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontFamily: fonts.OptimaBold,
                  }}>
                  ₹ {totalAmount}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonBookNow}
                onPress={proceedToCkeckout}>
                <Text style={styles.buttonTitle}>Proceed to checkout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExpertListDetail;
