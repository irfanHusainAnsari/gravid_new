import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { styles } from './style';
import Apis from '../../Services/apis';
import fonts from '../../common/fonts';
import CommonHeader from '../../component/CommonHeader';
import LoaderRow from '../../component/LoaderRow';

const Notifications = (props) => {
  const [isLoader, setIsLoader] = useState(true)
  const [notificationData, setNotificationData] = useState("")
  console.log('notificationData', notificationData)
  useEffect(() => {
    getNotification();
  }, [])
  const getNotification = () => {
    setIsLoader(true);
    Apis.getNotificationData({})
      .then(async (json) => {
        console.log('getNotificationData', json.data);
        if (json.status == true) {
          setNotificationData(json?.data)
        }
        setIsLoader(false);
      }).catch((error) => {
        console.log("error", error);
        setIsLoader(false);
      })
  }
  const NotificationsData = ({ item }) => {
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
          <Text style={{ fontFamily: fonts.OptimaMedium, fontSize: 12 }}>{item.created_at}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <CommonHeader
        HeaderTitle={"Notification"}
        navigation={() => props.navigation.goBack()} />
        <View style={styles.mainFlexContainer}>
        {isLoader ?
        <LoaderRow />
        :
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={notificationData}
              keyExtractor={item => item.id}
              renderItem={NotificationsData}
              ItemSeparatorComponent={() => (
                <View style={{
                  borderWidth: 0.3,
                  borderColor: '#ccc'
                }} />
              )}
            />
          </ScrollView>}
        </View>
      
    </View>
  );
};
export default Notifications;
