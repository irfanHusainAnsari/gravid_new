import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  // CheckBox
} from 'react-native';
import {svgs, colors, fonts} from '@common';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-simple-toast';
import Apis from '../../Services/apis';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
const MoodTracker = props => {
  const isFocused = useIsFocused();
  const [selectedValue, setSelectedValue] = useState('0');
  const [activityValue, setActivityValue] = useState(''); //Activity
  const [sessionValue, setSessionValue] = useState('No');
  const [medicineValue, setMedicineValue] = useState('No');
  const [healthValue, setHealthValue] = useState('');   //healt
  const [isLoader, setIsLoader] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
  const [nightmare,setNightmare]= useState("")
  
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
  const [insomnia,setInsomnia]= useState("")

  const [toggleCheckBox3, setToggleCheckBox3] = useState(false)
  const [restless,setRestless]= useState("")
  const [sleepValue,setSleepValue]=useState("") //slepp
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false)
  const [toggleCheckBox5, setToggleCheckBox5] = useState(false)
  const [mood,setMood]=useState("")
  const [date, setDate] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [sleepTime,setSleepTime]=useState("Sleep Time")
  const [sleepApi,setSleepApi]=useState("")
  const [wakeUpTime,setWakeUpTime]=useState("Wake Up Time")
  const [wakeUpApi,setWakeUpApi]=useState("Wake Up Time")
  const [sleep,setSleep]=useState("")
  const [sleepDescription,setSleepDescription]=useState("test data")
 
  const [selected, setSelected] =useState([]);
  const [selectedHealth, setSelectedHealth] =useState([]);
  const data = [
    {key:'1', value:'Exercise'},
    {key:'2', value:'Walking'},
    {key:'3', value:'Yoga'},
    {key:'4', value:'HIIT'},
    {key:'5', value:'GYM'},
    {key:'6', value:'Others'},
    {key:'7', value:'Breakfast'},
    {key:'8', value:'Bathing'},
    {key:'9', value:'Office work'},
    {key:'10', value:'Lunch'},
    {key:'11', value:'Playing with kids'},
    {key:'12', value:'Family time'},
    {key:'13', value:'Social life'},
    {key:'14', value:'Meeting with friends'},
    {key:'15', value:'Drinking'},
    {key:'16', value:'TV time'},
    {key:'17', value:'Leaisure time'},
    {key:'17', value:'Dinner'},
    {key:'17', value:'Reading'},
    {key:'17', value:'Smoking'},
    {key:'17', value:'Travel to work'},
    {key:'17', value:'Holiday'},
]

const healthData = [
  {key:'1', value:'Headache'},
  {key:'2', value:'Backache'},
  {key:'3', value:'Sugar'},
  {key:'4', value:'BP'},
  {key:'5', value:'Stomach'},
  {key:'6', value:'Sche'},
  {key:'7', value:'Constipation'},
  {key:'8', value:'Diareahh'},
  {key:'9', value:'Nausea'},
  {key:'10', value:'Other'},
 
]

const sleepData=[
  {key:'1', value:'Nightmare'},
  {key:'2', value:'Insomnia'},
  {key:'3', value:'Restless'},
]

  const selectDatePeriodDelivery = (type,date) => {
    if (type == 'sleep') {
      console.log('date', date)
      let year = date.toLocaleString('default', {year: 'numeric'});
      let monthh = date.toLocaleString('default', {month: '2-digit'});
      let day = date.toLocaleString('default', {day: '2-digit'});
      let formattedDate = year + '-' + monthh + '-' + day;
      var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var ne = hours + ":" + minutes +":"+ seconds
      setSleepApi(formattedDate+" "+ne)
      // console.log('object', formattedDate+" "+ne)
      var am_pm = date.getHours() >= 12 ? "PM" : "AM";
      let time = hours + ":" + minutes + ":" + am_pm;
      setSleepTime(time)
    } 
    else if(type == "wakeup"){
      let year = date.toLocaleString('default', {year: 'numeric'});
      let monthh = date.toLocaleString('default', {month: '2-digit'});
      let day = date.toLocaleString('default', {day: '2-digit'});
      let formattedDate = year + '-' + monthh + '-' + day;
      var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      var am_pm = date.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var ne = hours + ":" + minutes +":"+ seconds
      setWakeUpApi(formattedDate+" "+ne)
      let time = hours + ":" + minutes + ":" + am_pm;
      setWakeUpTime(time)
    }
    };
 
  const WATER_IMAGE = require('../../assets/images/bell.png')

 const ratingCompleted=(rating)=> {
    console.log("Rating is: " + rating)
  }
