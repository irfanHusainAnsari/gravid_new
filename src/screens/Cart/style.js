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
  },
  appointmentText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 2,
    fontFamily:fonts.OptimaDemiBold,
    marginTop:7
  },
  one1Text: {
    color: '#6D7A90',
    fontSize: 14,
    fontFamily:fonts.OptimaDemiBold,
    marginTop:5
  },
  localTimeText: {
    color: '#000',
  },
  time: {
    color: '#6D7A90',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelImageCOntainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boderContainer: {
    borderTopWidth: 0.5,
    borderColor: '#E3E3E3',
    marginTop: 15,
    marginBottom: 10,
  },
  couponContainer: {
    backgroundColor: '#F9FAFC',
    borderRadius: 8,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20,
    borderWidth:.5,
    borderColor:"#e8e6e6",
    height:45,
    marginBottom:25,
  },
  couponCodeText: {
    color: '#000',
    fontSize:14,
    fontFamily:fonts.OptimaDemiBold,
    width:"70%",
  },
  buttonApply: {
    backgroundColor: '#FA8981',
    borderTopEndRadius:4,
    borderBottomEndRadius:4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height:45,
  },
 
  subtotalContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:5,
  },
  subtotalTitleText: {
    color: '#6D7A90',
    fontSize: 14,
    fontFamily:fonts.OptimaDemiBold
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
    fontFamily:fonts.OptimaBold,
  },
  buttonBookNow: {
    backgroundColor: '#FA8981',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  buttonTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily:fonts.OptimaBold
  },
  buttonTitles: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  
});
