/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const Signin = (props) => {
  const [code, setCode] = useState('+91')
  const [number, setNumber] = useState('')
  const [errocode, setErroCode] = useState('Enter country Code')
  const [erronu, setErroNu] = useState('Enter Phone Number')
  const [erronumberlength, setErroNumberLength] = useState('Enter 10 Digit Mobile Number')
  const [isLoader, setIsLoader] = useState(false)

  useEffect(()=>{
    
  },[isLoader])

  const LogninApi = async () => {
    let error = false
    if (code == '') {
      Toast.show(errocode, Toast.LONG)
      error = true
    } else if (number == '') {
      Toast.show(erronu, Toast.LONG)
    } else if (number.length != 10) {
      Toast.show(erronumberlength, Toast.LONG)
    }
    else {
    
      const params = {
        country_code: code,
        mobile: number,
       
      }
      setIsLoader(true)
      Apis.LogninApi(params)
        .then(async (json) => {
         
          console.log('LogninApi+++++++++++=====:',json);
          if (json.status == true) {
            await auth().signInWithPhoneNumber("+91" + number).then(async (confirmation) => {
             
              props.navigation.navigate("otpverify", {
                User_Id: json.data.id,
                verifynumber: json.data.mobile,
                confirmation
                // NUMDERVerify: json.data.mobile,
              })
              setIsLoader(false)
            }).catch((err) => {
              console.log("Error : ", err);
              setIsLoader(false)
              Toast.show("Something Went wrong", Toast.LONG)
            });
          } else {
            setIsLoader(false)
            alert(json.message)
          }
        })
    }
  }

  // if (isLoader) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   )
  // }
  // const handleSignIn = () => {
  //   props.navigation.navigate("otpverify")
  // }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.child}>
          <Image style={styles.signupImg} source={require('../../assets/images/signup.png')} />
        </View>
        
       
        <View style={styles.formMainView}>
          <Text style={styles.welcmTxt}>Sign in</Text>
          <Text style={styles.signinTxt}>Enter your Mobile Number to Continue</Text>
          <View style={styles.formInputView}>
            <View style={styles.countryCode}>
              <TextInput
                placeholder='Country code'
                keyboardType='number-pad'
                secureTextEntry={false}
                style={styles.countrytxt}
                onChangeText={(text) => setCode(text)}
                value={code}
                editable={false}
              />
            </View>
            <TextInput
              maxLength={10}
              keyboardType='numeric'
              style={styles.signupInput}
              placeholder="Enter phone number"
              onChangeText={(text) => setNumber(text)}
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
         
          <TouchableOpacity style={styles.signUpBtn} onPress={() => { LogninApi() }}>
            <Text style={styles.signUpBtnTxt}>NEXT</Text>
          </TouchableOpacity>
          {/* <Text style={styles.alreadyAct}>Not have an account? <Text style={styles.termTxt} onPress={handleSignUp}>Sign Up</Text></Text> */}
        </View>
       
      </ScrollView>
    </View>

  );
};

export default Signin;
