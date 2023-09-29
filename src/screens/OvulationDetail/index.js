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
  console.log('props?.route?.params', props?.route?.params)
   const {data} = props?.route?.params
   const {lmp} = props?.route?.params
   const {cycle_length} = props?.route?.params
 
   var date = new Date(data?.fertility_startDate);
   var year_start = date.toLocaleString('default', {year: 'numeric'});
   var monthh_start = date.toLocaleString('default', {month: '2-digit'});
   var day_start = date.toLocaleString('default', {day: '2-digit'});
   var dates = new Date(data?.fertility_ednDate);
   var year_end = dates.toLocaleString('default', {year: 'numeric'});
   var monthh_end = dates.toLocaleString('default', {month: '2-digit'});
   var day_end = dates.toLocaleString('default', {day: '2-digit'});
   var ovulation_date = new Date(data?.ovulation_date);
   var year_ovulation_date = ovulation_date.toLocaleString('default', {year: 'numeric'});
   var monthh_ovulation_date = ovulation_date.toLocaleString('default', {month: '2-digit'});
   var day_ovulation_date = ovulation_date.toLocaleString('default', {day: '2-digit'});
 
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

          <View style={{flexDirection:"row",alignSelf:"center",marginBottom:20}}>

          <Text
            style={{
              fontSize: 16,
              backgroundColor: colors.themeColor,
              elevation: 5,
              paddingHorizontal: 10,
              borderRadius: 4,
              fontFamily: fonts.OptimaBold,
              color: '#ffffff',
              alignSelf:"center",
              paddingVertical:4,
              marginRight:10
            }}>
            Date is {lmp}
          </Text>
          <TouchableOpacity style={styles.editview} onPress={() => {  props.navigation.navigate("OvulationTracker",{Lmp:lmp,cycle_length:cycle_length}) }}>
          
            {svgs.editProfile(colors.black, 16, 14)}
           
            <Text style={styles.edittext}>Edit</Text>
          </TouchableOpacity>
          </View>


          <View>
         
            <View style={[styles.btn]}>

            
              <Text style={styles.btnTxt}>Ovulation Date -          {day_ovulation_date}-{monthh_ovulation_date}-{year_ovulation_date}</Text>
              <Text style={styles.btnTxt}>Fertility Start Date-      {day_start}-{monthh_start}-{year_start}</Text>
              <Text style={styles.btnTxt}>Fertility End Date-       {day_end}-{monthh_end}-{year_end}</Text>
            </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default OvulationDetail;
