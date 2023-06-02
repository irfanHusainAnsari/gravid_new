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
  // signupImg2: {
  //   width: "100%",
  //   height: 250, resizeMode: 'contain'
  // },
  formMainView: {
    // marginHorizontal: 35,
    marginTop: 38,
    marginBottom: 20
  },
  welcmTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 29,
    marginBottom: 6,
    textAlign: "center"
  },
  signinTxt: {
    textAlign:"center",
    fontFamily: fonts.OptimaBlack,
    color: colors.grayRegular,
    fontSize: 16,
    marginBottom: 20,
    // textAlign: "center",
    marginTop: 10,
    lineHeight: 25
  },
  formInputView: {
    flex:1,
    alignItems: "center",
    marginVertical: 8,
  },
  signupInput: {
    borderBottomWidth: 0.4,
    width: "86%",
    marginLeft: 12,
    paddingVertical: 5,
    borderBottomColor: colors.grayRegular,
    fontFamily: fonts.OptimaRegular,
    color: colors.inputPlaceHolder,
    fontSize: 18,
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
    fontFamily: fonts.OptimaBlack,
    color: colors.grayRegular,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20
  },
  signUpBtn: {
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    padding: 5,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal:35
  },
  signUpBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16
  },
  otpBox: {
    width: '80%',
    height: 50,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    // borderWidth: 1,
    borderRadius: 5, fontSize: 20,
    backgroundColor: colors.grayLight,
    color: colors.blackContent,
    fontFamily: fonts.OptimaDemiBold,
    fontWeight: '700',
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  shownumder: {
    bottom: '11%', right: 34,
    fontWeight: '500',
    color: colors.black,
    fontSize: 16, alignSelf: 'flex-end',
  }
});

export default styles;