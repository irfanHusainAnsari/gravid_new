import React, { useEffect, useState, useRef } from 'react';
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
import { svgs, colors, fonts } from '@common';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import Apis from '../../Services/apis';
import { imageurl } from '../../Services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-picker/picker';

const OvulationTracker = props => {
  console.log('props', props.route.params)
  const periodDatefrom = props?.route?.params?.Lmp
  const cycle_length= props?.route?.params?.cycle_length
  console.log('cycle_length', cycle_length)
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [periodDate, setPeriodDate] = useState('');
  const [ovlutionText, setOvlutionText] = useState(`This is the disclaimer text in the pregnancy tracker..
  it is also available in the tracker sheet It is important to note that every woman's pregnancy experience
  is different, and you may not experience all of these symptoms. If you have any concerns or questions about
  your symptoms, it is important to talk to your healthcare provider.It is important to note that every woman's
  pregnancy experience is different, and you may not experience all of these symptoms. If you have any concerns 
  or questions about your symptoms, it is important to talk to your healthcare provider.`);
  const [maximumDate, setMaximumDate] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [selectedValue, setSelectedValue] = useState(cycle_length ? cycle_length : "Cycle Length");
  const [isLoader, setIsLoader] = useState(false);
  const [showCycle, setshowCycle] = useState(false);
  console.log('selectedValue', selectedValue);

  let cycleArray = [
    { id: 1, cycle: 28 },
    { id: 1, cycle: 29 },
    { id: 1, cycle: 30 },
    { id: 1, cycle: 31 },
    { id: 1, cycle: 32 },
    { id: 1, cycle: 33 },
    { id: 1, cycle: 34 },
    { id: 1, cycle: 35 },
  ]

  const selectDatePeriodDelivery = (type, date) => {
    if (type == 'pregnancy') {
      let year = date.toLocaleString('default', { year: 'numeric' });
      let monthh = date.toLocaleString('default', { month: '2-digit' });
      let day = date.toLocaleString('default', { day: '2-digit' });
      let formattedDate = day + '-' + monthh + '-' + year;
      setPeriodDate(formattedDate);
    }
  };


  const submitDate = () => {
    if (
      periodDate != '' || periodDatefrom != "" &&
      selectedValue != '' &&
      selectedValue != null &&
      selectedValue != 'Cycle Length'
    ) {
      let formdata = new FormData();
      formdata.append('cycle_length', selectedValue);
      formdata.append('period_startDate', periodDate == "" ? periodDatefrom : periodDate);
      formdata.append("is_change", 1)
      console.log('formdata1', formdata);
      setIsLoader(true);
      Apis.get_OvulationData(formdata)
        .then(async json => {
          console.log('get_PeriodData ====== ', json);
          if (json.status == true) {
            setIsLoader(false);
            props.navigation.navigate('OvulationDetail', { data: json.data, lmp: periodDate == "" ? periodDatefrom : periodDate,cycle_length:selectedValue });
          } else json(Toast.show(json.message, Toast.LONG));
        })
        .catch(error => {
          console.log('error', error);
          setIsLoader(false);
        });
    } else {
      if (periodDate == '' && periodDatefrom == "") {
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
          style={{ flex: 3 }}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Ovulation Tracker</Text>
        <Text style={styles.haddingTxt}></Text>
        <View style={{ flex: 3 }} />
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
                <Text style={{ fontFamily: fonts.OptimaDemiBold, color: "#000", marginHorizontal: 20 }}>{periodDate == "" ? periodDatefrom : periodDate}</Text>
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


            <Text style={[styles.btnTxt, { marginTop: 40 }]}>
              What is the average length of your menstrual cycle
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              }}>
              <TouchableOpacity style={styles.searchBoxView} onPress={() => setshowCycle(!showCycle)}>
                <Text style={{ marginHorizontal: 20 }}>{selectedValue}</Text>
                {/* <Picker
                selectedValue={selectedValue}
               
                style={{ width: '100%',fontFamily:fonts.OptimaDemiBold,fontSize:14}}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:fonts.OptimaDemiBold,fontSize:14 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Cycle Length" value={null} />
                <Picker.Item label="28 Days" value={28} />
                <Picker.Item label="29 Days" value={29} />
                <Picker.Item label="30 Days" value={30} />
                <Picker.Item label="31 Days" value={31} />
                <Picker.Item label="32 Days" value={32} />
                <Picker.Item label="33 Days" value={33} />
                <Picker.Item label="34 Days" value={34} />
                <Picker.Item label="35 Days" value={35} />
              </Picker> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showCycle ?
          <View style={{
            width: "50%", alignSelf: "center", backgroundColor: "#ffffff", marginHorizontal: 20, elevation: 1, marginTop: 5, elevation: 2,
            borderRadius: 20,
            marginBottom: 10,
            backgroundColor: '#ffffff'
          }}>
            {cycleArray.map((item, index) => {
              return (
                <TouchableOpacity style={{ flexDirection: "row", padding: 3, alignSelf: "center", marginTop: index == 0 ? 10 : null, marginBottom: index == 7 ? 10 : null }}
                  onPress={() => { setSelectedValue(item.cycle), setshowCycle(!showCycle) }}>
                  <Text style={{ fontFamily: fonts.OptimaDemiBold, fontSize: 12, color: "#000000" }}>Cycle length is</Text>
                  <Text style={{ fontFamily: fonts.OptimaDemiBold, fontSize: 12, color: "#000000" }}>{"    "}{item.cycle} Days</Text>
                </TouchableOpacity>
              )

            })}
          </View>
          :
          null
        }



        <View style={[styles.btn1]}>
          <Text style={{ fontFamily: fonts.OptimaDemiBold, color: "#000000", lineHeight: 22 }}>This is the disclaimer text in the pregnancy tracker..
            it is also available in the tracker sheet It is important to note that every woman's pregnancy experience
            is different, and you may not experience all of these symptoms. If you have any concerns or questions about
            your symptoms, it is important to talk to your healthcare provider.It is important to note that every woman's
            pregnancy experience is different, and you may not experience all of these symptoms. If you have any concerns
            or questions about your symptoms, it is important to talk to your healthcare provider.
          </Text>
        </View>

        <TouchableOpacity
          // style={styles.joinWebinarBtn} 
          style={{
            backgroundColor: colors.themeColor,
            width: "95%",
            alignSelf: "center",
            borderRadius: 5,
            marginTop: 30,
            marginBottom: 100
          }}
          onPress={submitDate}>
          <Text style={styles.joinWebinarBtnTxt}>Submit</Text>
          {/* <Text style={styles.joinWebinarBtnTxt}>{isLoader != true ? "Submit" : <ActivityIndicator/> }</Text>  */}
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};

export default OvulationTracker;
