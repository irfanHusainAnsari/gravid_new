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
      
        // paddingBottom: 40,
        // flexDirection: "row",
        // paddingHorizontal: 24,
        // alignItems: "center",
        // justifyContent: "center"
    },
    haddingTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 18,
        marginVertical:10,
        alignSelf:"center"
    },
    radiusView: {
        height: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: 0,
    },
    backgroundVideo: {
      marginTop:10,
    //   borderWidth:5,
    //   borderColor:"black",
      width:"90%",
      alignSelf:"center",
      },
})
export default styles;