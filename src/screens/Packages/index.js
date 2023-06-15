import react, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions,ScrollView } from "react-native";
import styles from "./style";
import fonts from "../../common/fonts";
// import { ScrollView } from "react-native-gesture-handler";

const Packages = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <Text style={styles.haddingTxt}>Packages</Text>
                <View style={styles.radiusView} />
            </View>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontFamily:fonts.OptimaBlack,color:"#000",fontSize:18}}>There is no Packages</Text>
            </View>
        </View>

    )
}
export default Packages 


