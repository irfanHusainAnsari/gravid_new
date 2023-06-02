/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useTransition } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput } from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import Toast from 'react-native-simple-toast';
import { SelectList } from 'react-native-dropdown-select-list'
import fonts from '../../common/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Signup = (props) => {
  const [firstn, setFirstN] = useState('')
  const [lastn, setLastN] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [referral, setReferral] = useState('')
  const [selected, setSelected] = useState("User");
  const [errselect, setErrSelect] = useState("Please Select Option")
  const [errfname, setErrFname] = useState("Enter First name")
  const [errlname, setErrLname] = useState('Enter Last name')
  const [errphone, setErrPhone] = useState('Enter Phone Number')
  const [numberlength, setNumberLength] = useState('Enter 10 Digit Mobile Number')
  const [errmail, setErrMail] = useState('Enter Email id')
  const [errcity, setErrCity] = useState('Enter City')
  const [errReferral, setErrreferral] = useState('Enter Referral Code')
  const [errcheck, setErrCheck] = useState('Click the checkbox to proceed')


  const [term, setTerm] = useState(false)
  // const [loader, setLoader] = useState(true)
  const handleTerm = () => {
    setTerm(!term)
  }

  const handleSignIn = () => {
    props.navigation.navigate("Signin")
  }

  const data = [
    { key: '1', value: 'Doctor ', },
    { key: '2', value: 'User' },
  ]

  const SignUp = async () => {
    let error = false
    if (selected == '') {
      Toast.show(errselect, Toast.LONG);
      error = true
    }
    else if (firstn == '') {
      Toast.show(errfname, Toast.LONG);
      error = true
    } else if (firstn.length < 2 || firstn.length > 50) {
      Toast.show("First Name must be between 2 to 50 characters", Toast.LONG);
      error = true
    } else if (lastn == '') {
      Toast.show(errlname, Toast.LONG);
    } else if (lastn.length < 2 || lastn.length > 50) {
      Toast.show("Last Name must be between 2 to 50 characters", Toast.LONG);
      error = true
    } else if (number == '') {
      Toast.show(errphone, Toast.LONG);
    } else if (number.length != 10) {
      Toast.show(numberlength, Toast.LONG);
    } else if (email == '') {
      Toast.show(errmail, Toast.LONG);
    } else if (city == '') {
      Toast.show(errcity, Toast.LONG);
    }else if (referral == '') {
      Toast.show(errReferral, Toast.LONG);
    }
    else if (term == '') {
      Toast.show(errcheck, Toast.LONG);
    }
    else {
      // console.log("+++++++++++++++++++++", selected)
      var useType = selected == "User" ? 1 : 2;
      const params = JSON.stringify({
        fname: firstn,
        lname: lastn,
        mobile: number,
        email: email,
        city: city,
        user_type: useType,
        countryCode: '+91',
        referral_code: referral,
        updated_at: "2023-01-24T08:55:06.000000Z",
        created_at: "2023-01-24T08:55:06.000000Z",
        id: 10,
      });
      Apis.signup(params)
        .then(async (json) => {
          console.log('============Signup:', json.data);
          if (json.status == true) {
            await auth().signInWithPhoneNumber("+91" + number).then(async (confirmation) => {
              console.log("confirmation",confirmation)
              props.navigation.navigate("otpverify", {
                type: 'signup',
                Temp_Id: json.data.id,
                verifynumber: json.data.mobile,
                Country_Code: json.data.country_code,
                confirmation
              })
              // setLoader(false)
            }).catch((err) => {
              console.log("Error : ", err);
              Toast.show("Something Went wrong", Toast.LONG)
            });
          } else {
            alert(json.message)
          }
        })
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.child}>
          <Image style={styles.signupImg} source={require('../../assets/images/signup.png')} />
        </View>
        <View style={styles.formMainView}>
          <Text style={styles.welcmTxt}>Create your account</Text>
          {/* <View style={{ width: '96%', flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <View style={{ width: "8%", alignSelf: "flex-start", marginTop: 12 }}>
              <Image style={styles.managementImage} source={require('../../assets/images/management.png')} />
            </View>
            <View style={{ width: "92%" }}>
              <SelectList
                boxStyles={{ borderWidth: 0, borderBottomWidth: 0.4, paddingLeft: 10, paddingBottom: 6 }}
                inputStyles={styles.dropinput}
                setSelected={setSelected}
                data={data}
                save="value"
              />
            </View>
          </View> */}
          <View style={styles.formInputView}>
            {svgs.userIcon(colors.grayRegular, 20)}
            <TextInput
              placeholder="First Name"
              style={styles.signupInput}
              onChangeText={(text) => setFirstN(text)}
            />
          </View>
          <View style={styles.formInputView}>
            {svgs.userIcon(colors.grayRegular, 20)}
            <TextInput
              placeholder="Last Name"
              style={styles.signupInput}
              onChangeText={(text) => setLastN(text)}

            />
          </View>
          <View style={styles.formInputView}>
            {svgs.mobileIcon(colors.grayRegular, 18, 20)}
            <TextInput
              maxLength={10}
              keyboardType='numeric'
              placeholder="Phone Number"
              style={styles.signupInput}
              onChangeText={(text) => setNumber(text)}
            />
          </View>
          <View style={styles.formInputView}>
            {svgs.email(colors.grayRegular, 20, 16)}
            <TextInput
              placeholder="Email ID"
              style={styles.signupInput}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.formInputView}>
            <Image style={styles.managementImage} source={require('../../assets/images/location.png')} />
            <TextInput
              placeholder="City"
              style={styles.signupInput}
              onChangeText={(text) => setCity(text)}

            />
          </View>
          <View style={styles.formInputView}>
            <Image style={styles.managementImage} source={require('../../assets/images/referal.png')} />
            <TextInput
              placeholder="Referral Code"
              style={styles.signupInput}
              onChangeText={(text) => setReferral(text)}

            />
          </View>
          <View style={styles.termCondition}>
            <TouchableOpacity onPress={handleTerm}>
              {term ? svgs.checkedCheckbox(colors.grayRegular, 18) : svgs.checkbox(colors.grayRegular, 18)}
            </TouchableOpacity>
            <Text style={styles.termConditionTxt}>I agree with the <Text style={styles.termTxt} onPress={() => props.navigation.navigate("TermsCondition")}>Terms & Conditions</Text> and <Text style={styles.termTxt} onPress={() => props.navigation.navigate("Privacy_Policy")}>Privacy Policy</Text></Text>
          </View>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => { SignUp() }}>
            <Text style={styles.signUpBtnTxt}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={styles.alreadyAct}>Already have a account? <Text onPress={handleSignIn} style={styles.termTxt}>Sign in</Text></Text>
        </View>
      </ScrollView>
    </View>

  );
};

export default Signup;
