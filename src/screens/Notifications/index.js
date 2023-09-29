import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {styles} from './style';
import Apis from '../../Services/apis';
import fonts from '../../common/fonts';
import { useIsFocused } from '@react-navigation/native';

const Notifications = (props) => {
  const isFocused = useIsFocused();
  const [isLoader, setIsLoader] = useState(false)
  const [notificationData, setNotificationData] = useState("")
  console.log('notificationData', notificationData)
  // var date = new Date(date);
  // var year = date.toLocaleString('default', {year: 'numeric'});
  // var monthh = date.toLocaleString('default', {month: '2-digit'});
  // var day = date.toLocaleString('default', {day: '2-digit'});
  // var formattedDate = day + '/' + monthh + '/' + year;
  // var newFormateDate = year+"-" + monthh +"-"+day

  useEffect(() => {
      getNotification();
  }, [isFocused])

  const getNotification = () => {
    setIsLoader(true);
    Apis.getNotificationData({})
      .then(async (json) => {
        console.log('getNotificationData',json.data);
        if (json.status == true) {
            setNotificationData(json?.data)
        }
        setIsLoader(false);
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false);
      })
  }

  const readNotification = (id) => {
    const params = {
      id:id,
    };
    setIsLoader(true);
    Apis.getreadNotification(params)
      .then(async (json) => {
        console.log('getreadNotification',json.data);
        if (json.status == true) {
          Apis.getNotificationData({})
          .then(async (json) => {
            console.log('getNotificationData',json.data);
            if (json.status == true) {
                setNotificationData(json?.data)
            }
            setIsLoader(false);
          }).catch((error) => {
            console.log("error", error);
            setIsLoader(false);
          })
        }
        setIsLoader(false);
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false);
      })
  }
  if (isLoader) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const NotificationsData = ({item}) => {
  var date = new Date(item?.created_at);
  var year = date.toLocaleString('default', {year: 'numeric'});
  var monthh = date.toLocaleString('default', {month: '2-digit'});
  var day = date.toLocaleString('default', {day: '2-digit'});
  var hours= date.getHours('default', {day: '2-digit'});
  var minuts= date.getMinutes('default', {day: '2-digit'});
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  console.log('minutes', minutes)
  
  var formattedDate = day + '/' + monthh + '/' + year;
  
    return (
      <TouchableOpacity style={styles.cardColorContainer} onPress={()=>readNotification(item?.id)}>
        <View style={styles.imageCard}>
          <View style={styles.notificationsImageContainer}>
            <Image
              style={styles.notificationsImage}
              source={require('../../assets/images/bell.png')}
            />
          </View>
        </View>
        <View style={styles.notificationsText}>
          <Text style={styles.textNotificationColor}>
            {item.message}
          </Text>
          <Text style={styles.textTimeNotificationcolor}>
            {item.textTimeNotification}
          </Text>
          <Text style={{fontFamily:fonts.OptimaMedium,fontSize:12}}>{formattedDate}   {hours}:{minutes} {ampm}</Text>         
        </View>
       
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerIconContainer}
                          onPress={()=>props.navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require("../../assets/images/headerIcon.png")}
          />
        </TouchableOpacity>
        <View style={styles.headerCenterContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <View style={styles.headerView}></View>
      </View>
      <View style={styles.mainFlexContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={notificationData}
            keyExtractor={item => item.id}
            renderItem={NotificationsData}
            ItemSeparatorComponent={() => (
              <View style={{borderWidth: 0.3, borderColor: '#ccc'}} />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Notifications;
