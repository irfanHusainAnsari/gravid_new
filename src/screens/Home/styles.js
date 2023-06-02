import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  child: {
    
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 20,
    flexDirection: "row",
    
    
  },
  signupImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15,
   
  },
  notification:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headingText: {
    marginLeft: 13,
    flex:4
    
  },
  discount: {
    height: 100,
    width: 100,
    borderRadius: 20
  },
  hello: {
    fontFamily: fonts.OptimaBold,
    color: colors.grayRegular,
    fontSize: 16,
    // marginBottom: 20,
  },
  bookanddo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    alignSelf: 'center'
  },
  userName: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.OptimaBold,
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
    height: 45, width: 315
  },
  subscribeOfferImg: {
    width: "100%",
    height: 210,
    resizeMode: 'contain',
    // marginTop: 20,
  },
  gravidimg: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: "40%",
    marginTop: 10,
  },
  yearlydis: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 20,
    fontFamily: fonts.OptimaBlack,
    marginTop: 10,
  },
  destxt: {
    fontSize: 12,
    marginTop: 5,
    color: colors.gray,
    marginHorizontal: 20,
    fontFamily: fonts.OptimaDemiBold,
    lineHeight: 16,
  },
  subscribeBtn: {
    width: 125,
    height: 35,
    marginTop: 10,
    borderWidth: 1.5,
    marginLeft: 35,
    borderRadius: 10 / 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.themeColor,
  },
  subscribeBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
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
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewAllTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },
  currenIssueView: {
    marginRight: 15,
    flexDirection: "row",
    backgroundColor: "#F9FAFC",
  },
  leftView: {
    paddingLeft: 18,
    paddingVertical: 12,
  },
  isFreeView: {
    backgroundColor: colors.themeColor,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 13,
    alignSelf: "flex-start"
  },
  isFree: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },
  issuetitle: {
    marginTop: 10,
    lineHeight: 17,
    color: colors.black,
    fontFamily: fonts.OptimaBold,
    fontSize: 13,
    width: 200,
    // alignSelf: 'center',
  },
  issueDes: {
    fontSize: 10,
    marginTop: 8,
    // lineHeight: 16,
    color: colors.gray,
    fontFamily: fonts.OptimaBold,
    width: 190,
    // alignSelf: 'center',
  },
  issueImg: {
    width: width / 3,
    height: width / 3,
    resizeMode: "contain"
  },
  NewsLetterView: {
    marginRight: 15,
    backgroundColor: "#F9FAFC",
    alignItems: "center",
    borderRadius: 5,
  },
  NewsLetterView2: {
    marginRight: 15,
    backgroundColor: "#F9FAFC",
    alignItems: "center",
    borderRadius: 5,
  },
  newsleftView: {
    paddingBottom: 12,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  newsImg: {
    width: width / 2,
    height: 100,
    borderRadius: 10 / 2,
    resizeMode: 'contain'
  },
  bkmrkBtn: {
    flexDirection: "row",
    alignItems: "center"
  },
  bkmrkBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 12,
    lineHeight: 17,
    marginLeft: 4,
  },
  bkmrkIcn: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 100
  },
  endView: {
    marginHorizontal: 24,
    marginVertical: 20,
    // marginTop:20,
    height: 200
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
    fontSize: 16,
    lineHeight: 24,
    marginTop: 5,
    textAlign: "center"
  },
  offDes: {
    fontFamily: fonts.OptimaBold,
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    textAlign: "center"
  },
  offType: {
    fontFamily: fonts.OptimaBold,
    color: colors.lightblack,
    fontSize: 38,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 5,
    lineHeight: 100
  },
  digitalReading: {
    marginTop: 5,
    width: 235, height: 166,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  gravidTime: {
    height: 34,
    fontSize: 14,
    marginTop: 15,
    lineHeight: 24,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 0,
    color: colors.black,
    paddingHorizontal: 7,
    borderColor: "#D8D8D8",
    fontFamily: fonts.OptimaBold,
    width: 260, alignSelf: 'center',
  },
  priceView: {
    height: 34,
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 45,
    flexDirection: "row",
    borderColor: "#D8D8D8",
    width: 260, alignSelf: 'center',
    // backgroundColor:'#fdfefe'
  },
  gravidPrice: {
    flex: 2,
    height: 34,
    paddingVertical: 0,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
  },
  gravidSelect: {
    flex: 1,
    height: 33,
    fontSize: 14,
    paddingVertical: 0,
    borderLeftWidth: 1,
    color: colors.black,
    textAlign: "center",
    borderLeftColor: "#D8D8D8",
    fontFamily: fonts.OptimaBold,
  },
  submitBtn: {
    height: 35,
    width: 178,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 40,
    paddingVertical: 9,
    alignSelf: "center",
    alignItems: 'center',
    borderColor: colors.themeColor,
  },
  submitBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
  }
});

export default styles;