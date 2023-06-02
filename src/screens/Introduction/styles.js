import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  introTitle: {
    fontSize: 24,
    marginTop: 34,
    marginBottom: 14,
    textAlign: "center",
    marginBottom: 10,
    color: colors.themeColor,
    fontFamily: fonts.OptimaBold,
  },
  text: {
    fontSize: 12,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 24,
    color: colors.grayIntrod,
    fontFamily: fonts.OptimaBold,
  },
  sliderimage: {
    height: 302,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    width: 307,
  },
  activedot: {
    backgroundColor: colors.themeColor,
    marginBottom: '80%',
    width: 20,
  },
  dot: {
    backgroundColor: '#F8E3DA',
    marginBottom: '80%'
  },
  btnMainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 80
    // position:'relative',
    // top:80
  },
  skipBtn: {
    // padding: 5
    bottom: 49, width: 345,
  },
  skipBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.gray,
    marginHorizontal: 24,
    fontSize: 18
  },
  nextBtnTxt: {
    fontFamily: fonts.OptimaBold,
    color: colors.themeColor,
    marginHorizontal: 24,
    fontSize: 18
  },
});

export default styles;