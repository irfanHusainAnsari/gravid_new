import React, {useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {svgs, colors, fonts} from '@common';
import styles from './styles';


const OvulationDetail = props => {

   const {data} = props.route.params
   console.log('data', data)
   var date = new Date(data?.fertility_startDate);
   var year_start = date.toLocaleString('default', {year: 'numeric'});
   var monthh_start = date.toLocaleString('default', {month: '2-digit'});
   var day_start = date.toLocaleString('default', {day: '2-digit'});
   var dates = new Date(data?.fertility_ednDate);
   var year_end = dates.toLocaleString('default', {year: 'numeric'});
   var monthh_end = dates.toLocaleString('default', {month: '2-digit'});
   var day_end = dates.toLocaleString('default', {day: '2-digit'});
 
  return (
    <View style={styles.container}>


      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Ovulation Detail</Text>
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
      </View>
      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
          <View>
            <View style={[styles.btn]} onPress={()=> props.navigation.navigate("PregnancyTracker")}>
              <Text style={styles.btnTxt}>Your fertile date are {day_start}-{monthh_start}-{year_start} to {day_end}-{monthh_end}-{year_end}</Text>
            </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default OvulationDetail;
