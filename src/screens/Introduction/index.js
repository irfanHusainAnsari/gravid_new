/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Apis from '../../Services/apis';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import { imageurl } from '../../Services/constants';
// import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
// const imageurl = "https://rasatva.apponedemo.top/gravid/"
const { width, height } = Dimensions.get('window')
const Introduction = (props) => {
  const [showslider, setShowSlider] = useState(true)

  const [introductionlist, setIntroduction] = useState([])
  useEffect(() => {
    Welcomescreendata()
  }, [])

  const Welcomescreendata = () => {
    const params = {
      
    }
    Apis.Welcomescreendata(params)
      .then(async (json) => {
        console.log('WelcomeScreendata========:', JSON.stringify(json));
        if (json.status == true) {
          setIntroduction(json.data)
        }
      })

     
  }
  const renderslider = ({ item, index }) => {
    return (
      <View>
        <Image style={styles.sliderimage}
          source={{ uri: imageurl + item.image }}
        />
        <Text style={styles.introTitle}>{item.title}</Text>
        <View style={{ marginHorizontal: 24 }}>
          <RenderHtml
            contentWidth={width}
            source={{ html: item.description }}
          />
        </View>
        {/* <Text style={styles.text}>{item.description}</Text> */}
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={{ height: '100%', }}>
        {showslider ?
          <AppIntroSlider
            dotStyle={styles.dot}
            data={introductionlist}
            renderItem={renderslider}
            activeDotStyle={styles.activedot}
            onDone={() => props.navigation.navigate("welcome")}
            onSkip={() => props.navigation.navigate("welcome")}
            showSkipButton
            showPrevButton
            renderNextButton={() => {
              return (
                <View>
                  <Text style={styles.nextBtnTxt}>Next</Text>
                </View>
              )
            }
            }
            renderSkipButton={() => {
              return (
                <View>
                  <Text style={styles.skipBtnTxt}>Skip</Text>
                </View>
              )
            }
            }
            renderDoneButton={() => {
              return (
                <View>
                  <Text style={styles.skipBtnTxt}>Finish</Text>
                </View>
              )
            }
            }
            renderPrevButton={() => {
              return (
                <View>
                  <Text style={styles.skipBtnTxt}>Previous</Text>
                </View>
              )
            }
            }
          />
          : null
        }

      </View>
      {/* <View style={styles.btnMainView}>
          <TouchableOpacity style={styles.skipBtn}
            onPress={() => props.navigation.navigate("welcome")}>
            <Text style={styles.skipBtnTxt}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} onPress={() => props.navigation.navigate("welcome")}>
            <Text style={styles.nextBtnTxt}>Next</Text>
          </TouchableOpacity>
        </View> */}
      {/* </ScrollView> */}
    </View>
  );
};
export default Introduction;