const onSubmit =()=>{
  if(mood == ""){
    Toast.show("Please Select Mood", Toast.LONG);
  }else if(sleepTime == "Sleep Time"){
    Toast.show("Please Select Sleep Time", Toast.LONG);
  }else if(wakeUpTime == "Wake Up Time"){
    Toast.show("Please Select Wake Up Time Time", Toast.LONG);
  }else if(sleep == ""){
    Toast.show("Please Select How was your Sleep", Toast.LONG);

  }else if(selectedValue == "Screen Time in Hour"){
    Toast.show("Please Select Screen Time", Toast.LONG);
  }else if(activityValue == "Select Activity"){
    Toast.show("Please Select Activity", Toast.LONG);
  }
  // else if(healthValue == "Health"){
  //   Toast.show("Please Select Health", Toast.LONG);
  // }
  else if(sessionValue == "Select Activity"){
    Toast.show("Please Select Session", Toast.LONG);
  }else if(medicineValue == "Select Activity"){
    Toast.show("Please Select medicine", Toast.LONG);
  }else{
    let formdata = new FormData();
    formdata.append('mood', mood);
    formdata.append('sleep_time', sleepApi);
    formdata.append('wakeup_time', wakeUpApi);
    formdata.append('sleep_rating', sleep);
    formdata.append('sleep_desc', sleepValue);
    formdata.append('screen_time', selectedValue);
    formdata.append('yesterday_activity', activityValue);
    formdata.append('health', healthValue);
    formdata.append('session', sessionValue);
    formdata.append('yesturday', "test");
    formdata.append('taking_medicines', medicineValue);

    console.log('formdata', formdata)
    setIsLoader(true);
    Apis.moodTrackerStore(formdata)
      .then(async json => {
        console.log('moodTrackerStore ====== ', json);
        if (json.status == true) {
          setIsLoader(false);
          Apis.get_MoodData({})
          .then(async json => {
            console.log('get_MoodData ====== ', json);
            if (json.status == true) {
              setIsLoader(false);
              props.navigation.navigate('MoodTrackerDetail',{data:json?.data,labels:json?.labels});
            } else{
              json(Toast.show(json.message, Toast.LONG));
            } 
          })
          .catch(error => {
            console.log('error', error);
            setIsLoader(false);
          });
          // props.navigation.navigate('OvulationDetail',{data:json.data,lmp:ovulationData.period_startDate});
        } else json(Toast.show(json.message, Toast.LONG));
      })
      .catch(error => {
        console.log('error', error);
        setIsLoader(false);
      });

  }
  
}
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>My Mood</Text>
        <Text style={styles.haddingTxt}></Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
      <View style={{flex:1}}>
        <View style={{flex:1,alignItems:"center"}}>
            <Text style={{fontFamily:fonts.OptimaBold,fontSize:18,color:"#000"}}>Tell us how was your yesterday!!</Text>
        </View>
        <View style={{flex:1,alignItems:"center",marginTop:20,marginHorizontal:20, elevation: 3,
              borderRadius:10,
              marginBottom:5,
              backgroundColor: '#ffffff',
              padding:15}}>
            <Text style={{fontFamily:fonts.OptimaDemiBold,marginBottom:15,fontSize:16,color:"#000"}}>How was your mood</Text>
            <View style={{flex:1}}>
            <Rating
              type='heart'
              startingValue={0}
              ratingImage={WATER_IMAGE}
              onFinishRating={(data)=>setMood(data)}
              />
            </View>
        </View>

        <View style={{flex:1,
              marginTop:20,marginHorizontal:20, elevation:3,
              borderRadius:10,
              marginBottom:5,
              backgroundColor: '#ffffff',
              padding:15}}>
            <Text style={styles.btnTxt}>
            How much time did you sleep
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              }}>
            
              <View style={styles.searchBoxView}>
                <Text style={{fontFamily:fonts.OptimaDemiBold, color:"#000",marginHorizontal:10}}>{sleepTime}</Text>
              </View>
              <DatePicker
                modal
                mode="datetime"
                open={open1}
                date={date}
                // maximumDate={maximumDate}
                onConfirm={date => {
                  setOpen1(false);
                  selectDatePeriodDelivery('sleep', date);
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
              <View style={[styles.searchBoxView,{marginLeft:20}]}>
                <Text style={{fontFamily:fonts.OptimaDemiBold, color:"#000",marginHorizontal:10}}>{wakeUpTime}</Text> 
              </View>
              <DatePicker
                modal
                mode="datetime"
                open={open2}
                date={date}
                // maximumDate={maximumDate}
                onConfirm={date => {
                  setOpen2(false);
                  selectDatePeriodDelivery('wakeup', date);
                }}
                onCancel={() => {
                  setOpen2(false);
                }}
              />
              <TouchableOpacity onPress={() => setOpen2(true)}>
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

       

        

        <View style={{flex:1,alignItems:"center",marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
            <Text style={{fontFamily:fonts.OptimaDemiBold,marginBottom:15,fontSize:16,color:"#000"}}>How was your sleep</Text>
            <View style={{flex:1}}>
            <Rating
              type={'star'}
              startingValue={0}
              reviews={false}
             
               onFinishRating={(data)=>setSleep(data)}
              />
            </View>
        </View>

         {/* <View style={{flex:1,marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
            <Text style={{fontFamily:fonts.OptimaDemiBold,marginBottom:15,fontSize:16,color:"#000",alignSelf:"center"}}>Describe your sleep</Text>
     
            <View style={styles.checkboxContainer}>
            <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => {setToggleCheckBox1(newValue),setNightmare("Nightmare")}}
               
              />
              <Text style={styles.label}>Nightmare</Text>
            </View>

            <View style={styles.checkboxContainer}>
            <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => {setToggleCheckBox2(newValue),describeSleepArray.push("Insomnia")}}
              />
              <Text style={styles.label}>Insomnia</Text>
            </View>

            <View style={styles.checkboxContainer}>
            <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={(newValue) => {setToggleCheckBox3(newValue),describeSleepArray.push("Restless")}}
              />
              <Text style={styles.label}>Restless</Text>
            </View>
        </View> */}

        
<View style={{marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
           <Text style={[styles.btnTxt,{marginBottom:30}]}>
           Describe your sleep
          </Text>   
        <MultipleSelectList 
        setSelected={(val) => setSleepValue(val)}
        data={sleepData} 
        save="value"
        onSelect={() => console.log('object', selected)} 
        label="Categories"
        boxStyles={{  backgroundColor: "#F9FAFC",
        borderColor:"#E1E3E7",
        borderWidth:0.5,
        borderRadius: 15,
        }}
        maxHeight={1000}
        inputStyles={{fontSize:16,color:"#000000",}}
        labelStyles={{color:"#000000"}}
        dropdownTextStyles={{color:"#000000"}}
        dropdownItemStyles={{color:"#000000"}}
    />
    </View>

        <View style={{flex:1,alignItems:"center",marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
          <Text style={styles.btnTxt}>
          How many hours of screen time
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={styles.searchBoxView}>
              <Picker
                selectedValue={selectedValue}
                style={{ width: '100%',fontFamily:fonts.OptimaDemiBold,fontSize:14}}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:fonts.OptimaDemiBold,fontSize:14 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="00 Hour" value={0} />
                <Picker.Item label="01 Hour" value={1} />
                <Picker.Item label="02 Hour" value={2} />
                <Picker.Item label="03 Hour" value={3} />
                <Picker.Item label="04 Hour" value={4} />
                <Picker.Item label="05 Hour" value={5} />
                <Picker.Item label="06 Hour" value={6} />
                <Picker.Item label="07 Hour" value={7} />
                <Picker.Item label="08 Hour" value={8} />
                <Picker.Item label="09 Hour" value={9} />
                <Picker.Item label="10 Hour" value={10} />
                <Picker.Item label="11 Hour" value={11} />
                <Picker.Item label="12 Hour" value={12} />
                <Picker.Item label="13 Hour" value={13} />
                <Picker.Item label="14 Hour" value={14} />
                <Picker.Item label="15 Hour" value={15} />
                <Picker.Item label="16 Hour" value={16} />
                <Picker.Item label="17 Hour" value={17} />
                <Picker.Item label="18 Hour" value={18} />
                <Picker.Item label="19 Hour" value={19} />
                <Picker.Item label="20 Hour" value={20} />
                <Picker.Item label="21 Hour" value={21} />
                <Picker.Item label="22 Hour" value={22} />
                <Picker.Item label="23 Hour" value={23} />
                <Picker.Item label="24 Hour" value={24} />
              </Picker>
            </View>
          </View>
        </View>
    
        <View style={{marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
           <Text style={[styles.btnTxt,{marginBottom:30}]}>
          What activities did you do yesterday
          </Text>   
        <MultipleSelectList 
        setSelected={(val) => setActivityValue(val)}
        data={data} 
        save="value"
        onSelect={() => console.log('object', selected)} 
        label="Categories"
        boxStyles={{  backgroundColor: "#F9FAFC",
        borderColor:"#E1E3E7",
        borderWidth:0.5,
        borderRadius: 15,
        }}
        maxHeight={1000}
        inputStyles={{fontSize:16,color:"#000000",}}
        labelStyles={{color:"#000000"}}
        dropdownTextStyles={{color:"#000000"}}
        dropdownItemStyles={{color:"#000000"}}
    />
    </View>

    <View style={{marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
           <Text style={[styles.btnTxt,{marginBottom:30}]}>
           How was your health
          </Text>   
        <MultipleSelectList 
        setSelected={(val) => setHealthValue(val)} 
        data={healthData} 
        save="value"
        onSelect={() => console.log('object', selectedHealth)} 
        label="Categories"
        boxStyles={{  backgroundColor: "#F9FAFC",
        borderColor:"#E1E3E7",
        borderWidth:0.5,
        borderRadius: 15,
       
        // flex:1,
        }}
        maxHeight={1000}
        inputStyles={{fontSize:16,color:"#000"}}
        labelStyles={{color:"#000000"}}
        dropdownTextStyles={{color:"#000000"}}
        dropdownItemStyles={{color:"#000000"}}
    />
    </View>

        <View style={{flex:1,alignItems:"center",marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
          <Text style={styles.btnTxt}>
          Therapy or Counseling Sessions(If applicable)
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={styles.searchBoxView}>
              <Picker
                selectedValue={sessionValue}
                style={{ width: '100%',fontFamily:fonts.OptimaDemiBold,fontSize:14}}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:fonts.OptimaDemiBold,fontSize:14 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSessionValue(itemValue)
                }>
                <Picker.Item label="No" value={"No"} />
                <Picker.Item label="Yes" value={"Yes"} />
                
               
              </Picker>
            </View>
          </View>
        </View>



        <View style={{flex:1,alignItems:"center",marginTop:10,marginHorizontal:20, elevation:2,
              borderRadius:10,
              marginBottom:10,
              backgroundColor: '#ffffff',
              padding:15}}>
          <Text style={styles.btnTxt}>
          Are you taking medicines
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={styles.searchBoxView}>
              <Picker
                selectedValue={medicineValue}
                style={{ width: '100%',fontFamily:fonts.OptimaDemiBold,fontSize:14}}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:fonts.OptimaDemiBold,fontSize:14}}
                onValueChange={(itemValue, itemIndex) =>
                  setMedicineValue(itemValue)
                }>
                <Picker.Item label="No" value={"No"} />
                <Picker.Item label="Yes" value={"Yes"} />
                
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
                style={styles.joinWebinarBtn}
                onPress={onSubmit}
              >
                <Text style={styles.joinWebinarBtnTxt}>Submit</Text>
              </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
};

export default MoodTracker;
