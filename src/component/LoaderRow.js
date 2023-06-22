import React from 'react';
import {Text,ActivityIndicator, View} from 'react-native';

const LoaderRow = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size="small" />
  </View>
  );
};

export default LoaderRow;