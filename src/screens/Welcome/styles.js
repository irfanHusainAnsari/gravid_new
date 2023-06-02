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
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 120
  },
  welcmTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.blackContent,
    marginHorizontal: 24,
    fontSize: 30,
    marginTop: 53,
    textAlign: "center"
  },
  btnMainView: {
    marginHorizontal: 35,
    marginTop: 38
  },
  signUpBtn: {
    backgroundColor: colors.themeColor,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    padding: 5,
    marginBottom: 30,
    borderWidth: 1
  },
  signUpBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16
  },
  signInBtn: {
    // backgroundColor: colors.themeColor,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    padding: 5,
    marginBottom: 30,
    borderWidth: 1,
    borderColor:colors.themeColor
  },
  signInBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.themeColor,
    fontSize: 16
  }
});

export default styles;