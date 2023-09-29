import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBox: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
    marginLeft: 6,
    paddingRight: 12,
    height: 45, width: 315
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
  cart:{
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor:"white"
  },
  haddingTxt: {
    flex: 3,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize:18,
    textAlign: "center",
    // lineHeight:25,
    
  },
  radiusView: {
    height: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -60,
  },
  mainView: {
    marginTop: -30,
    borderRadius: 39,
    backgroundColor: colors.white,
    paddingTop: 45,
    paddingHorizontal: 4
  },
  NewsLetterView: {
    backgroundColor: "#F9FAFC",
    flex:1,
    marginBottom: 16,
    padding: 10,
    backgroundColor:colors.grayLight,
    borderRadius: 10,
  },
  blogTitleTime: {
    fontFamily: fonts.OptimaBold,
    color: "#808080",
    fontSize: 16,
    lineHeight: 18,
    marginTop: 10
  },
  issuetitle: {
    fontFamily: fonts.OptimaMedium,
    color: colors.black,
    fontSize: 14,
    // lineHeight:0,
    marginTop: 10,
    textAlign: "center",
  },
  searchBoxView: {
    backgroundColor: "#F9FAFC",
    borderColor:"#E1E3E7",
    borderWidth:0.5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
    flex:1
  },
  newsleftView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red"
  },
  issueDes: {
    flex: 1,
    fontSize: 11,
    lineHeight: 18,
    color: "#929397",
    fontFamily: fonts.OptimaDemiBold,
    alignSelf: "center",
    textAlign: "center"
  },
  manflatlistview: {
    backgroundColor: "#ffffff",
    // paddingHorizontal: 6,
    flex: 1
  },
  newsImg: {
    flex:1,
    width: width / 2.8,
    height: width / 2.8,
    marginTop: 5,
    resizeMode: "contain",    // width: "100%",
    alignSelf: "center",
    borderRadius: 100
  },
  endView: {
    marginHorizontal: 24,
    marginVertical: 20,
    height: 200
  },
  endImg: {
    width: "100%",
    height: 180,
    borderRadius: 10
  },
});

export default styles;