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
    marginHorizontal: 24,
    marginTop: 40
  },
  signupImg: {
    width: "100%",
    height: 250, resizeMode: 'contain'
  },
  formMainView: {
    marginHorizontal: 35,
    marginTop: 38
  },
  welcmTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 30,
    marginBottom: 6,
  },
  signinTxt: {
    fontFamily: fonts.OptimaBlack,
    color: colors.grayRegular,
    fontSize: 16,
    marginBottom: 20,
  },
  formInputView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  signupInput: {
    borderRadius: 8, paddingHorizontal: 15,
    backgroundColor: colors.grayLight,
    width: "66%", height: 50,
    marginLeft: 20,
    paddingVertical: 5,
    borderBottomColor: colors.grayRegular,
    fontFamily: fonts.OptimaBlack,
    fontWeight: '500',
    color: colors.inputPlaceHolder,
    fontSize: 15,
  },
  countryCode: {
    width: '28%', borderRadius: 8,
    height: 50, paddingHorizontal: 3,
    backgroundColor: colors.grayLight,
    justifyContent: 'center', alignItems: 'center'
  },
  countrytxt: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: fonts.OptimaBlack,
    color: colors.inputPlaceHolder,
  },
  termCondition: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  termConditionTxt: {
    fontFamily: fonts.OptimaRegular,
    color: colors.inputPlaceHolder,
    fontSize: 15,
    marginLeft: 12,
    lineHeight: 25,
    marginTop: 15
  },
  termTxt: {
    color: colors.themeColor,
  },
  alreadyAct: {
    fontFamily: fonts.OptimaRegular,
    color: colors.inputPlaceHolder,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30
  },
  signUpBtn: {
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    padding: 5,
    marginTop: 80,
    marginBottom: 30,
  },
  signUpBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16
  },
});

export default styles;