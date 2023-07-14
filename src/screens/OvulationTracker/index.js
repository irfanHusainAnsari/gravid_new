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
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-picker/picker';

const OvulationTracker = props => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [periodDate, setPeriodDate] = useState('');
  const [maximumDate, setMaximumDate] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Cycle Length');
  const [isLoader, setIsLoader] = useState(false);
  console.log('selectedValue', selectedValue);

  const selectDatePeriodDelivery = (type, date) => {
    if (type == 'pregnancy') {
      let year = date.toLocaleString('default', {year: 'numeric'});
      let monthh = date.toLocaleString('default', {month: '2-digit'});
      let day = date.toLocaleString('default', {day: '2-digit'});
      let formattedDate = day + '-' + monthh + '-' + year;
      setPeriodDate(formattedDate);
    }
  };
  const submitDate = () => {
    if (
      periodDate != '' &&
      selectedValue != '' &&
      selectedValue != null &&
      selectedValue != 'Cycle Length'
    ) {
      let formdata = new FormData();
      formdata.append('cycle_length', selectedValue);
      formdata.append('period_startDate', periodDate);
      console.log('formdata1', formdata);
      setIsLoader(true);
      Apis.get_OvulationData(formdata)
        .then(async json => {
          console.log('get_PeriodData ====== ', json);
          if (json.status == true) {
            setIsLoader(false);
            props.navigation.navigate('OvulationDetail',{data:json.data});
          } else json(Toast.show(json.message, Toast.LONG));
        })
        .catch(error => {
          console.log('error', error);
          setIsLoader(false);
        });
    } else {
      if (periodDate == '') {
        Toast.show('Please select a date', Toast.LONG);
      } else if (selectedValue == '') {
        Toast.show('Please select Cycle Length', Toast.LONG);
      } else if (selectedValue == null) {
        Toast.show('Please select Cycle Length', Toast.LONG);
      } else if (selectedValue == 'Cycle Length') {
        Toast.show('Please select Cycle Length', Toast.LONG);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Ovulation Tracker</Text>
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
                  selectDatePeriodDelivery('pregnancy', date);
                }}
                onCancel={() => {
                  setOpen1(false);
                }}
              />
              <TouchableOpacity onPress={() => setOpen1(true)}>
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
        {isLoader && (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: 300,
              zIndex: 100,
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        )}

        <View style={{alignSelf: 'center', marginBottom: 20}}>
          <Text style={{fontFamily: fonts.OptimaBold, color: '#000'}}>AND</Text>
        </View>

        <View style={[styles.btn]}>
          <Text style={styles.btnTxt}>
            What is the average length of your menstrual cycle
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={styles.searchBoxView}>
              {/* <Text style={{fontSize:12,fontFamily:fonts.OptimaDemiBold}}>{selectedValue}</Text> */}
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: '100%'}}
                itemStyle={{ color: 'red'}}
                ViewStyleProp={{fontSize:10}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Cycle Length" value={null}/>
                <Picker.Item label="28 Days" value={28} />
                <Picker.Item label="29 Days" value={29} />
                <Picker.Item label="30 Days" value={30} />
                <Picker.Item label="31 Days" value={31} />
                <Picker.Item label="32 Days" value={32} />
                <Picker.Item label="33 Days" value={33} />
                <Picker.Item label="34 Days" value={34} />
                <Picker.Item label="35 Days" value={35} />
              </Picker>
            </View>
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
        <TouchableOpacity style={styles.joinWebinarBtn} onPress={submitDate}>
          <Text style={styles.joinWebinarBtnTxt}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OvulationTracker;
