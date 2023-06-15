import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  FlatList
} from 'react-native';
import styles from './style';
import {svgs, colors,fonts} from '@common';
import Apis from '../../Services/apis';
import RenderHtml from 'react-native-render-html';
const {width, height} = Dimensions.get('window');
import {imageurl} from '../../Services/constants';
import {useIsFocused} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-simple-toast';

const ExpertListDetail = props => {
  const minDate = new Date(); // Today
  const month = minDate.getMonth();
  const maxDate = new Date(2023, month + 1, 30);
  // const taxDataitem = parseInt((taxData?.gst/100)*cartData?.amount)
  // const totalAmount = taxDataitem+cartData?.amount
  const isFocused = useIsFocused();
  const expertDetail = props?.route?.params?.item;
  const [detail, setDetail] = useState('');
  const [expert, setExpert] = useState(true);
  const [openCloseCalendar, setOpenCloseCalendar] = useState(false);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItem2, setSelectedItem2] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [dates, setDates] = useState(null);
  const [dateforcartsave, setdateforcartsave] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [taxData, setTaxData] = useState("");
  const [cartData, setCartData] = useState("")
  const [cartOpen, setCartOpen] = useState(false);

  console.log('taxData', taxData)
  console.log('cartData', cartData)
  console.log('timeSlot', timeSlot)
  useEffect(() => {
    ExpertListDetailData();
  }, [isFocused]);

  const ExpertListDetailData = () => {
    const params = {
      id: expertDetail?.id,
    };
    Apis.expert_detail(params)
      .then(async json => {
        if (json.status == true) {
          setDetail(json.data);
        }
      })
      .catch(err => {
        console.log('errrr form_data', err);
      });
  };

  const onPressBookNow =()=>{
        setExpert(false);
        setOpenCloseCalendar(true);
  }
  const onDateChange = date => {
    var date = new Date(date);
    var year = date.toLocaleString('default', {year: 'numeric'});
    var monthh = date.toLocaleString('default', {month: '2-digit'});
    var day = date.toLocaleString('default', {day: '2-digit'});
    var formattedDate = day + '/' + monthh + '/' + year;
    var newFormateDate = year+"-" + monthh +"-"+day
    console.log('objectformattedDate', newFormateDate);
    setdateforcartsave(newFormateDate)
    setDates(formattedDate);

    const params = {
      id: detail?.id,
      date: date,
    };
    console.log('params', params);
    Apis.SendDateWebinar(params).then(async json => {
      console.log('SendDateWebinar', json)
      if (json.status == true) {
        setTimeSlot(json?.data);
      }
    });
  };

  const customDatesStylesCallback = date => {
    switch (date.isoWeekday()) {
      case 1: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#E3E3E3',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };

      case 2: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 3: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 4: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };

      case 5: // Monday
        return {
          style: {
            // backgroundColor: '#F1F1F1',
            borderColor: '#FE887E',
            borderRadius: 100,
            borderWidth: 1,
          },
          textStyle: {
            color: '#FE887E',
            fontWeight: 'bold',
          },
        };
      case 6: // Saturday
        return {
          style: {
            backgroundColor: '#E3E3E3',
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };
      case 7: // Sunday
        return {
          style: {
            backgroundColor: '#E3E3E3',
            // borderRadius:100,
            // borderWidth:1,
          },
          textStyle: {
            color: '#6D7A90',
            fontWeight: 'bold',
          },
        };
    }
  };

  const onPressContinue = () => {
    console.log('selectedItem1', selectedItem1)
    if(selectedItem1 == ""){
      alert("please select a time slot")
    }else{
      let form_data = new FormData();
      form_data.append("data_id",detail?.id);
      form_data.append("expert_id",detail?.id);
      form_data.append("amount", detail?.amount);
      form_data.append("sloat_date", dateforcartsave);
      form_data.append("slot_from", selectedItem1);
      form_data.append("slot_to", selectedItem2);
      form_data.append("type", "expert");
      console.log('form_data', form_data)
      Apis.getCartPostSaveData(form_data).then(async data => {
        console.log('data', data)
        if(data.status == true){
          console.log('object', data)
          Toast.show(data?.message, Toast.LONG)
          setIsLoader(true);
          Apis.getCartData({})
            .then(async (json) => {
              console.log('json++++123', json)
              if (json.status == true) {
                  setCartData(json?.data[0])
                  setTaxData(json?.taxData)
              }
              setIsLoader(false);
            }).catch((error) => {
              console.log("error", error);
              setIsLoader(false);
            })
          setProgramDetailItem(false);
          setOpenCloseCalendar(false)
          setCartOpen(true)
        }else{
          Toast.show(data?.message, Toast.LONG)
        }
      }).catch((err)=>{console.log("errrr form_data" , err);})
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
        {expert == true ? (
          <Text style={styles.haddingTxt}>Expert</Text>
        ) : openCloseCalendar == true ? (
          <Text style={styles.haddingTxt}>Date & Time</Text>
        ) : cartOpen == true ? (
          <Text style={styles.haddingTxt}>Cart</Text>
        ) : null}
        <View style={{flex: 3}} />
      </View>
      <View style={styles.radiusView} />


      {expert &&
        <ScrollView
        style={{paddingHorizontal: 16}}
        showsVerticalScrollIndicator={false}>
        <View style={{position: 'absolute', right: 10, top: 190, zIndex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{}} onPress={() => console.log('object')}>
              <Image
                source={require('../../assets/images/call.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <View style={{width: 10}} />

            <TouchableOpacity style={{}}>
              <Image
                source={require('../../assets/images/videoCall.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.ScreenshotImage}
          source={{uri: imageurl + expertDetail.file}}
        />

        <Text style={styles.contributorText}>{expertDetail.name}</Text>
        <RenderHtml
          contentWidth={width}
          source={{html: expertDetail.description}}
        />
        <TouchableOpacity
          style={styles.bookNowBtn}
          onPress={
                onPressBookNow
            // () => props.navigation.navigate('ServiceSelection')
            // Linking.openURL('https://gravidparenting.com/consultation')
          }>
          <Text style={styles.bookNowBtnTxt}>Book Now</Text>
        </TouchableOpacity>
        {/* <Text style={styles.loremText}>{ExpertDetail.description}</Text> */}
      </ScrollView> }
      
      {openCloseCalendar && (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <ScrollView style={{}}>
            <Text style={[styles.haddingTxt, {paddingHorizontal: 20}]}>
              Date & Time
            </Text>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              firstDay={1}
              customDatesStyles={customDatesStylesCallback}
              customDayHeaderStyles={() => {
                return {
                  textStyle: {color: '#FE887E', opacity: 1, fontWeight: 'bold'},
                };
              }}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              onDateChange={onDateChange}
              todayBackgroundColor="#FE887E"
            />
            <View
              style={{
                borderBottomColor: '#E3E3E3',
                borderWidth: 1,
                marginHorizontal: 20,
                marginVertical: 15,
                opacity: 0.1,
              }}
            />
            <Text style={styles.datetext}>{dates}</Text>
            <View style={{marginHorizontal: 1}}>
              <FlatList
                data={timeSlot}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={{alignItems: 'center'}}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if(item.id){
                            setSelectedSlotId(item.id)
                            setSelectedItem1(item.slot_form);
                            setSelectedItem2(item.slot_to);
                          }else{

                          }
                         
                        }}>
                        <Text
                          style={{
                            borderWidth: 1,
                            borderColor: '#F1F1F1',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            fontFamily: fonts.OptimaBold,
                            backgroundColor:
                            selectedSlotId == item.id
                                ? colors.themeColor
                                : null,
                          }}>
                          {item.slot_form} - {item.slot_to}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.joinWebinarBtn, {marginHorizontal: 20}]}
            // onPress={() => setModalVisible(true)}
            // onPress={()=>props.navigation.navigate("Cart")}
            onPress={onPressContinue}
            >
            <Text style={styles.joinWebinarBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

    
    </View>
  );
};

export default ExpertListDetail;
