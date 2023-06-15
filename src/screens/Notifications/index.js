import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {styles} from './style';
import Apis from '../../Services/apis';
import fonts from '../../common/fonts';

const Notifications = (props) => {
  const [isLoader, setIsLoader] = useState(false)
  const [notificationData, setNotificationData] = useState("")
  console.log('notificationData', notificationData)
  useEffect(() => {
      getNotification();
  }, [])

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


  const NotificationsData = ({item}) => {
    return (
      <View style={styles.cardColorContainer}>
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
          <Text style={{fontFamily:fonts.OptimaMedium,fontSize:12}}>{item.created_at}</Text>
         
        </View>
       

      </View>
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
