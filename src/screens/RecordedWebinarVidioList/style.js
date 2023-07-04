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
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between"
  },
  haddingTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
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

    flex: 1
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
    marginTop: -20,
  },
  empty:{
    alignSelf:"center",
    fontSize:15,
    marginTop:300,
    color:"black",
    fontWeight:"bold"
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
  NewsLetterView: {
    width: width / 2 - 20,
    marginRight: 5,
    backgroundColor: "#F9FAFC",
    // backgroundColor: "red",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 16,
    marginHorizontal:5
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
  thembimg:{
    borderRadius:5,
    position:"absolute",
    top:50,
    alignSelf:"center",
    height: 40,
    width: 40,
    resizeMode:"cover"
  }
});

export default styles;