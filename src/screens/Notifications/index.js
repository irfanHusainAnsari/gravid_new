import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {styles} from './style';
import {NotificationsContainerData} from '../../Common/FlatList';

const Notifications = (props) => {
  const NotificationsContainerData = [
    {
      id: 1,
      NotificationImage: require('../../assets/images/bell.png'),
      textNotification: 'Appointment confirmed',
      textTimeNotification:
        'Your Appointment with Dr. Mahmud Nik is confirmed. he will call you at 11 : 00 AM | 3 May, 2023',
    },
    {
      id: 2,
      NotificationImage: require('../../assets/images/bell.png'),

      textNotification: 'Appointment confirmed',
      textTimeNotification:
        'Your Appointment with Dr. Mahmud Nik is confirmed. he will call you at 11 : 00 AM | 3 May, 2023',
    },
    {
      id: 3,
      NotificationImage: require('../../assets/images/bell.png'),

      textNotification: 'Appointment confirmed',
      textTimeNotification:
        'Your Appointment with Dr. Mahmud Nik is confirmed. he will call you at 11 : 00 AM | 3 May, 2023',
    },
    {
      id: 4,
      NotificationImage: require('../../assets/images/bell.png'),

      textNotification: 'Appointment confirmed',
      textTimeNotification:
        'Your Appointment with Dr. Mahmud Nik is confirmed. he will call you at 11 : 00 AM | 3 May, 2023',
    },
  ];




  const NotificationsData = ({item}) => {
    return (
      <View style={styles.cardColorContainer}>
        <View style={styles.imageCard}>
          <View style={styles.notificationsImageContainer}>
            <Image
              style={styles.notificationsImage}
              source={item.NotificationImage}
            />
          </View>
        </View>
        <View style={styles.notificationsText}>
          <Text style={styles.textNotificationColor}>
            {item.textNotification}
          </Text>
          <Text style={styles.textTimeNotificationcolor}>
            {item.textTimeNotification}
          </Text>
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
          <Text style={styles.stylestoDayText}>Today - 3 May, 2023</Text>

          <FlatList
            data={NotificationsContainerData}
            keyExtractor={item => item.id}
            renderItem={NotificationsData}
            ItemSeparatorComponent={() => (
              <View style={{borderWidth: 0.3, borderColor: '#ccc'}} />
            )}
          />
          <Text style={styles.stylestoDay}>Today - 3 May, 2023</Text>
          <FlatList
            data={NotificationsContainerData}
            keyExtractor={item => item.id}
            renderItem={NotificationsData}
            ItemSeparatorComponent={() => (
              <View style={{borderWidth: 0.3, borderColor: '#ccc'}} />
            )}
            contentContainerStyle={{marginBottom: 30}}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Notifications;
