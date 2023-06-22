import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { styles } from './style';
import Apis from '../../Services/apis';
import { useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import { fonts, colors } from '../../common';
import { imageurl } from '../../Services/constants';
// import { appointmentCardData } from '../../Common/FlatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

const Cart = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [taxData, setTaxData] = useState('');
  const [userData, setUserData] = useState({});
  const [cartDetail, setCartDetail] = useState();
  console.log('cartDetail////', cartDetail);

  var date = new Date(cartData?.sloat_date);
  var year = date.toLocaleString('default', { year: 'numeric' });
  var monthh = date.toLocaleString('default', { month: '2-digit' });
  var day = date.toLocaleString('default', { day: '2-digit' });
  var formattedDate = day + '/' + monthh + '/' + year;
  var newFormateDate = year + '-' + monthh + '-' + day;
  let myArray = [];
  let cartId = []
  if (cartData.length > 0) {
    cartData.forEach(function (arrayItem) {
      myArray.push(arrayItem.amount);
      cartId.push(arrayItem.id);
    });
  }
  // console.log('cartId////////>>>>', cartId.join(","))
  // console.log('ooooooo',JSON.stringify(cartId.join(",")))
  const subTotal = myArray.reduce(add, 0); // with initial value to avoid when the array is empty
  function add(accumulator, a) {
    return accumulator + a;
  }
  const taxDataitem = parseInt((taxData?.gst / 100) * subTotal);
  const totalAmount = taxDataitem + subTotal;


  //


  //  console.log('cart_detail1', cart_detail1)

  useEffect(() => {
    getCart();
    setUserProfileData();

  }, []);


  useEffect(() => {
    let taxCal = taxData?.gst

    let abc = []
    for (let i = 0; i < cartData?.length; i++) {

      abc.push({
        id: cartData[i].id,
        tax_amount: cartData[i].amount,
        tax_percent: taxCal,
        paid_amount: Math.trunc((cartData[i].amount) + (taxCal / 100) * (cartData[i].amount))
      })

    }
    setCartDetail(abc)
    // console.log("absd" , abc);
  }, [cartData, taxData])

  // useEffect(async()=>{
  //   console.log('cartData', cartData)

  //   let cart_detail = await cartData?.map(({ id,amount}) => ({ id,amount}));

  //   console.log('cart_detailsssss', cart_detail)
  //   let cart_detail1 = await cart_detail?.map(v =>({...v, tax_amount:v.amount, tax_percent:taxData?.gst,paid_amount:Math.trunc( (v.amount)+(taxData?.gst/100)*v.amount )}))
  //   console.log('cart_detailsssss111', cart_detail1)
  //   setCartDetail(cart_detail1)
  // },[cartData])

  const setUserProfileData = async () => {
    // console.log('object');
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
  console.log('cartData>>>>..', cartData);
  const getCart = () => {
    setIsLoader(true);
    Apis.getCartData({})
      .then(async json => {
        console.log('getCartData0', json);
        if (json.status == true) {
          setCartData(json?.data);
          setTaxData(json?.taxData);
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  if (isLoader) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const removeCart = id => {
    setIsLoader(true);
    const params = {
      id: id,
    };
    Apis.RemoveCart(params)
      .then(async json => {
        console.log('RemoveCart00', json);
        if (json.status == true) {
          Toast.show(json.message, Toast.LONG);
          setCartData([]);
          getCart();
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const handleInstamozo = () => {
    // setIsLoader(true);
    if (cartDetail) {
      const params = {
        purpose: "Gravid Payment",
        phone: userData?.mobile,
        buyer_name: userData?.name,
        email: userData?.email,
        cart_id: cartId.join(","),
        paid_amount: totalAmount,
        amount: totalAmount,
        cartData: cartDetail && cartDetail
        // type: 2,
        // type_id: cartData?.data_id,
        // amount: totalAmount,
        // purpose: cartData?.category?.title,
        // phone: userData?.mobile,
        // buyer_name: userData?.name,
        // email: userData?.email,
        // cart_id: cartData?.id,
        // tax_amount: taxDataitem,
        // tax_percent: taxData?.gst,
        // paid_amount: totalAmount,
      };

      Apis.instaMojoPayment(params)
        .then(async json => {
          console.log('json,,,', json);
          if (json.status == true) {
            props.navigation.navigate('InstaMojoWebScreen', {
              instamojoData: json,
            });
          }
          console.log('params', params);
          setIsLoader(false);
        })
        .catch(error => {
          console.log('error', error);
          setIsLoader(false);
        });
    }
  };

  const renderDataItem = ({ item }) => {
    console.log('item>>>>', item);
    return (
      <View style={{}}>
        <View style={styles.appointmentCard}>
          <View style={{ flex: 2 }}>
            <View style={styles.appointmentImage}>
              {/* <Image source={{uri:imageurl+cartData?.get_webinar?.image}} style={{width:90,height:120,resizeMode:"cover"}} */}
              <Image
                source={{
                  uri:
                    item.type == 'webinar'
                      ? imageurl + item?.get_webinar?.image
                      : item.type == 'program'
                        ? imageurl + item?.get_program?.image
                        : item.type == 'expert'
                          ? imageurl + item?.get_expert?.image
                          : item.type == 'magzine'
                            ? imageurl + item?.get_program?.image
                            : null,
                }}
                style={{ width: 90, height: 120, resizeMode: 'cover' }}
              />
            </View>
          </View>
          <View style={{ flex: 5, marginLeft: 10 }}>
            {/* <Text style={styles.appointmentText}>
              Appointment: <Text style={styles.one1Text}>1</Text>
            </Text> */}
            {/* <Text style={styles.appointmentText}>
              {item.AppointmentInfoText}{' '}
              <Text style={styles.localTimeText}>Date & Time :</Text>
            </Text> */}
            {/* <Text style={styles.time}>
              {formattedDate} {cartData?.slot_form}
            </Text> */}
            <Text style={styles.appointmentText}>
              Service: <Text style={styles.time}>{item?.category?.title}</Text>
            </Text>
            {/* <Text style={styles.appointmentText}>
              {item.ConsultantTextName}{' '}
              <Text style={styles.time}>{cartData?.get_expert?.name}</Text>
            </Text> */}
            <Text style={styles.appointmentText}>
              Price : <Text style={styles.time}>{item?.amount} /-</Text>
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.cancelImageCOntainer}
              onPress={() => removeCart(item.id)}>
              <Image
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
                source={require('../../assets/images/deleteIcon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boderContainer}></View>
      </View>
    );
  };
  return (
    <>
      {cartData == undefined || cartData.length == 0 ? (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.headersContainer}>
              <View style={styles.headerTop}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => props.navigation.goBack()}>
                  <Image
                    style={styles.headerIcons}
                    source={require('../../assets/images/Header_Image.png')}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerTitle}>Cart</Text>
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
            </View>
            <View style={styles.colorContainer}></View>
          </View>
          <View
            style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: fonts.OptimaBlack,
                fontSize: 18,
                color: '#000',
              }}>
              There is no item in cart
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.headersContainer}>
            <View style={styles.headerTop}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => props.navigation.goBack()}>
                <Image
                  style={styles.headerIcons}
                  source={require('../../assets/images/Header_Image.png')}
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Cart</Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>
          <View style={styles.colorContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={cartData}
                keyExtractor={item => item.id}
                renderItem={renderDataItem}
              />
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
                <Text style={{ color: colors.themeColor, fontSize: 16 }}>
                  {subTotal}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  borderColor: 'red',
                  marginTop: 10,
                }}></View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>
                  Tax (GST {taxData.gst}%)
                </Text>
                <Text style={{ color: colors.themeColor, fontSize: 16 }}>
                  ₹ {taxDataitem}
                </Text>
              </View>

              <View style={styles.countButton}>
                <Text style={styles.titleText}>Total Amount</Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                  ₹{totalAmount}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.buttonBookNow}
                onPress={removeCart}
                >
                <Text style={styles.buttonTitle}>Remove Cart</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buttonBookNow}
                onPress={handleInstamozo}>
                <Text style={styles.buttonTitle}>Proceed To Checkout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default Cart;
