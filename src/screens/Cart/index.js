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
  const [text, setText] = useState(1)
  const [taxData, setTaxData] = useState('');
  const [userData, setUserData] = useState({});
  const [cartDetail, setCartDetail] = useState();
  var date = new Date(cartData?.sloat_date);
  var year = date.toLocaleString('default', { year: 'numeric' });
  var monthh = date.toLocaleString('default', { month: '2-digit' });
  var day = date.toLocaleString('default', { day: '2-digit' });
  var formattedDate = day + '/' + monthh + '/' + year;
  var newFormateDate = year + '-' + monthh + '-' + day;
  let myArray = [];
  let cartId = [];
  if (cartData.length > 0) {
    cartData.forEach(function (arrayItem) {
      myArray.push(arrayItem.amount);
      cartId.push(arrayItem.id);
    });
  }

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
    let taxCal = taxData?.gst;
    let abc = [];
    for (let i = 0; i < cartData?.length; i++) {
      abc.push({
        id: cartData[i].id,
        tax_amount: cartData[i].amount,
        tax_percent: taxCal,
        paid_amount: Math.trunc(
          cartData[i].amount + (taxCal / 100) * cartData[i].amount,
        ),
      });
    }
    setCartDetail(abc);
  }, [cartData, taxData]);
  const setUserProfileData = async () => {
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

  const getCart = () => {
    setIsLoader(true);
    Apis.getCartData({})
      .then(async json => {
        if (json.status == true) {
          setText(json?.data?.length)
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

  // if (isLoader) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

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
        purpose: 'Gravid Payment',
        phone: userData?.mobile,
        buyer_name: userData?.name,
        email: userData?.email,
        cart_id: cartId.join(','),
        paid_amount: totalAmount,
        amount: totalAmount,
        cartData: cartDetail && cartDetail,
      };

      Apis.instaMojoPayment(params)
        .then(async json => {
          console.log('json,,,', json);
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
          <View style={{ flex: 5, marginLeft: 15, marginTop: 3 }}>
            <Text style={styles.appointmentText}>
              {item.type == 'webinar'
                ? "Webinar Detail"
                : item.type == 'magzine'
                  ? "Magzine Detail"
                  : item.type == 'program'
                    ? "Program Detail"
                    : item.type == 'expert'
                      ? "Expert Detail"
                      : 'dummy'}
            </Text>
            <Text style={styles.one1Text}>
              <Text style={{
                color: '#6D7A90',
                fontSize: 14,
                marginBottom: 2, fontFamily: fonts.OptimaDemiBold
              }}>Title:</Text>
              {item.type == 'webinar'
                ? item.get_webinar.title
                : item.type == 'magzine'
                  ? item.get_program.title
                  : item.type == 'program'
                    ? item.get_program.title
                    : item.type == 'expert'
                      ? item.get_expert.name
                      : 'dummy'}
            </Text>
            {item?.category != null ?
              <Text style={styles.appointmentText}>
                Service: <Text style={styles.time}>{item?.category?.title}</Text>
              </Text>
              :
              null}

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
            {text == 0 ?
              <Text
                style={{
                  fontFamily: fonts.OptimaBlack,
                  fontSize: 18,
                  color: '#000',
                }}>
                There is no item in cart:null
              </Text> : 
              <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                   <ActivityIndicator size="large" />
                </View>}
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
