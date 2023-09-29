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
  },
  haddingTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32
  },
  mainView: {
    marginTop: -32,
    borderRadius: 40,
    backgroundColor: colors.white,
    paddingTop: 45
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFC"
  },
  btnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 22,
    lineHeight: 32
  },
  imgView: {
    borderWidth: 0.3,
    borderColor: colors.themeColor,
    borderRadius: 100,
    padding: 10,
    marginRight: 24,
    backgroundColor: colors.white
  },
  btnImg: {
    width: 38,
    height: 38
  },
  signUpBtn: {
    backgroundColor: colors.themeColor,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    padding: 5,
    marginTop: 70,
    marginBottom: 30,
    marginHorizontal: 50
  },
  signUpBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16
  },
  rightimg: {
    height: 15,
    width: 18,
    resizeMode: 'contain',
  },
  rightbg: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 0,
    right: 23,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  edittext: {
    fontSize: 16,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
  },
  editview: {
    flexDirection: "row",
    backgroundColor: "#F8E3DA",
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center"
  },
});

export default styles;