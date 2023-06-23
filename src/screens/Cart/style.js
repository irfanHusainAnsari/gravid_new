import {StyleSheet} from 'react-native';
import {svgs, colors, fonts} from '@common';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headersContainer: {
    backgroundColor: '#FA8981',
    paddingHorizontal: 13,
    height: 100,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    // flex:1
  },
  headerIcons: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  colorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -40,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentImage: {
    marginTop:5
    // backgroundColor: '#E3E3E3',
    // borderRadius: 8,
    // height: 110,
    // width: '100%',
  },
  appointmentText: {
    color: '#6D7A90',
    fontSize: 14,
    marginBottom: 2,
    fontFamily:fonts.OptimaDemiBold
  },
  one1Text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily:fonts.OptimaDemiBold
  },
  localTimeText: {
    color: '#000',
  },
  time: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelImageCOntainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boderContainer: {
    borderWidth: 0.5,
    borderColor: '#E3E3E3',
    marginTop: 15,
    marginBottom: 10,
  },
  couponContainer: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponCodeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    height:40,
    width:"70%",
  },
  buttonApply: {
    backgroundColor: '#FA8981',
    borderRadius:15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 25,
  },
 
  subtotalContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subtotalTitleText: {
    color: '#000',
    fontSize: 16,
  },
  countButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FA8981',
    borderRadius:10,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    color: '#000',
    fontFamily:fonts.OptimaBold
  },
  buttonBookNow: {
    backgroundColor: '#FA8981',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // marginBottom: 40,
  },
  buttonTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTitles: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  
});
