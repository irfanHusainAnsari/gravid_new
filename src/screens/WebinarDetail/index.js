import React, {useEffect, useState} from 'react';
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
import {svgs, colors, fonts} from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import RenderHtml from 'react-native-render-html';
const {width, height} = Dimensions.get('window');
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
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
  const [webTime, setWebTime] = useState("");
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  const date = new Date(delail?.from_date);
  const year = date.toLocaleString('default', {year: 'numeric'});
  const monthh = date.toLocaleString('default', {month: '2-digit'});
  const day = date.toLocaleString('default', {day: '2-digit'});
  const formattedDate = day + '/' + monthh + '/' + year;
  const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
  const totalAmount = taxDataitem+cartData?.amount
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
        let webTime = json?.data?.start_time;
        let webinarStartTime = webTime.slice(0,5)
        setWebTime(webinarStartTime)
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused]);

  const onPressBookNow =()=>{
    let form_data = new FormData();
      form_data.append("data_id",paid?.id);
      form_data.append("category_id", paid?.category);
      form_data.append("expert_id",paid?.expert_id);
      form_data.append("amount", paid?.amount);
      form_data.append("sloat_date",paid?.to_date);
      form_data.append("slot_from", paid?.start_time);
      form_data.append("slot_to", paid?.end_time);
      form_data.append("type", "webinar");
      Apis.getCartPostSaveData(form_data).then(async data => {
        if(data.status == true){
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
          setOpenCloseCalendar(false);
          setWebinarDetailItem(true);
          props.navigation.navigate("Cart")
          // setCartOpen(true)
        }else{
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err)})
  }
  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);
        setShowdpimage({path: imageurl + newVal.profile});
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const proceedToCkeckout =()=>{
    handleInstamozo()
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
                 tax_amount:cartData?.amount,
                 tax_percent:taxData?.gst,
                 paid_amount:Math.trunc(cartData?.amount*taxData?.gst/100+cartData?.amount)}]
    };
    console.log('paramshandleInstamozo', params)
    Apis.instaMojoPayment(params)
      .then(async json => {
        if (json.status == true) {
            props.navigation.navigate('InstaMojoWebScreen', {instamojoData: json});
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const onPressBookNowFree =()=> {
    const params = {
      id: paid.id,
    };
    Apis.webinar_detail(params).then(async json => {
      if (json.status == true) {
        setDetail(json?.data);
      }
    });
    if(delail){
      let form_data = new FormData();
      form_data.append("data_id",delail?.id);
      form_data.append("category_id", delail?.category);
      form_data.append("expert_id",delail?.expert_id);
      form_data.append("amount", 0);
      form_data.append("sloat_date",delail?.to_date);
      form_data.append("slot_from", delail?.start_time);
      form_data.append("slot_to", delail?.end_time);
      form_data.append("type", "webinar");
      Apis.getDirect_order(form_data).then(async data => {
        setIsLoader(true);
        if(data.status == true){
          Toast.show(data.message, Toast.LONG)
          if(delail.web_link == null){
            Toast.show("Web link is not available", Toast.LONG)
          }else{
            props.navigation.goBack()
            Toast.show("Web link is available", Toast.LONG)
          }
          // await Linking.openURL(`${delail.web_link}`);
          setIsLoader(false);
        }else{
          setIsLoader(false);
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err)})

    }
  }

  const handleJoinWebinar = async data => {
    const params = {
      id: paid.id,
    };
    Apis.webinar_detail(params).then(async json => {
      if (json.status == true) {
        setDetail(json?.data);
      }
    });
    if(delail){
      let form_data = new FormData();
      form_data.append("data_id",delail?.id);
      form_data.append("category_id", delail?.category);
      form_data.append("expert_id",delail?.expert_id);
      form_data.append("amount", 0);
      form_data.append("sloat_date",delail?.to_date);
      form_data.append("slot_from", delail?.start_time);
      form_data.append("slot_to", delail?.end_time);
      form_data.append("type", "webinar");
      Apis.getDirect_order(form_data).then(async data => {
        setIsLoader(true);
        if(data.status == true){
          Toast.show(data.message, Toast.LONG)
          if(delail.web_link == null){
            Toast.show("Web link is not available", Toast.LONG)
          }
          await Linking.openURL(`${delail.web_link}`);
          setIsLoader(false);
        }else{
          setIsLoader(false);
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err)})

    }
   
    // await Linking.openURL(`${delail.web_link}`);
    // props.navigation.navigate('WebViewScreen', {delail});
  };

  const removeCart = () => {
    setIsLoader(true);
    const params = {
      id: cartData.id,
    };
    Apis.RemoveCart(params)
      .then(async json => {
        console.log('RemoveCart00', json);
        if (json.status == true) {
          Toast.show(json.message, Toast.LONG);
          setCartData("");
          getCart();
         
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
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
        {/* <Text style={styles.haddingTxt}>Webinar Detail</Text> */}
        {webinarDetailItem == true ? (
          <Text style={styles.haddingTxt}>Webinar Detail</Text>
        ) : openCloseCalendar == true ? (
          <Text style={styles.haddingTxt}>Date & Time</Text>
        ) : cartOpen == true ? (
          <Text style={styles.haddingTxt}>Cart</Text>
        ) : null}
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
       
      </View>

      <View style={styles.radiusView}/>
      {webinarDetailItem && (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20}}>
            <Image
              source={{uri: imageurl + delail?.image}}
              style={{width: '100%', resizeMode: 'contain', height: 300}}
            />
            <View style={{flex: 1,flexDirection: 'row', marginVertical: 10}}>
                <View style={{flex: 1, flexDirection: 'row',marginHorizontal:15}}>
                  <Image
                  source={require('../../assets/images/calendar.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{flex: 1, paddingHorizontal: 5}}>
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

              <View style={{flex: 1, flexDirection: 'row',marginLeft:10}}>
                <Image
                  source={require('../../assets/images/watch.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{flex: 1, paddingHorizontal: 5}}>
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
                { webTime}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row',marginRight:-20,marginLeft:10}}>
                <Image
                  source={require('../../assets/images/card.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
                <View style={{flex: 1, paddingHorizontal: 5}}>
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
            <RenderHtml
              contentWidth={width}
              source={{html: delail?.description}}
            />
            {/* {delail?.check_payment?.id || delail?.payment_type == 'Free' ? (
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={delail => handleJoinWebinar(delail)}>
                <Text style={styles.joinWebinarBtnTxt}>Join Link</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onPressBookNow}
                >
                <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            )} */}

            { delail?.check_payment?.id ? 
                <TouchableOpacity
                  style={styles.joinWebinarBtn}
                  onPress={() => Linking.openURL(`${delail?.web_link}`) }
                  >
                  <Text style={styles.joinWebinarBtnTxt}>Join Link</Text>
                </TouchableOpacity>
                :
                  delail?.payment_type == 'Free' ?
                  <TouchableOpacity
                    style={styles.joinWebinarBtn}
                    onPress={onPressBookNowFree}
                    >
                    <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                  </TouchableOpacity> 
                :
                    delail?.payment_type == 'Paid' ?
                    <TouchableOpacity
                      style={styles.joinWebinarBtn}
                      onPress={onPressBookNow}
                      >
                      <Text style={styles.joinWebinarBtnTxt}>Book Now</Text>
                    </TouchableOpacity> 
                    :null
          }

          { delail?.check_payment?.id && delail?.community_banner != null &&
          <TouchableOpacity
          style={{}}
          onPress={()=>Linking.openURL(`${delail?.community_link}`)}
          >
          <Image style={{width:"100%",height:170,resizeMode:"cover",borderRadius:20}} source={{uri:imageurl+delail?.community_banner}}/>
        </TouchableOpacity>
          }
          </View>
        </ScrollView>
      )}

      {cartOpen && (
        cartData ?
        <View style={styles.mainContainer}>
          <View style={styles.colorContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{}}>
            <View style={styles.appointmentCard}>
                <View style={{ flex: 2 }}>
                    <View style={styles.appointmentImage}>
                        <Image source={{uri:imageurl+cartData?.get_webinar?.image}} style={{height:100,resizeMode:"contain"}}/>
                    </View>
                </View>
                <View style={{ flex: 5, marginLeft: 10}}>
                <Text style={styles.appointmentText}>
              {cartData.type == 'webinar' ? cartData.type : "dummy"}: <Text style={styles.one1Text}>{cartData.type == 'webinar' ? cartData.get_webinar.title : "dummy"}</Text>
            </Text>
                    <Text style={styles.appointmentText}>Service   <Text style={styles.time}>{cartData?.category?.title}</Text></Text>
                    
                    <Text style={styles.appointmentText}>Price <Text style={styles.time}>{cartData.amount}/-</Text></Text>
                </View>
                <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.cancelImageCOntainer}
              onPress={() => removeCart()}>
              <Image
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
                source={require('../../assets/images/deleteIcon.png')}
              />
            </TouchableOpacity>
          </View>
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
                <Text style={styles.subtotalTitleText}>Tax (GST 18%)</Text>
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
        :
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          <Text style={{fontFamily:fonts.OptimaBold,fontSize:18,color:"#000"}}>There is no item in cart</Text>
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

export default WebinarDetail;
