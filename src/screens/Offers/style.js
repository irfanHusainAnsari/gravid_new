import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
import { refresh } from '@react-native-community/netinfo';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  haddingView: {
    backgroundColor: colors.themeColor,
    paddingTop: 16,
    paddingBottom: 40,
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center"
  },
  haddingTxt: {
    flex: 3,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32
  },
  mainView: {
    marginTop: -30,
    borderRadius: 39,
    backgroundColor: colors.white,
    paddingTop: 45,
    paddingHorizontal: 4
  },
  NewsLetterView: {
    // width:width/2.3,
    // height:160,
    marginHorizontal:9,
    marginVertical:5,
    // marginBottom: 16,
    borderRadius: 20,
    borderWidth:1,
    borderColor:colors.themeColor,
   

  },
  newsImg: {
    width:width/2.3,
    height:160,
    resizeMode:"contain",
    borderRadius: 20,
  },
  newsleftView: {
    // marginTop:8,
    // backgroundColor:"red"
  },
  blogTitleTime: {
    fontFamily: fonts.OptimaBold,
    color: "#808080",
    fontSize: 16,
    lineHeight: 18,
    marginTop: 10
  },
  issuetitle: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
    lineHeight: 18,
    marginTop: 10
  },
 
  issueDes: {
    // flex: 3,
    // backgroundColor:'red',
    width: 200,
    fontSize: 11,
    lineHeight: 18,
    color: "#929397",
    fontFamily: fonts.OptimaDemiBold,
  },
  manflatlistview: {
    backgroundColor: "#FAFAFA",
    paddingHorizontal:6,
    paddingTop: 30,
    borderRadius: 40,
    marginTop: -30,
    flex: 1
  },
  
  endView: {
   
    marginHorizontal:24,
    marginVertical: 20,
    height: 200
  },
  endImg: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode:"contain",
  },
});

export default styles;