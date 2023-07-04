import {StyleSheet} from 'react-native';
import fonts from '../../common/fonts';
import colors from '../../common/colors';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FA8981',
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 100,
    alignItems: 'flex-start',
  },
  headerIconContainer: {
    flex: 1,
  },
  headerCenterContainer: {
    flex: 2,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  headerView: {
    flex: 1,
  },
  mainFlexContainer: {
    flex: 1,
    backgroundColor:colors.grayLight,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  stylestoDayText: {
    color: '#1C2F50',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
  },
  stylestoDay:{
    color: '#1C2F50',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  cardColorContainer: {
    backgroundColor: '#F9FAFC',
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  imageCard: {
    // flex: 2,
  },
  notificationsImage: {
    width:20,
    height:20,
    resizeMode: 'contain',
  },
  notificationsImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  notificationsText: {
    flex: 1,
    marginLeft: 15,
  },
  textNotificationColor: {
    color: '#1C2F50',
    fontSize: 14,
    fontFamily:fonts.OptimaMedium
  },
  textTimeNotificationcolor: {
    color: '#6D7A90',
    marginTop: 2,
    fontSize: 13,
  },
});
