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
import DatePicker from 'react-native-date-picker';
import Apis from '../../Services/apis';
import {imageurl} from '../../Services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';

const PregnancyTracker = props => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [periodDate, setPeriodDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [navigateDate, setNavigateDate] = useState("");
  const [maximumDate, setMaximumDate] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isLoader, setIsLoader] = useState(false)
  const selectDatePeriodDelivery = (type,date) => {
        setNavigateDate(date)
    console.log('date==========', date)
    if (type == 'pregnancy') {
      let year = date.toLocaleString('default', {year: 'numeric'});
      let monthh = date.toLocaleString('default', {month: '2-digit'});
      let day = date.toLocaleString('default', {day: '2-digit'});
      let formattedDate = day + '-' + monthh + '-' + year;
      setPeriodDate(formattedDate);
      setDeliveryDate("");
    } 
    else if(type == "period"){
      let year = date.toLocaleString('default', {year: 'numeric'});
      let monthh = date.toLocaleString('default', {month: '2-digit'});
      let day = date.toLocaleString('default', {day: '2-digit'});
      let formattedDate = day + '-' + monthh + '-' + year;
      setDeliveryDate(formattedDate)
      setPeriodDate("")
    }
  };
  const submitDate = () => {
      if(periodDate != ""){
        let formdata = new FormData();
        formdata.append("Imp",periodDate)
        console.log('formdata1', formdata)
        setIsLoader(true)
        Apis.get_TrackerData(formdata)
                .then(async (json) => {
                    console.log('get_PeriodData ====== ', json);
                    if (json.status == true) {
                      setIsLoader(false)
                      props.navigation.navigate("PregnancyDetail",{json:json,navigateDate:navigateDate})
                    } else (json)(
                        Toast.show(json.message, Toast.LONG)
                    )
                }).catch((error) => {
                    console.log("error", error);
                    setIsLoader(false)
                })
    }else if(deliveryDate != ""){
        let formdata = new FormData();
        formdata.append("edt",deliveryDate)
        console.log('formdata2', formdata)
        setIsLoader(true)
        Apis.get_TrackerData(formdata)
                .then(async (json) => {
                    console.log('get_DeliveryData ====== ', json);
                    if (json.status == true) {
                      setIsLoader(false)
                      props.navigation.navigate("PregnancyDetail",{json:json,navigateDate:navigateDate})
                    } else (json)(
                        Toast.show(json.message, Toast.LONG)
                    )
                }).catch((error) => {
                    console.log("error", error);
                    setIsLoader(false)
                })
    }else{
      Toast.show("Please select a date", Toast.LONG)
    }

    // }

    
  };
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Pregnancy Tracker</Text>
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
        <View>
          <View style={[styles.btn]}>
            <Text style={styles.btnTxt}>
              First Day of your last period(LMP)
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              }}>
              <View style={styles.searchBoxView}>
                <Text>{periodDate}</Text>
              </View>
              <DatePicker
                modal
                mode="date"
                open={open1}
                date={date}
                maximumDate={maximumDate}
                onConfirm={date => {
                  setOpen1(false);
                  selectDatePeriodDelivery("pregnancy",date)
                }}
                onCancel={() => {
                  setOpen1(false);
                }}
              />
              <TouchableOpacity
                onPress={() =>setOpen1(true)}>
                <Image
                  source={require('../../assets/images/calendar.png')}
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: 'contain',
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isLoader && 
        <View style={{position:"absolute",alignSelf:"center",top:300,zIndex:100}}>
        <ActivityIndicator size={'large'}/>
      </View>}
          
        <View style={{alignSelf: 'center', marginBottom: 20}}>
          <Text style={{fontFamily: fonts.OptimaBold, color: '#000'}}>OR</Text>
        </View>

        <View style={[styles.btn]}>
          <Text style={styles.btnTxt}>Estimated Delivery Date</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={styles.searchBoxView}>
              <Text>{deliveryDate}</Text>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open2}
              date={date}
              maximumDate={maximumDate}
              onConfirm={date => {
                setOpen2(false);
                selectDatePeriodDelivery("period",date)
              }}
              onCancel={() => {
                setOpen2(false);
              }}
            />
            <TouchableOpacity
              onPress={() => setOpen2(true)}>
              <Image
                source={require('../../assets/images/calendar.png')}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={[styles.btn1]}>
          <TextInput
            placeholder="Space for disclaimer"
            style={styles.searchBox1}
            multiline={true}
            // value={searchTxt}
            // onChangeText={setSearchTxt}
          />
        </View>
        <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={submitDate}
                >
                <Text style={styles.joinWebinarBtnTxt}>Submit</Text>
              </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PregnancyTracker;
