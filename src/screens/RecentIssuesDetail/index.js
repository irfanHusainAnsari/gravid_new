import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import { svgs, colors } from '@common';
import { imageurl } from '../../Services/constants';
import Pdf from 'react-native-pdf';
import RazorpayCheckout from 'react-native-razorpay';
import Apis from '../../Services/apis';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import CommonHeader from '../../component/CommonHeader';
import LeaderRow from '../../component/LoaderRow'
import Button from '../../component/Button';
import LoaderRow from '../../component/LoaderRow';
const RecentIssuesDetail = (props) => {
  let recentIssueDetail = props?.route?.params?.item;
  console.log("recentIssueDetail=======================", recentIssueDetail)
  const isFocused = useIsFocused();
  const [magazineDetail, setMagazineDetail] = useState({})
  const [isLoader, setIsLoader] = useState(false)
  const [showdpimage, setShowdpimage] = useState({})
  const [userData, setUserData] = useState({})
  // console.log('userData', userData)
  console.log('magazineDetail11111111', magazineDetail)
  useEffect(() => {
    setMagazineDetail(recentIssueDetail);
  }, [recentIssueDetail])

  useEffect(() => {
    if (isFocused) {
      setUserProfileData();
    }
  }, [isFocused])

  const setUserProfileData = async () => {
    try {
      const jsondata = await AsyncStorage.getItem('valuedata');
      // console.log('jsondataEditProfile', jsondata)
      if (jsondata !== null) {
        var newVal = JSON.parse(jsondata);
        setUserData(newVal)
        // console.log('imageurl + newVal.profile', imageurl + newVal.profile);
        setShowdpimage({ path: imageurl + newVal.profile })
      }
    } catch (error) {
      console.log(result.response.data);
    }
  }
  const handleInstamozo = () => {
    setIsLoader(true)
    const params = {
      type: 1,
      type_id: magazineDetail?.id,
      // pay_id: paymentID,
      // currency: "INR",
      // amount: parseFloat(magazineDetail.amount),
      // rozerpay_status: "success"
      purpose: magazineDetail?.title,
      // amount:parseFloat(magazineDetail?.amount),
      amount: magazineDetail?.amount,
      phone: userData?.mobile,
      buyer_name: userData?.name,
      email: userData?.email,
    }
    Apis.instaMojoPayment(params)
      .then(async (json) => {
        console.log('objectjsonjson>>>>', json)
        if (json.status == true) {
          props.navigation.navigate("InstaMojoWebScreen", { instamojoData: json });
          // console.log('objectccccccccc', magazineDetail?.id)
          // handleUpdatePayment(magazineDetail?.id)
          // console.log('paymentInstamojo', JSON.stringify(json.payment_request));
          // alert("Payment Success")
          // setMagazineDetail({ ...magazineDetail, check_payment: json.data });
        }
        setIsLoader(false)
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false)
      })
  }
  const onBackPress = () => {
    props.navigation.goBack();
  }
  const handleUpdatePayment = (paymentID) => {
    console.log('paymentIDpaymentIDpaymentIDpaymentID', paymentID)
    setIsLoader(true)
    const params = {
      type: "1",
      type_id: magazineDetail.id,
      pay_id: paymentID,
      currency: "INR",
      amount: parseFloat(magazineDetail.amount),
      instaMojo_status: "success"
    }
    Apis.updatePayment(params)
      .then(async (json) => {
        // console.log('datalistHomePage=====:', JSON.stringify(json));
        if (json.status == true) {
          // alert("Payment Success")
          setMagazineDetail({ ...magazineDetail, check_payment: json.data });
        }
        setIsLoader(false)
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false)
      })
  }

  const handleDownload = (pdfUrl) => {
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
      }
    }).fetch('GET', pdfUrl).then((res) => {
      console.log("res", res);
    }).catch((err) => {
      console.log("err", err);
    })
  }

  const getDownloadsFile = () => {
    const android = RNFetchBlob.android
    RNFetchBlob.config({
      addAndroidDownloads: {
        // useDownloadManager: true,
        title: 'awesome.apk',
        description: 'An APK that will be installed',
        mime: 'application/pdf',
        mediaScannable: true,
        notification: true,
      }
    }).fetch(
      'GET',
      `http://www.example.com/awesome.apk`
    ).then((res) => {
      android.actionViewIntent(res.path(), 'application/vnd.android.package-archive')
    })
  }

  const handleSharePdf = async () => {
    const shareOptions = {
      //  message: magazineDetail.title,
      message: "",
      title: "Gravid",
      url: "\n " + "https://play.google.com/store/apps/details?id=com.gravid",
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
  }
  // console.log('=================result',imageurl, "========", magazineDetail?.file)
  return (
    <View style={styles.container}>
      <CommonHeader
        HeaderTitle={"Magazine"}
        shareicon={magazineDetail?.payment_type != "Paid" || magazineDetail?.check_payment?.id}
        handleSharePdf={() => handleSharePdf()}
        navigation={() => onBackPress()} />
      <View style={styles.radiusView} />
      {
        magazineDetail?.payment_type != "Paid" || magazineDetail?.check_payment?.id ? (
          <View style={{ flex: 1, marginLeft: 24 }}>
            {/* <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownload(imageurl + magazineDetail.file)}>
              <Text style={styles.downloadBtnTxt}>Download</Text>
            </TouchableOpacity> */}
            <Pdf
              trustAllCerts={false}
              // source={{ uri:"http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true }}
              source={{ uri: imageurl + magazineDetail?.file, cache: true }}
              onLoadComplete={(numberOfPages) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
              renderActivityIndicator={() => <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                <LeaderRow />
              </View>
              }
            />
          </View>
          // </View>
        ) : (
          <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
            <View>
              <Image style={styles.ScreenshotImage} source={{ uri: imageurl + magazineDetail?.image }} />
              <Text style={styles.gravidTitleText}>{magazineDetail?.title}</Text>
              <Text style={styles.novemberText}>{magazineDetail?.short_description}</Text>
            </View>
             <Button
                   Buttontitle={ isLoader ?
                   <LoaderRow/>
                   :"Buy Issues Rs" + magazineDetail?.amount}
                   Onhandle={()=>handleInstamozo()}
                />
          </ScrollView>
        )
      }
    </View>
  );
};

export default RecentIssuesDetail;