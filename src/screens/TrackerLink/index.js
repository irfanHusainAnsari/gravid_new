import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { svgs, colors } from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackerLink = (props) => {
  // render
  return (
    <View style={styles.container}>
       <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Tracker</Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
        {/* <View style={styles.haddingView}>
          <Text style={styles.haddingTxt}>Tracker</Text>
        </View> */}
        <View style={styles.mainView}>
          <View>
            <TouchableOpacity style={[styles.btn]} onPress={()=> props.navigation.navigate("PregnancyTracker")}>
              <View style={styles.imgView}>
                <Image style={styles.btnImg} source={require("../../assets/images/mom.png")} />
              </View>
              <Text style={styles.btnTxt}>Pregnancy Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn]} onPress={()=> props.navigation.navigate("OvulationTracker")}>
              <View style={styles.imgView}>
                <Image style={styles.btnImg} source={require("../../assets/images/mom.png")} />
              </View>
              <Text style={styles.btnTxt}>Ovulation Tracker</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TrackerLink
