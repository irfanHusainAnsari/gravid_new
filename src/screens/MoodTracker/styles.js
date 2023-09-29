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
    fontSize: 18,
  },
  mainView: {
    marginTop: -32,
    borderRadius: 40,
    backgroundColor: colors.white,
    paddingTop: 45,
 
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom:10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
 
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#F9FAFC",
    
  },
  btn1: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 10,
    backgroundColor: "#F9FAFC",
    height:150,
    
    
  },
  btnTxt: {
    flex:1,
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize:16,
    lineHeight:22,
    textAlign: 'center',
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
  searchBox: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
    marginLeft: 6,
    paddingRight: 12,
    height: 45,
    flex:1
  }, 
  searchBox1: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 14,
    marginLeft: 6,
    paddingRight: 12,
   
  }, 
    searchBoxView: {
    backgroundColor: "#F9FAFC",
    borderColor:"#E1E3E7",
    borderWidth:0.5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    flex:1,
    height:40
  },
  joinWebinarBtn: {
    backgroundColor: colors.themeColor,
    marginTop: 50,
    marginBottom: 100,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal:20
  },
  joinWebinarBtnTxt: {
    fontFamily: fonts.OptimaMedium,
    color: colors.black,
    fontSize: 20,
    paddingVertical: 11,
    alignSelf:"center"
  },
});

export default styles;