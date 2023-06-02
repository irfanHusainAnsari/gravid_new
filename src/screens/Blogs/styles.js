import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
import { refresh } from '@react-native-community/netinfo';
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
    marginHorizontal: 8,
    marginBottom: 16,
    padding: 10,
    backgroundColor: colors.white,
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
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
    lineHeight: 18,
    marginTop: 10
  },
  newsleftView: {
    flexDirection: "row",
    marginTop: 16
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
    paddingHorizontal: 6,
    paddingTop: 30,
    borderRadius: 40,
    marginTop: -30,
    flex: 1
  },
  newsImg: {
    // flex: 2,
    width: 145,
    height: 118,
    marginTop: 5,
    resizeMode:"contain",    // width: "100%",
  },
  endView: {
    marginHorizontal: 24,
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