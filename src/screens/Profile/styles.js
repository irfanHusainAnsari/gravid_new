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
    alignItems: "center",
    justifyContent: "center"
  },
  haddingTxt: {
    flex: 3,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32
  },
  edittext: {
    fontSize: 12,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
  },
  editview: {
    flexDirection: "row", backgroundColor: "#F8E3DA",
    alignSelf: "flex-end", paddingVertical: 6,
    paddingHorizontal: 16, borderRadius: 16,
    alignItems: "center"
  },
  profileimg: {
    width: 126,
    height: 126,
    resizeMode: 'contain',
    borderRadius: 70
  },
  radiusView: {
    paddingTop: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -30,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    marginLeft: 14,
    // fontWeight: 'bold',
    color: colors.black,
    fontFamily: fonts.OptimaBold,
    // fontFamily: fonts.OptimaBold,
  },
  activerow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35, marginTop: 6
  },
  Activetxt: {
    fontSize: 13,
    marginHorizontal: 4,
    color: colors.black,
    fontFamily: fonts.OptimaBold,
    // fontFamily:fonts.OptimaBold
  },
  activeimg: {
    borderRadius: 10,
    height: 8, width: 8,
    resizeMode: 'contain',
  },
  borderWi: {
    borderWidth: 0.5,
    marginTop: 30
  },
  flatlistimage: {
    height: 23, width: 20, resizeMode: 'contain',tintColor:colors.themeColor,
  },
  manFlat: {
    justifyContent: 'space-between',
    alignItems: 'center', flexDirection: 'row',
    marginTop: 30,
  },
  accountxt: {
    fontSize: 15,
    color: colors.black,
    marginLeft: 20,
    fontFamily: fonts.OptimaBold,
  },
  arrowicon: {
    width: 7,
    height: 15,
    resizeMode: 'contain'
  },
  mansignbtn: {
    width: 150,
    height: 45,
    marginTop: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.themeColor,
  },
  Signimg: {
    width: 21, height: 21, resizeMode: 'contain',
  },
  signtext: {
    fontSize: 16,
    color: colors.black,
    marginHorizontal: 10,
    fontFamily: fonts.OptimaBold,

  },
});

export default styles;