import react from "react";
import { View, Text, Image, TouchableOpacity, TextInput ,ScrollView} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import { svgs, colors } from '@common';

const List_of_Docters = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.haddingView}>
                <TouchableOpacity style={{ flex: 3 }} onPress={() => navigation.goBack()}>
                    {svgs.backArrow("black", 24, 24)}
                </TouchableOpacity>
                <Text style={styles.haddingTxt}>List of Docters</Text>
                <View style={{ flex: 3 }} />
            </View>
            <View style={styles.radiusView} />
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>

            </ScrollView>
        </View>
    )
}
export default List_of_Docters;