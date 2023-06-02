/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { svgs, colors } from '@common';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"

const CompleteVerifyDoc = (props) => {
  const [errcheck, setErrCheck] = useState('fill in the check box')
  const [term, setTerm] = useState(false)
  const handleTerm = () => {
    setTerm(!term)
  }
  const [righticon, setRighIcon] = useState('0')
  const selectArrow = (index) => {
    setRighIcon(index)
  }
  const handleSignUp = () => {
    let error = false
    if (term == '') {
      Toast.show(errcheck, Toast.LONG);
    } else {
      props.navigation.navigate("BottomTabs")
    }
  }
  const [momlist, setMomList] = useState([])
  useEffect(() => {
    CategoryApi()
  }, [])

  const CategoryApi = () => {
    const params = {
    }
    Apis.CategoryApi(params)
      .then(async (json) => {
        console.log('CategoryApi=====:', JSON.stringify(json));
        if (json.status == true) {
          setMomList(json.data)
        }

      })
  }
  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity style={styles.btn} onPress={() => { selectArrow(index) }}>
        <View style={styles.imgView}>
          <Image style={styles.btnImg} source={{ uri: imageurl + item.image }} />
        </View>
        <LinearGradient colors={['#FFFFFF00', '#4B4B4B']} style={styles.linearGradient}>
          <Text style={styles.btnTxt}>{item.title}</Text>
        </LinearGradient>
        <ImageBackground style={styles.rightbg}
          source={righticon == index ? require('../../assets/images/Rectangle.png') : null}>
          <Image style={styles.rightimg}
            source={righticon == index ? require('../../assets/images/rightsvg.png') : null} />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.haddingView}>
          <Text style={styles.haddingTxt}>Tell us your Interests !</Text>
        </View>
        <View style={styles.mainView}>
          <View style={{ alignItems: 'center', marginLeft: 15 }}>
            <FlatList
              data={momlist}
              renderItem={renderItem}
              numColumns={2}
            />
          </View>
        </View>
        <View style={styles.termCondition}>
          <TouchableOpacity onPress={handleTerm}>
            {term ? svgs.checkedCheckbox(colors.grayRegular, 18) : svgs.checkbox(colors.grayRegular, 18)}
          </TouchableOpacity>
          <Text style={styles.termConditionTxt}>I would like to receive updates on Mail</Text>
        </View>
        <TouchableOpacity style={styles.signUpBtn} onPress={() => { handleSignUp() }}>
          <Text style={styles.signUpBtnTxt}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

  );
};

export default CompleteVerifyDoc;
