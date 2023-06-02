import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  haddingView: {
    backgroundColor: colors.themeColor,
    paddingTop: 16,
    paddingBottom: 40,
    flexDirection: "row",
    paddingHorizontal: 24,
    // alignItems: "center",
    // justifyContent: "center"
  },
  haddingTxt: {
    flex: 3,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32
  },
  child: {
    // justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 20,
    flexDirection: "row"
  },
  radiusView: {
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    marginTop: -30,
  },
  tabView: {
    // position:"absolute",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  WebinarActiveBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.themeColor,
    justifyContent: "center",
    alignItems: "center"
  },
  WebinarInactiveBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.themeColor
  },
  WebinarActiveBtnTxt: {
    fontFamily: fonts.OptimaMedium,
    color: colors.black,
    fontSize: 16,
    lineHeight: 24
  },
  WebinarInactiveBtnTxt: {
    fontFamily: fonts.OptimaMedium,
    color: colors.themeColor,
    fontSize: 16,
    lineHeight: 24
  },
  signupImg: {
    width: 54,
    height: 54
  },
  headingText: {
    marginLeft: 8
  },
  pregnantBack: {
    paddingTop: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 70,
    paddingHorizontal: 16
  },
  subscribeTxt: {
    fontFamily: fonts.OptimaDemiBold,
    color: colors.black,
    fontSize: 18,
    lineHeight: 24
    // marginBottom: 20,
  },
  paidType: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    position: "absolute",
    backgroundColor: colors.themeColor,
    top: 4,
    left: 4,
    borderRadius: 13
  },
  wifiCon: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    position: "absolute",
    backgroundColor: colors.white,
    top: 4,
    right: 4,
    borderRadius: 13
  },
  paidTypeTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },
  subscribeBtn: {
    // paddingHorizontal: 22,
    paddingVertical: 9,
    borderWidth: 2,
    borderColor: colors.themeColor,
    borderRadius: 15,
    // flex: 1,
    width: 150,
    marginTop: 32,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  subscribeBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
  },
  userName: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    // marginBottom: 20,
  },
  searchBoxView: {
    backgroundColor: colors.grayLight,
    marginHorizontal: 24,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16
  },
  searchBox: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
    marginLeft: 6,
    paddingRight: 12,
    height: 45
  },
  subscribeOfferImg: {
    width: "100%",
    height: 210,
    marginTop: 20
  },
  sliderHadding: {
    marginHorizontal: 24,
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  haddingTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
  },
  viewAllBtn: {
    borderWidth: 1,
    borderColor: colors.themeColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewAllTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },
  currenIssueView: {
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFC",
    alignItems: "center"
  },
  leftView: {
    width: width - 200,
    paddingLeft: 18,
    paddingVertical: 12,
  },
  isFreeView: {
    backgroundColor: colors.themeColor,
    // paddingHorizontal: 16,
    paddingVertical: 4,
    width: "30%",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  isFree: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },
  issuetitle: {
    marginTop: 8,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 13,
    lineHeight: 17
  },
  issueDes: {
    marginTop: 5,
    fontFamily: fonts.OptimaRegular,
    color: colors.gray,
    fontSize: 13,
    lineHeight: 16
  },
  issueImg: {
    width: width / 3,
    height: width / 3
  },
  NewsLetterView: {
    width: width / 2 - 20,
    marginRight: 12,
    backgroundColor: "#F9FAFC",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 16,
    // flex: 1
  },
  newsleftView: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    // borderWidth:1
  },
  newsImg: {
    width: width / 2,
    height: width / 2
  },
  bkmrkBtn: {
    flexDirection: "row",
    // marginTop: 12,
    alignItems: "center",
    // justifyContent: "center"
  },
  bkmrkBtnTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.gray,
    fontSize: 12,
    lineHeight: 17,
    marginLeft: 4
  },
  bkmrkIcn: {
    // backgroundColor: colors.white,
    // padding: 6,
    borderRadius: 100
  },
  endView: {
    marginHorizontal: 24,
    marginVertical: 35
  },
  endImg: {
    width: "100%",
    height: 122,
    borderRadius: 10
  },
  modalMainView: {
    marginHorizontal: 24,
    backgroundColor: "black"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  offHadding: {
    // fontFamily: fonts.OptimaBold,
    fontWeight: '700',
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    textAlign: "center",
    marginHorizontal: 20
  },
  offDes: {
    fontWeight: '800',
    color: colors.themeColor,
    fontSize: 30,
    marginTop: 16,
    textAlign: "center"
  },
  offType: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 48,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 100
  },
  digitalReading: {
    marginTop: 10,
    width: 250,
    height: 176
  },
  gravidTime: {
    marginTop: 18,
    marginHorizontal: 36,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    height: 35,
    paddingVertical: 9,
    paddingHorizontal: 7,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
    lineHeight: 24,
    borderRadius: 5
  },
  priceView: {
    flexDirection: "row",
    marginHorizontal: 36,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    marginTop: 6,
    marginBottom: 45,
    borderRadius: 5
  },
  gravidPrice: {
    flex: 3,
    height: 35,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
  },
  gravidSelect: {
    flex: 1,
    height: 35,
    borderLeftWidth: 1,
    borderLeftColor: "#D8D8D8",
    textAlign: "center",
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
  },
  submitBtn: {
    marginTop: 30,
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 50,
    alignSelf: 'center',
    alignItems: "center",
    width: 169, height: 45,
    justifyContent: 'center',
    borderColor: colors.themeColor,
  },
  submitBtnTxt: {
    fontFamily: fonts.OptimaMeduim,
    fontWeight: '500',
    color: colors.themeColor,
    fontSize: 15,
  },
  talkBubbleTriangleRight: {
    position: "absolute",
    left: 80,
    bottom: -20,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: colors.themeColor,
    borderBottomWidth: 20,
    borderBottomColor: "transparent",
  },
  talkBubbleTriangleLeft: {
    position: "absolute",
    left: 70,
    bottom: -20,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: colors.themeColor,
    borderBottomWidth: 20,
    borderBottomColor: "transparent",
  },
  webinarTitle: {
    marginVertical: 16,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16,
  },
  webinarDes: {
    fontFamily: fonts.OptimaDemiBold,
    color: colors.gray,
    fontSize: 12,
    lineHeight: 18.
  },
  joinWebinarBtn: {
    backgroundColor: colors.themeColor,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  joinWebinarBtnTxt: {
    fontFamily: fonts.OptimaMedium,
    color: colors.black,
    fontSize: 20,
    paddingVertical: 14,
    alignSelf:"center"
  },
  datetext:{
    marginHorizontal:25,
    fontFamily:fonts.OptimaBold,
    fontSize:16,
    color: colors.black,
    marginBottom:15,
  },
  calFlatList:{
    borderWidth:1,
    borderColor:"#F1F1F1",
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:10,
    marginLeft:10,
    marginRight:10,
    fontFamily:fonts.OptimaBold,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeContainerFirst: {
    width: '48%',
    borderWidth: 0.5,
    borderColor: '  #E3E3E3',
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTextTitleColor: {
    color: '#6D7A90',
  },
  dateTimeContainerTo: {
    width: '48%',
    borderWidth: 0.5,
    borderColor: '  #E3E3E3',
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTextTitleColor: {
    color: '#6D7A90',
  },
});

export default styles;