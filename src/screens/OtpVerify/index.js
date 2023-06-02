/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { svgs, colors } from '@common';
import styles from './styles';
import fonts from '../../common/fonts';
import Apis from '../../Services/apis';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerify = (props) => {
  const { navigation, route } = props;
  // console.log("loginumber", route)
  // console.log("Idd ========::", route)
  // console.log('user++++++++++++', route)
  // console.log("Mobile Number ========::", route)
  const { confirmation } = route.params;
  const [number, setNumder] = useState(route.params.verifynumber)
  const [loginumber, setLogiNmber] = useState(route.params.NUMDERVerify)
  const [id, setId] = useState(route.params.Temp_Id)
  const [user, setUser] = useState(route.params.User_Id)
  const [countrycode, setCountryCode] = useState(route.params.Country_Code)
  const [signType, setSignType] = useState(route?.params?.type)
  const [isLoader, setIsLoader] = useState(false)
  console.log("isLoader",isLoader)
  // useEffect(() => {
  //   console.log('------route.params.type:: ', signType);
  // }, [])

  const [otp, setotp] = useState('')
  const [errotp, setErrOtp] = useState('Enter valid OTP')
  const [errotplength, setErrOtplength] = useState('Enter 4 Digit OTP')

  const SignupOtpMatch = async () => {
    let error = false
    if (otp == '') {
      Toast.show(errotp, Toast.LONG);
      error = true
    } else if (otp.length != 6) {
      Toast.show(errotplength, Toast.LONG);
      error = true
    }
    else {
      let fcm= await AsyncStorage.getItem("fcmToken")
      console.log('fcm', fcm)
      const params = {
        temp_id: id,
        otp: 1234,
        fcm_token:fcm
      };
      setIsLoader(true)
      await confirmation.confirm(otp).then(() => {
        Apis.SignupOtpMatch(params)
          .then(async (json) => {
            console.log('OtpMutch========== ;;', JSON.stringify(json.data));
            setIsLoader(false)
            if (json.status == true) {
              await AsyncStorage.setItem("valuedata", JSON.stringify(json.data))
              try {
                await AsyncStorage.setItem('accessToken', json.token)
              } catch (e) {
                // saving error
              }
              if (json.data.user_type == 1) {
                navigation.navigate("completeVerify")
              } else {
                navigation.navigate("CompleteVerifyDoc")
              }
            } else {
              Toast.show(json.message, Toast.LONG);
            }
          })
      }).catch((err) => {
        setIsLoader(false)
        console.log("error", err);
      })
    }
  }

  const LoginOtp = async () => {
    let error = false
    if (otp == '') {
      Toast.show(errotp, Toast.LONG);
      error = true
    } else if (otp.length != 6) {
      Toast.show(errotplength, Toast.LONG);
      error = true
    }
    else {
      let fcm= await AsyncStorage.getItem("fcmToken")
      console.log('fcm', fcm)
      const params = {
        userId: user,
        otp: 1234,
        fcm_token:fcm
      };
      setIsLoader(true)
      confirmation.confirm(otp).then((res) => {
        Apis.LoginOtp(params)
          .then(async (json) => {
            console.log('LoginOtp:::======>', JSON.stringify(json));
            setIsLoader(false)
            if (json.status == true) {
              await AsyncStorage.setItem("valuedata", JSON.stringify(json.data))
              try {
                await AsyncStorage.setItem('accessToken', json.token)
              } catch (e) {
                // saving error
              }
              if (json.data.user_type == 1) {
                navigation.navigate("completeVerify")
              } else {
                navigation.navigate("CompleteVerifyDoc")
              }
            } else {
              Toast.show(json.message, Toast.LONG);
            }
          })
      }).catch((err) => {
        setIsLoader(false)
        console.log("error", err);
        Toast.show("Enter Correct OTP", Toast.LONG)
      })
    }
  }

  const ResendOtp = () => {
    const params = {
      country_code: countrycode,
      mobile: number,
    }
    Apis.ResendOtpSignup(params)
      .then(async (json) => {
        console.log('==========Resend-Otp-Signup:', JSON.stringify(json));

      })
  }

  // if (isLoader) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   )
  // }



  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.child}>
          {signType === 'signup' ?
            <Image style={styles.signupImg} source={require('../../assets/images/otpimage.png')} />
            :
            <Image style={styles.signupImg} resizeMode='stretch' source={require('../../assets/images/otp-verify1.png')} />
          }
        </View>
        <View style={styles.formMainView}>
          <Text style={styles.welcmTxt}>Verification Code</Text>
          <Text style={styles.signinTxt}>We have sent the code verification to </Text>

          <View style={{flexDirection:"row",marginHorizontal:35}}>
              <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
              <Text style={{ color: colors.black, fontFamily: fonts.OptimaBold }}>Your Mobile Number</Text>
              </View>
              <View style={{flex:1,alignItems:"center"}}>
              <Text style={{ color: colors.black, fontFamily: fonts.OptimaBold }}>+91 {number}</Text>
              </View>
          </View>
          <View style={styles.formInputView}>
            <OTPInputView
              pinCount={6}
              autoFocusOnLoad
              style={styles.otpBox}
              onCodeChanged={(text) => setotp(text)}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 7,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
            }}>
             {isLoader &&  <ActivityIndicator size="large" />}
          </View>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => { signType ? SignupOtpMatch() : LoginOtp() }}>
            <Text style={styles.signUpBtnTxt}>SUBMIT</Text>
          </TouchableOpacity>
          <Text style={styles.alreadyAct}>Didn't receive an OTP? </Text>
          <TouchableOpacity onPress={() => { ResendOtp() }}>
            <Text style={[styles.alreadyAct, styles.termTxt]}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )
}

export default OtpVerify;

{/* <View style={styles.swiper}> */ }
{/* <SwiperFlatList
          autoplay={true}
          autoplayDelay={5}
          autoplayLoop
          // index={2}
          showPagination
          data={["1"]}
          paginationStyleItemActive={styles.activeSliderpage}
          paginationStyleItemInactive={styles.inActiveSliderpage}
          renderItem={({ item }) => ( */}
{/* <View style={styles.child}>
          <Image style={{ height: 302, resizeMode: 'contain', width: 307, sliders: activeIndex }} source={sliders[activeIndex].img} />
          <Text style={styles.introTitle}>{sliders[activeIndex].title}</Text>
          <Text style={styles.text}>{sliders[activeIndex].des}</Text>
        </View> */}
{/* )}
        /> */}
{/* <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={activeIndex == 0 ? styles.activeSliderpage : styles.inActiveSliderpage} />
          <View style={activeIndex == 1 ? styles.activeSliderpage : styles.inActiveSliderpage} />
          <View style={activeIndex == 2 ? styles.activeSliderpage : styles.inActiveSliderpage} />
        </View>
      </View> */}
