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
import BottomTabs from '../../navigator/BottomTabs';
import axios from 'axios';


const Cart = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [isProceedLoader, setIsProceedLoader] = useState(false);
  const [isApplyLoader, setIsApplyLoader] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [text, setText] = useState(1)
  const [taxData, setTaxData] = useState('');
  const [userData, setUserData] = useState({});
  const [cartDetail, setCartDetail] = useState();
  const [coupenCode, setCoupenCode] = useState("");
  const [coupenDiscount, setCoupanDiscount] = useState("");
  const [coupen, setCoupan] = useState("");
  var date = new Date(cartData?.sloat_date);
  var year = date.toLocaleString('default', { year: 'numeric' });
  var monthh = date.toLocaleString('default', { month: '2-digit' });
  var day = date.toLocaleString('default', { day: '2-digit' });
  // var formattedDate = day + '/' + monthh + '/' + year;
  // var newFormateDate = year + '-' + monthh + '-' + day;
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

  const discountAmount = subTotal * coupenDiscount / 100
  const subTotalDiscountAmount = subTotal - discountAmount
  const taxDataitem = (taxData?.gst / 100) * subTotalDiscountAmount;
  const totalAmount = taxDataitem + subTotalDiscountAmount;
  console.log('totalAmount', totalAmount)
  const PaidAmount = totalAmount - discountAmount

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
      });
    }
    console.log('abc', abc)
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
     console.log('error', error)
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
    setIsProceedLoader(true);
    if (cartDetail && coupen && coupenDiscount && discountAmount) {
      const params = {
        purpose: 'Gravid Payment',
        phone: userData?.mobile,
        buyer_name: userData?.name,
        email: userData?.email,
        cart_id: cartId.join(','),
        total_amount: parseFloat(subTotal).toFixed(2),
        amount: parseFloat(totalAmount).toFixed(2),
        cartData: cartDetail && cartDetail,
        coupan_code: coupen,
        coupan_codePercent: coupenDiscount,
        coupan_amount: parseFloat(discountAmount).toFixed(2),
        tax_amount: parseFloat(taxDataitem).toFixed(2),
        tax_percent: taxData?.gst,

      }
      console.log('params', params)
      Apis.instaMojoPayment(params)
        .then(async json => {
          console.log('json,,,', json);
          if (json.status == true) {
            props.navigation.navigate('InstaMojoWebScreen', {
              instamojoData: json,
            });
          }
          setIsProceedLoader(false);
        })
        .catch(error => {
          console.log('error', error);
          setIsProceedLoader(false);
        });
    }
    else {
      const params = {
        purpose: 'Gravid Payment',
        phone: userData?.mobile,
        buyer_name: userData?.name,
        email: userData?.email,
        cart_id: cartId.join(','),
        total_amount: parseFloat(subTotal).toFixed(2),
        amount: parseFloat(totalAmount).toFixed(2),
        cartData: cartDetail && cartDetail,
        tax_amount: parseFloat(taxDataitem).toFixed(2),
        tax_percent: taxData?.gst,
      }
      console.log('params', params)
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
  const goToDetail = (item) => {
    item.type == 'webinar'
      ? props.navigation.navigate("webinarDetail", { paid: item?.get_webinar })
      : item.type == 'program'
        ? props.navigation.navigate("ProgramsDetail", { paid: item?.get_program })
        : item.type == 'expert'
          ? props.navigation.navigate("ExpertListDetail", { item: item?.get_expert })
          : item.type == 'magzine'
            ? props.navigation.navigate("RecentIssuesDetail", { item: item?.get_magazine })
            : item.type == 'episode'
              ? props.navigation.navigate("RecordedWebinarVidioList", { item: item.get_episode })
              : item.type == 'package'
                ? props.navigation.navigate("NewPackegedetail", { paid: item?.get_package })
                : null
  }

  const applyCouponCode = async () => {
    setIsApplyLoader(true)
    const params = {
      coupan_code: coupenCode,
    }
    Apis.Coupancode(params)
      .then(async (json) => {
        if (json.status == true) {
          setCoupanDiscount(json?.data?.discount_percent);
          setCoupan(json?.data?.coupan_code)
          Toast.show(json?.message, Toast.LONG);
        } else {
          Toast.show(json?.message, Toast.LONG);
        }
        setIsApplyLoader(false)
      }).catch((error) => {
        console.log("Coupancodeerror", error);
        setIsApplyLoader(false)
      })
  }

  const renderDataItem = ({ item }) => {
    return (
      <View style={{}}>
        <TouchableOpacity style={styles.appointmentCard} onPress={() => goToDetail(item)}>
          <View style={{ flex: 2 }}>
            <View style={styles.appointmentImage}>
              <Image
                source={{
                  uri:
                    item.type == 'webinar'
                      ? imageurl + item?.get_webinar?.image
                      : item.type == 'program'
                        ? imageurl + item?.get_program?.image
                        : item.type == 'expert'
                          ? imageurl + item?.get_expert?.file
                          : item.type == 'magzine'
                            ? imageurl + item?.get_magazine?.image
                            : item.type == 'episode'
                              ? imageurl + item?.get_episode?.file
                              : item.type == 'package'
                                ? imageurl + item?.get_package?.image
                                : null,
                }}
                style={{ width: 90, height: 90, resizeMode: 'cover', backgroundColor: "#f2f2f2", borderRadius: 5 }}
              />
            </View>
          </View>
          <View style={{ flex: 5, marginLeft: 15, marginTop: 3 }}>
            <Text style={styles.one1Text}>
              <Text style={{
                color: '#000',
                fontSize: 14,
                marginBottom: 2, fontFamily: fonts.OptimaBold
              }}>Title : </Text>
              {item.type == 'webinar'
                ? item.get_webinar.title
                : item.type == 'magzine'
                  ? item.get_magazine.title
                  : item.type == 'program'
                    ? item.get_program.title
                    : item.type == 'expert'
                      ? item.get_expert.name
                      : item.type == 'episode'
                        ? item.get_episode.title
                        : null}
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
        </TouchableOpacity>
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
                  onPress={() => props.navigation.replace("BottomTabs")}>
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
                There is no item in cart
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
                onPress={() => props.navigation.replace("BottomTabs")}>
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
                  placeholder="Enter Coupon Code"
                  placeholderTextColor={'#000'}
                  onChangeText={(text) => setCoupenCode(text)}
                />
                <TouchableOpacity style={styles.buttonApply} onPress={applyCouponCode}>
                {isApplyLoader == true ? 
                    <ActivityIndicator size="small"/>: 
                    <Text style={styles.buttonTitles}>Apply</Text>}
                 
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Subtotal</Text>
                <Text style={{ color: colors.themeColor, fontSize: 14, fontFamily: fonts.OptimaDemiBold }}>
                  ₹{parseFloat(subTotal).toFixed(2)}
                </Text>
              </View>

              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Discount</Text>
                <Text style={{ color: colors.themeColor, fontSize: 14, fontFamily: fonts.OptimaDemiBold }}>
                  ₹{parseFloat(discountAmount).toFixed(2)}
                </Text>
              </View>

              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Tax (GST {taxData?.gst}%)</Text>
                <Text style={{ color: colors.themeColor, fontSize: 14, fontFamily: fonts.OptimaDemiBold }}>
                  ₹{parseFloat(taxDataitem).toFixed(2)}
                </Text>
              </View>

              <View
                style={{
                  borderStyle: "dashed",
                  borderTopWidth: 0.5,
                  borderTopColor: colors.themeColor,
                  marginTop: 20,
                  marginBottom: 15
                }}></View>

              <View style={styles.subtotalContainers}>
                <Text style={styles.subtotalTitleText}>Total Amount</Text>
                <Text style={{ color: colors.themeColor, fontSize: 14, fontFamily: fonts.OptimaDemiBold }}>
                  ₹ {parseFloat(totalAmount).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonBookNow}
                onPress={handleInstamozo}>
                    {isProceedLoader == true ? 
                    <ActivityIndicator size="small"/>: 
                    <Text style={styles.buttonTitle}>Proceed To Checkout</Text>}
               
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default Cart;
