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
    height: 110,
    paddingTop: 16,
    paddingBottom: 40,
    // flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    // justifyContent: 'center'
  },
  haddingTxt: {
    flex: 3,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32,
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
    height: 45, 
    width: 315,

    flex:1
  },
  child: {
    // justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 20,
    flexDirection: "row"
  },
  radiusView: {
    height: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -60,
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
    // marginTop: 18,
    // paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pregnantBack2: {

    paddingHorizontal: 16,
  },
  subscribeTxt: {
    color: colors.black,
    fontSize: 16, fontWeight: '500',
    lineHeight: 24,

  },
  paidType: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    position: "absolute",
    top: 4,
    backgroundColor: colors.themeColor,
    left: 4,
    borderRadius: 13
  },
  wifiCon: {
    paddingVertical: 6,
    paddingHorizontal: 6,
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
    width: 145,
    height: 40,
    marginTop: 32,
    borderWidth: 1.5,
    marginBottom: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.themeColor,
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
    marginTop:-20,
    marginBottom:20,
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
    marginTop: 5,
    fontFamily: fonts.OptimaRegular,
    color: colors.gray,
    fontSize: 13,
    lineHeight: 17,
    paddingHorizontal:5
  },
  issueDes: {
    marginTop: 5,
    fontFamily: fonts.OptimaDemiBold,
    color: colors.gray,
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal:5
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
    paddingHorizontal: 5, width: 175
    // borderWidth:1
  },
  newsImg: {
    width: width / 4 + 60,
    height: width / 4.3 + 40,
    borderRadius: 10 / 2, marginTop: 10,
    resizeMode: 'contain',
  },
  bkmrkBtn: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
    // justifyContent: "center"
  },
  bkmrkBtnTxt: {
    fontFamily: fonts.OptimaDemiBold,
    color: colors.gray,
    fontSize: 12,
    lineHeight: 17,
    marginLeft: 4
  },
  bkmrkIcn: {
    borderRadius: 100
  },
  endView: {
    marginHorizontal: 24,
    marginVertical: 40,
    height:200
  },
  endImg: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode:"contain"
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
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
    textAlign: "center"
  },
  offDes: {
    fontFamily: fonts.OptimaRegular,
    color: colors.gray,
    fontSize: 18,
    lineHeight: 24,
    marginTop: 18,
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
    marginBottom: 50,
    paddingVertical: 9,
    marginHorizontal: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 5
  },
  submitBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
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
  }
});

export default styles;