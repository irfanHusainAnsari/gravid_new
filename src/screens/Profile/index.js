/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { svgs, colors } from '@common';
import Modal from "react-native-modal";
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../../Services/apis';
import { useIsFocused } from "@react-navigation/native";
import { imageurl } from '../../Services/constants';

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState()
  const [userProfile, setUserProfile] = useState()
  const refferalCode= userData?.referral_code
  const data = [
    { img: require('../../assets/images/profileicon.png'), titel: 'My Account', navigation: 'EditProfile' },
    { img: require('../../assets/images/Referral.png'), titel: 'Referral', navigation: 'Referral'},
    { img: require('../../assets/images/library.png'), titel: 'Library', navigation: 'Library' },
    { img: require('../../assets/images/skype.png'), titel: 'ParentingTV', navigation: 'ParentingTV' },
    { img: require('../../assets/images/termi_con.png'), titel: 'Terms & Conditions', navigation: 'TermsCondition' },
    { img: require('../../assets/images/policy_icon.png'), titel: 'Privacy Policy', navigation: 'Privacy_Policy' },
  ]
  useEffect(() => {
    async function setProfileData() {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        console.log('userProfile+++++++++++++++', userProfile);
        if (userProfile !== null) {
          var newVal = JSON.parse(userProfile);
          setUserProfile(newVal)
        }
      } catch (error) {
        // Error retrieving data
      }
      try {
        const jsondata = await AsyncStorage.getItem('valuedata');
        console.log('jsondata+++++++++++++++', jsondata);
        if (jsondata !== null) {
          var newVal = JSON.parse(jsondata);
          setUserData(newVal)
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    if (isFocused) {
      setProfileData()
    }

  }, [isFocused])

  const LogOut = () => {
    const params = {

    }
    Apis.Signout(params)
      .then(async (json) => {
        // console.log('Logout==========', json);
        // if (json.message == "user logout successfully") {
        //   try {
        await AsyncStorage.removeItem("valuedata")
        await AsyncStorage.removeItem("userProfile")
        // } catch (e) {
        //   // saving error
        // }
        navigation.reset({ index: 0, routes: [{ name: "welcome" }] })
        // navigation.navigate('Signin')
        // }
      }).catch(async () => {
        await AsyncStorage.removeItem("valuedata")
        await AsyncStorage.removeItem("userProfile")
        navigation.reset({ index: 0, routes: [{ name: "welcome" }] })
        // navigation.navigate('Signin')
      })
  }

  const renderItem = ({ item, index }) => (
 
    <>
      
      {/* {item.titel !== "Referral" ? */}
        <TouchableOpacity style={styles.manFlat} onPress={() => { navigation.navigate(item.navigation,{refferalCode}) }}>
          <View style={styles.profileHeader}>
            <Image source={item.img} style={styles.flatlistimage} />
            <Text style={styles.accountxt}>{item.titel}</Text>
          </View>
          <Image source={require('../../assets/images/right_arrow.png')}
            style={styles.arrowicon} />
        </TouchableOpacity>
        {/* : null} */}
    </>
  )
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity style={{ flex: 3 }} onPress={() => navigation.goBack()}>
          {svgs.backArrow("black", 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Profile</Text>
        <View style={{ flex: 3 }} />
      </View>
      <View style={styles.radiusView} />
      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity style={styles.editview} onPress={() => { navigation.navigate('EditProfile') }}>
            {svgs.editProfile(colors.black, 16, 14)}
            <Text style={styles.edittext}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.profileHeader}>
            {
              userData?.profile ? (
                <Image source={{ uri: imageurl + userData?.profile }}
                  style={styles.profileimg} />
              ) : (
                <View style={{ borderWidth: 1, borderColor: colors.lightblack, borderRadius: 70, padding: 20 }}>
                  {svgs.userIcon(colors.gray, 90, 90)}
                </View>
              )
            }
            <Text style={styles.userName}>{userData?.name ? userData?.name : userData?.fname} {userData?.lname}</Text>
          </View>
          <View style={styles.activerow}>
            <Image source={require('../../assets/images/Activeicon.png')}
              style={styles.activeimg} />
            <Text style={styles.Activetxt}>Active</Text>
          </View>
          <View style={styles.borderWi} />
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
            />
          </View>
          <TouchableOpacity style={styles.mansignbtn} activeOpacity={0.5}
            onPress={() => { LogOut() }}>
            <Image source={require('../../assets/images/SignOut.png')}
              style={styles.Signimg} />
            <Text style={styles.signtext}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
