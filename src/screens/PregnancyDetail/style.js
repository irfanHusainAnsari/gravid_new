import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#edd2c5"
  },
  haddingView: {
    position:"relative",
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

  radiusView: {
    marginTop: -25,
    borderRadius: 40,
    backgroundColor: colors.white,
    paddingTop:50
  
   
    
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
gravidTime: {
  height: 34,
  fontSize: 14,
  margin: 15,
  lineHeight: 24,
  borderWidth: 1,
  borderRadius: 5,
  paddingVertical: 0,
  color: colors.black,
  paddingHorizontal: 7,
  borderColor: "#D8D8D8",
  fontFamily: fonts.OptimaBold,
  width: 260, alignSelf: 'center',
},
submitBtn: {
  // height: 35,
  width: 178,
  borderWidth: 1,
  borderRadius: 5,
  marginTop:15,
  paddingVertical:9,
  alignSelf: "center",
  alignItems: 'center',
  borderColor: colors.themeColor,
},
submitBtnTxt: {
  fontFamily: fonts.OptimaBold,
  color: colors.black,
  fontSize:16,
}
});

export default styles;