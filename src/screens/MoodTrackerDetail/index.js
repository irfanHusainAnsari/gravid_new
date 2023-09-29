import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {svgs, colors} from '@common';
import styles from './styles';
import Apis from '../../Services/apis';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import RenderHtml from 'react-native-render-html';
const MoodTrackerDetail = (props) => {
  console.log('props', props.route.params)
  const {data} = props?.route?.params
  const {labels} = props?.route?.params
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")

  console.log('title', title)
  const [isLoader, setIsLoader] = useState(false);


const dataPointClick = (data)=>{
      if(data != ""){
       let params ={
        tip_no:data
       }
       setIsLoader(true)
       setTitle("")
       setDescription("")
        Apis.moodTrackerTips(params)
                .then(async (json) => {
                    console.log('mood-tracker-tips ====== ', json);
                    if (json.status == true) {
                        setIsLoader(false)
                        setTitle(json.data[0].title)
                        // setDescription(JSON.parse(json.data[0].description))
                        setDescription(json.data[0].description)
                    } else{
                      setIsLoader(false);
                        Toast.show(json.message, Toast.LONG)  
                  }
                }).catch((error) => {
                    console.log("error", error);
                    // setIsLoader(false)
                })
    
}
}
  
  // render
  return (
    <View style={styles.container}>
      <View style={styles.haddingView}>
        <TouchableOpacity
          style={{flex: 3}}
          onPress={() => props.navigation.goBack()}>
          {svgs.backArrow('black', 24, 24)}
        </TouchableOpacity>
        <Text style={styles.haddingTxt}>My Mood</Text>
        <View style={{flex: 3}} />
      </View>

      <View style={styles.radiusView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>

      

        <View style={{flex: 1,alignSelf:"center"}}>
          <LineChart
           
            data={{
              labels:labels,
              datasets: [
                {
                  data: data,
                },
              ],
            }}
            onDataPointClick={data =>dataPointClick(data?.value)}
            width={Dimensions.get('window').width-20} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            // bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={{marginBottom:20}}>
          <TouchableOpacity style={styles.editview} onPress={() => { props.navigation.navigate('MoodTracker') }}>
            <Text style={styles.edittext}>How was your Yesterday?</Text>
          </TouchableOpacity>
        </View>
        {isLoader == true ? 
            <View
              style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          : 
            // <View style={{paddingHorizontal:20}}>
            // <Text>{title}</Text>
            // <Text>{description}</Text>
            // </View>
            <View style={{paddingHorizontal:20}}>
              <RenderHtml
              // contentWidth={width}
              source={{html: title}}
              />
               <RenderHtml
              // contentWidth={width}
              source={{html: description}}
              />
              </View>       
          }
      
       
      </ScrollView>
    </View>
  );
};

export default MoodTrackerDetail;
