import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput
} from 'react-native';
import styles from './style';
import {svgs, colors} from '@common';
import {imageurl} from '../../Services/constants';
import Pdf from 'react-native-pdf';
import RazorpayCheckout from 'react-native-razorpay';
import Apis from '../../Services/apis';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';


const RecentIssuesDetail = props => {
  let recentIssueDetail = props?.route?.params?.item;

  const isFocused = useIsFocused();
  const [magazineDetail, setMagazineDetail] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [showdpimage, setShowdpimage] = useState({});
  const [userData, setUserData] = useState({});
  const [cartData, setCartData] = useState('');
  const [taxData, setTaxData] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [magzineOpen, setMagzineOpen] = useState(true);
  const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
  const totalAmount = taxDataitem+cartData?.amount
  // console.log('userData', userData)
  console.log('magazineDetail11111111', magazineDetail);
  useEffect(() => {
    setMagazineDetail(recentIssueDetail);
  }, [recentIssueDetail]);

  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused]);

  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      // console.log('jsondataEditProfile', jsondata)
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal);
        // console.log('imageurl + newVal.profile', imageurl + newVal.profile);
        setShowdpimage({path: imageurl + newVal.profile});
      }
    } catch (error) {
      console.log(result.response.data);
    }
  };
  // console.log('magazineDetail', magazineDetail)
  // const HomePagedata = () => {
  //   const params = {
  //     id: BlogDetail.id,
  //     type: 1
  //   }
  //   Apis.HomeListsDetails(params)
  //     .then(async (json) => {
  //       console.log('Detail=====:', JSON.stringify(json))
  //       if (json.status == true) {
  //         setDetail(json.data)
  //       }
  //     })
  // }

  const proceedToCkeckout = () => {
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
    // const params = {
    //   type: 2,
    //   type_id: cartData?.data_id,
    //   amount: totalAmount,
    //   purpose: cartData?.category?.title,
    //   phone: userData?.mobile,
    //   buyer_name: userData?.name,
    //   email: userData?.email,
    //   cart_id:cartData?.id,
    //   tax_amount:taxDataitem,
    //   tax_percent:taxData?.gst,
    //   paid_amount:totalAmount,
    // };
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
  const onBackPress = () => {
    // props?.route?.params?.HomePagedata();
    props.navigation.goBack();
  };

  const onPressByIssue = () => {
    let form_data = new FormData();
    form_data.append('data_id', magazineDetail?.id);
    form_data.append('category_id', magazineDetail?.category);
    form_data.append('amount', magazineDetail?.amount);
    form_data.append('type', 'magzine');
    Apis.getCartPostSaveData(form_data)
      .then(async data => {
        console.log('data', data);
        if (data.status == true) {
          Toast.show(data?.message, Toast.LONG);
          setIsLoader(true);
          Apis.getCartData({})
            .then(async json => {
              console.log('jsonaaaa', json);
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
          setMagzineOpen(true)
          props.navigation.navigate("Cart")
          // setCartOpen(true);
        } else {
          Toast.show(data?.message, Toast.LONG);
        }
      })
      .catch(err => {
        console.log('errrr form_data', err);
      });
  };
  const handleUpdatePayment = paymentID => {
    console.log('paymentIDpaymentIDpaymentIDpaymentID', paymentID);
    setIsLoader(true);
    const params = {
      type: '1',
      type_id: magazineDetail.id,
      pay_id: paymentID,
      currency: 'INR',
      amount: parseFloat(magazineDetail.amount),
      instaMojo_status: 'success',
    };
    Apis.updatePayment(params)
      .then(async json => {
        // console.log('datalistHomePage=====:', JSON.stringify(json));
        if (json.status == true) {
          // alert("Payment Success")
          setMagazineDetail({...magazineDetail, check_payment: json.data});
        }
        setIsLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });
  };

  const handleDownload = pdfUrl => {
    RNFetchBlob.config({
      fileCache: true,
      // android only options, these options be a no-op on IOS
      addAndroidDownloads: {
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: magazineDetail.title,
        // File description (not notification description)
        description: magazineDetail.short_description,
        mime: 'image/png',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', pdfUrl)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const getDownloadsFile = () => {
    const android = RNFetchBlob.android;

    RNFetchBlob.config({
      addAndroidDownloads: {
        // useDownloadManager: true,
        title: 'awesome.apk',
        description: 'An APK that will be installed',
        mime: 'application/pdf',
        mediaScannable: true,
        notification: true,
      },
    })
      .fetch('GET', `http://www.example.com/awesome.apk`)
      .then(res => {
        android.actionViewIntent(
          res.path(),
          'application/vnd.android.package-archive',
        );
      });
  };

  const handleSharePdf = async () => {
    const shareOptions = {
      // message: magazineDetail.title,
      message: '',
      title: 'Gravid',
      url: '\n ' + 'https://play.google.com/store/apps/details?id=com.gravid',
      failOnCancel: false,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      // setResult('error: '.concat(getErrorString(error)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity style={{flex: 3}} onPress={onBackPress}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        {magzineOpen == true ? <Text style={styles.haddingTxt}>Magazine</Text> :
        cartOpen == true ?  <Text style={styles.haddingTxt}>Cart</Text> :null}
        
        <View style={{flex: 3}}>
          {magazineDetail?.payment_type != 'Paid' ||
          magazineDetail?.check_payment?.id ? (
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={handleSharePdf}>
              {svgs.share('black', 24, 24)}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.radiusView} />
      {magzineOpen && (
        <>
          {magazineDetail?.payment_type != 'Paid' ||
          magazineDetail?.check_payment?.id ? (
            // <View style={{flexDirection:"row"}}>
            //   <TouchableOpacity style={{borderWidth:1, alignSelf:"flex-end"}}>
            //     <Text>Download</Text>
            //   </TouchableOpacity>
            <View style={{flex: 1, marginLeft: 24}}>
              {/* <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownload(imageurl + magazineDetail.file)}>
     <Text style={styles.downloadBtnTxt}>Download</Text>
   </TouchableOpacity> */}
              <Pdf
                trustAllCerts={false}
                source={{uri: imageurl + magazineDetail?.file, cache: true}}
                onLoadComplete={numberOfPages => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
                renderActivityIndicator={() => (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="large" color="green" />
                  </View>
                )}
              />
            </View>
          ) : (
            // </View>
            <ScrollView
              style={{paddingHorizontal: 16}}
              showsVerticalScrollIndicator={false}>
              <View>
                <Image
                  style={styles.ScreenshotImage}
                  source={{uri: imageurl + magazineDetail?.image}}
                />
                <Text style={styles.gravidTitleText}>
                  {magazineDetail?.title}
                </Text>
                <Text style={styles.novemberText}>
                  {magazineDetail?.short_description}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buyIssuesButton}
                disabled={isLoader}
                onPress={onPressByIssue}
               
              >
                {isLoader ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buyIssuesText}>
                    Buy Issues Rs {magazineDetail?.amount}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </>
      )}

    
         {cartOpen && (
          <View style={styles.mainContainer}>
            <View style={styles.colorContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
              <View style={styles.appointmentCard}>
                  <View style={{ flex:2 }}>
                      <View style={styles.appointmentImage}>
                          <Image source={{uri:imageurl+cartData?.get_webinar?.image}} style={{height:100,resizeMode:"contain"}}/>
                      </View>
                  </View>
                  <View style={{ flex: 5, marginLeft: 10}}>
                      {/* <Text style={styles.appointmentText}>Appointment: 1</Text> */}
                      {/* <Text style={styles.appointmentText}>Appointment info : <Text style={styles.one1Text}>Date & Time</Text></Text> */}
                      {/* <Text style={styles.time}>{cartData?.sloat_date}, {cartData?.slot_form}-{cartData?.slot_to}</Text> */}
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
                  <Text style={{color:colors.themeColor, fontSize: 15,fontFamily:fonts.OptimaBold}}>₹{magazineDetail?.amount}</Text>
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
                <TouchableOpacity style={styles.buttonBookNow} 
                onPress={proceedToCkeckout}
                >
                  <Text style={styles.buttonTitle}>Proceed to checkout</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )}
    </View>
  );
};

export default RecentIssuesDetail;
