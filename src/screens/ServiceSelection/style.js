import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { fonts, colors } from "@common";
// const { width } = Dimensions.get('window');
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
        justifyContent: 'space-between'
    },
    haddingTxt: {
        fontFamily: fonts.OptimaBold,
        color: colors.black,
        fontSize: 18,
    },
    radiusView: {
        height: 30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
        marginTop: -30,
    },
    touchableOpacity: {
      borderWidth: 1,
      borderColor: '#E3E3E3',
      height:50,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop: 10
  },
  dropdownImage: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
      tintColor: '#6D7A90'
  },
  buttonBookNow: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.themeColor,
    paddingVertical: 12,
    marginBottom: 24,
    borderRadius: 6
},
buttonTitle: {
  fontFamily: fonts.OptimaBold,
  color: colors.black,
  fontSize: 18,
},
  })

  export default styles;