/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompleteVerify = (props) => {
  const [momlist, setMomList] = useState([])
  const [righticon, setRighIcon] = useState('0')

  const handleSubmit = async () => {
    props.navigation.reset({ index: 0, routes: [{ name: "BottomTabs" }] })
    // props.navigation.navigate("BottomTabs")
  }

  useEffect(() => {
    CategoryApi()
  }, [])

  const selectArrow = async (index, item) => {
    await AsyncStorage.setItem('catID', JSON.stringify(item.id))
    setRighIcon(index)
  }

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
      <TouchableOpacity onPress={() => { selectArrow(index, item) }} style={[styles.btn]}>
        <View style={styles.imgView}>
          <Image style={styles.btnImg} source={{ uri: imageurl + item.image }} />
        </View>
        <Text style={styles.btnTxt}>{item.title}</Text>
      </TouchableOpacity>
      {
        righticon == index ? (
          <ImageBackground style={styles.rightbg}
            source={require('../../assets/images/Rectangle.png')}>
            <Image style={styles.rightimg}
              source={require('../../assets/images/rightsvg.png')} />
          </ImageBackground>
        ) : null
      }
    </View>
  )
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.haddingView}>
          <Text style={styles.haddingTxt}>Tell us a bit about you!</Text>
        </View>
        <View style={styles.mainView}>
          <View>
            <FlatList
              data={momlist}
              renderItem={renderItem}
            />
          </View>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => { handleSubmit() }}>
            <Text style={styles.signUpBtnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  );
};

export default CompleteVerify;
