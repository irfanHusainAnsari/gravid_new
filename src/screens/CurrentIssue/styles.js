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
  borderview: {
    backgroundColor: "white", paddingHorizontal: 6,
    paddingTop: 30, paddingBottom: 100, borderRadius: 40,
    marginTop: -30
  },
  NewsLetterView: {
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderWidth: 0.4,
    borderColor: "#00000029",
    borderBottomWidth: 3,
    borderBottomColor: "#00000010",
    alignItems: "center",
    borderRadius: 5,
    width: width / 2 - 20,
  },
  newsleftView: {
    paddingBottom: 9,
    paddingHorizontal: 12,
  },
  newsImg: {
    width: width / 2 - 21,
    height: 170,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    resizeMode:'contain'
  },
  bkmrkBtn: {
    flexDirection: "row",
    alignItems: "center"
  },
  bkmrkBtnTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
    lineHeight: 17,
    marginLeft: 4
  },
  downloadmanview: {
    flexDirection: "row",
    justifyContent: "space-between", marginTop: 14,
  },
  bkmrkIcn: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 100
  },
  issuetitle: {
    marginTop: 20,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16,
    lineHeight: 17
  },
  issueDes: {
    marginTop: 8,
    fontFamily: fonts.OptimaBold,
    color: colors.gray,
    fontSize: 10,
    // lineHeight: 16,

  },
  isFreeView: {
    backgroundColor: colors.themeColor,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 13,
    alignSelf: "flex-start",
    marginTop:5
  },
  isFree: {
    fontFamily: fonts.OptimaRegular,
    color: colors.black,
    fontSize: 10,
  },

});

export default styles;