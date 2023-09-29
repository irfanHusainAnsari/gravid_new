import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {svgs, colors} from '@common';
import styles from './styles';
import Apis from '../../Services/apis';

const TrackerLink = props => {
  const [isLoader, setIsLoader] = useState(false);

  const pregnancyTrackerCall = type => {
    setIsLoader(true);
    Apis.CheckTrackerHistory({type})
      .then(async json => {
            console.log('json>>>..', json)
        if(type == 'pragnancy'){
          if (json.ischeck == true) {
            let resdata = JSON.parse(json?.data?.user_request)
            if(resdata != ""){
              let formdata = new FormData();
              let rewts = '';
              let type =""
              if(resdata?.lmp){
                formdata.append("lmp",resdata?.lmp)
                rewts = resdata?.lmp;
                type="LMP"
              }else{
                formdata.append("edt",resdata?.edt)
                rewts = resdata?.edt;
                type="EDD"
              }
              formdata.append("is_change",resdata?.is_change)
              console.log('formdata1', formdata)
              setIsLoader(true)
              Apis.get_TrackerData(formdata)
                .then(async (json) => {
                    console.log('get_PeriodData ====== ', json);
                    if (json.status == true) {
                      setIsLoader(false)
                      props.navigation.navigate("PregnancyDetail",{json:json,navigateDate:rewts,type:type})
                    } else (json)(
                        Toast.show(json.message, Toast.LONG)
                    )
                }).catch((error) => {
                    console.log("error", error);
                    setIsLoader(false)
                })
          }
          }else{
          props.navigation.navigate("PregnancyTracker")
          }


        }else if(type == 'ovulation'){
          if (json.ischeck == true) {
              let ovulationData = JSON.parse(json?.data?.user_request)
              console.log('ovulationData', ovulationData)

           let formdata = new FormData();
              formdata.append('cycle_length', ovulationData.cycle_length);
              formdata.append('period_startDate', ovulationData.period_startDate);
              formdata.append("is_change",1)
              console.log('formdata1', formdata);
              setIsLoader(true);
              Apis.get_OvulationData(formdata)
                .then(async json => {
                  console.log('get_PeriodData ====== ', json);
                  if (json.status == true) {
                    setIsLoader(false);
                    props.navigation.navigate('OvulationDetail',{data:json.data,lmp:ovulationData.period_startDate,cycle_length:ovulationData.cycle_length});
                  } else json(Toast.show(json.message, Toast.LONG));
                })
                .catch(error => {
                  console.log('error', error);
                  setIsLoader(false);
                });

          }else{
            props.navigation.navigate("OvulationTracker")
          }
        }else if(type == "mood"){
         
      if (json.ischeck == true) {
       
            setIsLoader(true);
            Apis.get_MoodData({})
              .then(async json => {
                console.log('get_MoodData ====== ', json);
                if (json.status == true) {
                  if(json.data[0] == "" || json.data[0] == null ){
                    setIsLoader(false);
                    props.navigation.navigate("MoodTracker")  
                  }else{
                    setIsLoader(false);
                    props.navigation.navigate('MoodTrackerDetail',{data:json?.data,labels:json?.labels});
                    // json(Toast.show(json.message, Toast.LONG));
                  }
                }
              })
              .catch(error => {
                console.log('error', error);
                setIsLoader(false);
              });
            
          }else{
            props.navigation.navigate("MoodTracker")
          }
        }
        
        setIsLoader(false);
      })
      .catch(error => {
        setIsLoader(false);
        console.log('ExpertList', error);
      });
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>Health Trackers</Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
        <View style={styles.mainView}>
          <View>
            <TouchableOpacity
              style={[styles.btn]}
              // onPress={() => props.navigation.navigate('PregnancyTracker')}
              onPress={() => pregnancyTrackerCall('pragnancy')}>
              <View style={styles.imgView}>
                <Image
                  style={styles.btnImg}
                  source={require('../../assets/images/mom.png')}
                />
              </View>
              <Text style={styles.btnTxt}>Pregnancy Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn]}
              // onPress={() => props.navigation.navigate('OvulationTracker')}
              onPress={() => pregnancyTrackerCall('ovulation')}
              >
              <View style={styles.imgView}>
                <Image
                  style={styles.btnImg}
                  source={require('../../assets/images/planning.png')}
                />
              </View>
              <Text style={styles.btnTxt}>Ovulation Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn]}
              // onPress={() => props.navigation.navigate('MoodTracker')}
              onPress={() => pregnancyTrackerCall('mood')}
              >
              <View style={styles.imgView}>
                <Image
                  style={styles.btnImg}
                  source={require('../../assets/images/planning.png')}
                />
              </View>
              <Text style={styles.btnTxt}>Mood Tracker</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackerLink;
