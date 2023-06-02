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
    color: colors.blackContent,
    fontSize: 30,
    marginBottom: 20,
  },
  formInputView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  managementImage:{
    width:20,
    height:20,
    resizeMode:"contain",

  },
  dropinput: {
    fontSize: 17,
    fontFamily: fonts.OptimaBold,
    color: colors.inputPlaceHolder,
  },
  signupInput: {
    borderBottomWidth: 0.4,
    width: "86%",
    marginLeft: 12,
    paddingVertical: 5,
    borderBottomColor: colors.grayRegular,
    fontFamily: fonts.OptimaBold,
    color: colors.inputPlaceHolder,
    fontSize: 17,
  },
  termCondition: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  termConditionTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.grayRegular,
    fontSize: 15,
    marginLeft: 12,
    lineHeight: 25,
    marginTop: 15
  },
  termTxt: {
    color: colors.themeColor,
  },
  alreadyAct: {
    fontFamily: fonts.OptimaBold,
    color: colors.grayRegular,
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
    marginTop: 30,
    marginBottom: 30,
  },
  signUpBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 16
  },
});

export default styles;