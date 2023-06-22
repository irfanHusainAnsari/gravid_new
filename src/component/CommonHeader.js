
import React from 'react';
import { Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, View } from 'react-native';
import { svgs,fonts, colors } from '@common';
const CommonHeader = ({ icon, HeaderTitle, navigation, shareicon, handleSharePdf }) => {
  return (
    <View style={styles.headerContainer}>
      {icon == "icon" ?
        <View style={styles.headerIconContainer}></View>
        :
        <TouchableOpacity style={styles.headerIconContainer}
          onPress={navigation}>
          <Image
            style={styles.headerIcon}
            source={require("../assets/images/headerIcon.png")}
          />
        </TouchableOpacity>}
      <View style={styles.headerCenterContainer}>
        <Text style={styles.headerTitle}>{HeaderTitle}</Text>
      </View>
      {shareicon ?
        <TouchableOpacity style={styles.headerView} onPress={handleSharePdf}>
          {svgs.share("black", 24, 24)}
        </TouchableOpacity> :
        <View style={styles.headerView} />
      }
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    backgroundColor: '#FA8981',
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 100,
    alignItems: 'flex-start',
  },
  headerIconContainer: {
    flex: 1,
  },
  headerCenterContainer: {
    flex: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontFamily: fonts.OptimaBold,
    color: colors.black,
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  headerView: {
    flex: 1,
  },
});
export default CommonHeader;