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
    // alignItems: "center",
    // justifyContent: "center"
  },
  haddingTxt: {
    flex: 5,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32,
  },
  child: {
    // justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 20,
    flexDirection: "row"
  },
  radiusView: {
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    marginTop: -30,
  },

})

export default styles;