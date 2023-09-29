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
import moment from 'moment';
import Modal from 'react-native-modal';
import {svgs, colors, fonts} from '@common';
import styles from './style';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
import RazorpayCheckout from 'react-native-razorpay';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');
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

  const sloatDat = new Date(delail?.check_payment?.sloat_date); // back date
  const sloatDate = moment(sloatDat).format("YYYY-MM-DD");

  const Hourfrom = delail?.check_payment?.slot_form
  var ff = moment(Hourfrom, 'HHmmss');
  let from  = ff.format('HH:mm:ss')

  const HourTo = delail?.check_payment?.slot_to
  var tt = moment(HourTo, 'HHmmss');
  let to  = tt.format('HH:mm:ss')



  const minDate = new Date(); // Today
  const Currdate = moment(minDate).format("YYYY-MM-DD");
  console.log('object', sloatDate,Currdate)
  const current_time = moment(minDate).format("HH:mm:ss")
  console.log('current_time', current_time)

  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
  const totalAmount = taxDataitem+cartData?.amount

  useEffect(() => {
    HomePagedata();
  }, [isFocused]);

  const HomePagedata = () => {
    const params = {
      id: paid?.id,
    };
    Apis.programs_detail(params).then(async json => {
      console.log('programs_detail',json);
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
        setShowdpimage({path: imageurl + newVal.profile});
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const onSetScreen = () => {
    setProgramDetailItem(false);
    setOpenCloseCalendar(true);
  };

  const onPressContinue =async (type) => {
    console.log('type', type)
    if(selectedItem1 == ""){
      alert("please select a time slot")
    }else if(type == "Free"){
      let form_data = new FormData();
      form_data.append("data_id",paid?.id);
      form_data.append("category_id", paid?.category);
      form_data.append("expert_id",paid?.expert_id);
      form_data.append("amount",0);
      form_data.append("sloat_date", dateforcartsave);
      form_data.append("slot_from", selectedItem1);
      form_data.append("slot_to", selectedItem2);
      form_data.append("type", "program");
      console.log('form_data', form_data)
      Apis.getDirect_order(form_data).then(async data => {
        console.log('getDirect_order', data) 
        setIsLoader(true);
        if(data.status == true){
          Toast.show(data.message, Toast.LONG)
          if(delail.web_link == null){
            Toast.show("Web link is not available", Toast.LONG)
          }else{
            props.navigation.goBack()
            // await Linking.openURL(`${delail.web_link}`);
          }
         
          setIsLoader(false);
        }else{
          setIsLoader(false);
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err)})
    }
    else{
      let form_data = new FormData();
      form_data.append("data_id",paid?.id);
      form_data.append("category_id", paid?.category);
      form_data.append("expert_id",paid?.expert_id);
      form_data.append("amount", paid?.amount);
      form_data.append("sloat_date", dateforcartsave);
      form_data.append("slot_from", selectedItem1);
      form_data.append("slot_to", selectedItem2);
      form_data.append("type", "program");
      console.log('form_data', form_data)
      Apis.getCartPostSaveData(form_data).then(async data => {
        if(data.status == true){
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
          setOpenCloseCalendar(false)
          setProgramDetailItem(true);
          props.navigation.navigate("Cart")
          // setCartOpen(true)
        }else{
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err);})
    }
  };

  const proceedToCkeckout =()=>{
    handleInstamozo();
  }

  const handleInstamozo = (id) => {
    setIsLoader(true);
    const params = {
      purpose: "Gravid Payment",
      phone: userData?.mobile,
      buyer_name: userData?.name,
      email: userData?.email,
      cart_id: JSON.stringify(cartData?.id),
      paid_amount: totalAmount,
      amount:cartData.amount,
      cartData:[{id:cartData?.id,
                 tax_amount:taxDataitem,
                 tax_percent:taxData?.gst,
                 paid_amount:Math.trunc(cartData?.amount*taxData?.gst/100+cartData?.amount)}]
    };
    console.log('params', params)
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
    const params = {
      id: paid.id,
    };
    Apis.programs_detail(params).then(async json => {
      if (json.status == true) {
        setDetail(json?.data);
      }
    });
    // if(delail){
    //   let form_data = new FormData();
    //   form_data.append("data_id",delail?.id);
    //   form_data.append("category_id", delail?.category);
    //   form_data.append("expert_id",delail?.expert_id);
    //   form_data.append("amount", 0);
    //   // form_data.append("sloat_date",delail?.to_date);
    //   // form_data.append("slot_from", delail?.start_time);
    //   // form_data.append("slot_to", delail?.end_time);
    //   form_data.append("sloat_date", dateforcartsave);
    //   form_data.append("slot_from", selectedItem1);
    //   form_data.append("slot_to", selectedItem2);
    //   form_data.append("type", "program");
    //   console.log('ooooooo>>>>>>', form_data)
    //   Apis.getDirect_order(form_data).then(async data => {
    //     console.log('getDirect_order>>>>>>>>>', data) 
    //     setIsLoader(true);
    //     if(data.status == true){
    //       Toast.show(data.message, Toast.LONG)
    //       await Linking.openURL(`${delail.web_link}`);
    //       setIsLoader(false);
    //     }else{
    //       setIsLoader(false);
    //       Toast.show(data?.message, Toast.LONG)
    //     }
    //   }).catch((err)=>{console.log("errrr form_data" , err)})

    // }
   
    await Linking.openURL(`https://${delail?.web_link}`);
    // props.navigation.navigate('WebViewScreen', {delail});
  };

  const onDateChange = date => {
    var date = new Date(date);
    var year = date.toLocaleString('default', {year: 'numeric'});
    var monthh = date.toLocaleString('default', {month: '2-digit'});
    var day = date.toLocaleString('default', {day: '2-digit'});
    var formattedDate = day + '/' + monthh + '/' + year;
    var newFormateDate = year+"-" + monthh +"-"+day
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
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        {programDetailItem == true ? (
          <Text style={styles.haddingTxt}>Programs Detail</Text>
        ) : openCloseCalendar == true ? (
          <Text style={styles.haddingTxt}>Date & Time</Text>
        ) : cartOpen == true ? (
          <Text style={styles.haddingTxt}>Cart</Text>
        ) : null}
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />

      {programDetailItem && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20}}>
            <Image
              source={{uri: imageurl + delail?.image}}
              style={{width: '100%', resizeMode: 'contain', height: 300}}
            />

           

          
            <View style={{flex:1,flexDirection: 'row', marginVertical: 10}}>
              <View style={{flex:.24, flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
                <Image
                  source={require('../../assets/images/calendar.png')}
                  style={{width:25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                  <Text
                    style={{
                      fontSize: 10,
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

              <View style={{flex:.23, flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
                <Image
                  source={require('../../assets/images/watch.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                  <Text
                    style={{
                      fontSize: 10,
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

              <View style={{flex:.32, flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
                <Image
                  source={require('../../assets/images/watch.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OptimaMedium,
                      color: '#000',
                    }}>
                    Sessions duration
                  </Text>
                 
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OptimaMedium,
                      color: 'gray',
                    }}>
                   {delail?.sessions_duraton_time}
                  </Text>
                </View>
              </View>

              <View style={{flex:.2, flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
                <Image
                  source={require('../../assets/images/card.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />

                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.OptimaMedium,
                      color: '#000',
                    }}>
                       Price
                  </Text>
                  {console.log('delail?.amount', delail?.amount)}
                  {delail?.amount == null ? 
                   <Text
                   style={{
                     fontSize: 10,
                     fontFamily: fonts.OptimaMedium,
                     color: 'gray',
                   }}>
                   Free
                 </Text>
                 :
                 <Text
                 style={{
                   fontSize: 10,
                   fontFamily: fonts.OptimaMedium,
                   color: 'gray',
                 }}>₹{delail?.amount}
               </Text>
                  }
                </View>
                
              </View>
            </View>


            <Text style={styles.webinarTitle}>{delail?.title}</Text>
            {/* <Text style={styles.webinarDes}>{delail?.register_By}</Text> */}
            <RenderHtml
              contentWidth={width}
              source={{html: delail?.description}}
            />


            {
              delail?.check_payment?.id && sloatDate > Currdate ? 
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                >
                <Text style={styles.joinWebinarBtnTxt}>Get Link</Text>
              </TouchableOpacity>
              : 
              sloatDate == Currdate ?

              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={(delail)=>handleJoinWebinar(delail)}
                >
                <Text style={styles.joinWebinarBtnTxt}>Join</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              style={styles.joinWebinarBtn}
              onPress={onSetScreen}>
              <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>

            }
            {/* {delail?.check_payment?.id || delail?.payment_type == 'Free' ? (
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
            )} */}

              {/* <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onSetScreen}>
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity> */}
              {/* { delail?.check_payment?.id ? 
                
                minDate > sloatDate ? 

                <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onSetScreen}
                >
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.joinWebinarBtn}
                  onPress={() => Linking.openURL(`${delail?.web_link}`)}
                  >
                  <Text style={styles.joinWebinarBtnTxt}>Join Link</Text>
                </TouchableOpacity>
                :
                  delail?.payment_type == 'Free' ?
                  <TouchableOpacity
                    style={styles.joinWebinarBtn}
                    onPress={onSetScreen}
                    >
                    <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                  </TouchableOpacity> 
                :
                    delail?.payment_type == 'Paid' ?
                    <TouchableOpacity
                      style={styles.joinWebinarBtn}
                      onPress={onSetScreen}
                      >
                      <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                    </TouchableOpacity> 
                    :null
          } */}

      { delail?.check_payment?.id && delail?.community_banner != null &&
          <TouchableOpacity
          style={{marginVertical:20}}
          onPress={()=>Linking.openURL(`${delail?.community_link}`)}
          >
          <Image style={{width:"100%",height:170,resizeMode:"cover",borderRadius:20}} source={{uri:imageurl+delail?.community_banner}}/>
        </TouchableOpacity>
          }
          </View>
        </ScrollView>
      )}

      {openCloseCalendar && (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <ScrollView style={{}}>
            <Text style={[styles.haddingTxt, {paddingHorizontal: 20}]}>
              Date & Time
            </Text>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              firstDay={1}
              previousTitle="Previous"
              nextTitle="Next"
              previousTitleStyle={{marginLeft:13,color:"#000000"}}
              nextTitleStyle={{marginRight:13,color:"#000000"}}
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
                  console.log('item', item)
                  let slotFrom = item.slot_form;
                  let newSlotFrom = slotFrom.slice(0,5)
                  let slotTo = item.slot_to;
                  let newSlotTo = slotTo.slice(0,5)
                  return (
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if(item.id){
                            setSelectedSlotId(item.id)
                            setSelectedItem1(item.slot_form);
                            setSelectedItem2(item.slot_to);
                          }else{

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
            style={[styles.joinWebinarBtn, {marginHorizontal: 20}]}
            // onPress={() => setModalVisible(true)}
            // onPress={()=>props.navigation.navigate("Cart")}
            onPress={()=>onPressContinue(delail?.payment_type)}>
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
                        <Image source={{uri:imageurl+cartData?.get_program?.image}} style={{height:100,resizeMode:"contain"}}/>
                    </View>
                </View>
                <View style={{ flex: 5, marginLeft: 10}}>
                    <Text style={styles.appointmentText}>Appointment: 1</Text>
                    <Text style={styles.appointmentText}>Appointment info : <Text style={styles.one1Text}>Date & Time :</Text></Text>
                    <Text style={styles.time}>{dates}, {cartData?.slot_form}-{cartData?.slot_to}</Text>
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
                <TextInput style={styles.couponCodeText} placeholder='Coupon Code' placeholderTextColor={"#000"}/>
                <TouchableOpacity style={styles.buttonApply}>
                  <Text style={styles.buttonTitles}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Subtotal</Text>
                <Text style={{color:colors.themeColor, fontSize: 15,fontFamily:fonts.OptimaBold}}>₹{paid?.amount}</Text>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  borderColor: 'red',
                  marginTop: 10,
                  height:0.5
                }}></View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Tax(GST 18%)</Text>
                <Text style={{color:colors.themeColor, fontSize: 15,fontFamily:fonts.OptimaBold}}>₹ {taxDataitem}</Text>
              </View>

              <View style={styles.countButton}>
                <Text style={styles.titleText}>Total Amount</Text>
                <Text style={{color: '#000',fontSize: 15,fontFamily:fonts.OptimaBold}}>
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
                style={{height: 104, width: 104}}
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

export default ProgramsDetail;