import NetInfo from "@react-native-community/netinfo";
import axios from 'axios'
import { base_url } from './constants'

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useEffect, useState } from 'react';
//THIS CODE IS FOR DEBUGGIN NETWORK CALLES IN CHROME DEVTOOLS
//REMOVE THIS ON PRODUCTION BUILD
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
//Main method for network calls using axios
export const Network = (method, endpoint, data = {}, isFile = false) => {
  var Token = ''
  return fetch = new Promise(async (resolve, reject) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken !== null) {
        Token = accessToken
        // console.log("Token====", accessToken);
      }
    } catch (error) {
      // Error retrieving data
    }
    NetInfo.fetch().then(state => {
      console.log("state++++++++++++++++++", state)
      if (state.isConnected) {
        console.log('---method :', method);
        console.log('---endpoint :', endpoint);
        console.log('---payload :', data);
        console.log('---URL :', `${base_url}${endpoint}`)
        const headers = {
          "Accept": "application/json",
          "content-type": isFile ? "multipart/form-data" : "application/json",
          'Authorization': 'Bearer ' + Token
        }
        console.log("headers", headers);
        axios({
          method,
          headers,
          url: `${base_url}${endpoint}`,
          data
        }).then((response) => {
          resolve(response.data)
          console.log('---response :', response.data);
        })
          .catch(error => {
            console.log('---error :', error);
            var json = JSON.parse(error?.response?.request._response)
            resolve(json)
          });
        // if (method == "POST") {
        //   console.log('---postmethod :', method);
        //   axios.post(`${base_url}${endpoint}`, data, headers)
        //     .then(response => {
        //       console.log('---response :', response);
        //       if (response.data) {
        //         resolve(response.data)
        //       } else {
        //         reject('something went wrong')
        //       }
        //     })
        //     .catch(error => {
        //       var json = JSON.parse(error.response.request._response)
        //       resolve(json)
        //     });


        // } else {

      }
      // }
    });

  })
}



