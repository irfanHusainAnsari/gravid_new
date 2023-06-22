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
        height: 120,
        paddingTop: 16,
        // paddingBottom: 40,
        // flexDirection: "row",
        paddingHorizontal: 24,
        alignItems: "center",
        // justifyContent: 'center'
      },
      haddingTxt: {
        flex: 3,
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 20,
        textAlign: "center",
        // lineHeight: 32,
      },
      searchBoxView: {
        backgroundColor: colors.grayLight,
        marginHorizontal: 24,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop:-30
      },
      searchBox: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 14,
        marginLeft: 6,
        paddingRight: 12,
        height: 45, 
        width: 315,
    
        flex:1
      },
      radiusView: {
        height: 60,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -60,
      },
      NewsLetterView: {
        width: width / 2 - 20,
        marginRight: 12,
        backgroundColor: "#F9FAFC",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 16,
        // flex: 1
      },
      newsImg: {
        width: width / 4 + 60,
        height: width / 4.3 + 40,
        borderRadius: 10 / 2, marginTop: 10,
        resizeMode: 'contain',
      },
      paidType: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        position: "absolute",
        top: 4,
        backgroundColor: colors.themeColor,
        left: 4,
        borderRadius: 13
      },
      paidTypeTxt: {
        fontFamily: fonts.OptimaRegular,
        color: colors.black,
        fontSize: 10,
      },
      newsleftView: {
        paddingBottom: 12,
        paddingHorizontal: 5, width: 175
        // borderWidth:1
      },
      issuetitle: {
        marginTop: 5,
        fontFamily: fonts.OptimaRegular,
        color: colors.gray,
        fontSize: 13,
        lineHeight: 17,
        paddingHorizontal:5
      },
      issueDes: {
        marginTop: 5,
        fontFamily: fonts.OptimaDemiBold,
        color: colors.gray,
        fontSize: 12,
        lineHeight: 16,
        paddingHorizontal:5
      },
   
})
export default styles;