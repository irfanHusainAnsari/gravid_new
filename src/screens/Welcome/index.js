/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import styles from './styles';

const Welcome = (props) => {

  const handleSignup = () => {
    props.navigation.navigate("signup");
  }

  const handleSignin = () => {
    props.navigation.navigate("Signin");
  }

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Image style={{ height: 178, width: 178 }} source={require('../../assets/images/welcome-logo.png')} />
      </View>
      <Text style={styles.welcmTxt}>Welcome</Text>
      <View style={styles.btnMainView}>
        <TouchableOpacity style={styles.signUpBtn} onPress={handleSignup}>
          <Text style={styles.signUpBtnTxt}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInBtn} onPress={handleSignin}>
          <Text style={styles.signInBtnTxt}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
