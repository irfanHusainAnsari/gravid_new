import { Network } from './network'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Network will recieve 4 Arguments
// "method(type of request)",
// "endpoint ()", 
// "body (if POST method)"
// See the main function at ./network.js

export default class Apis {
  static signup = (data) => {
    return Network('POST', 'register', data)
  }
  static SignupOtpMatch = (data) => {
    return Network('POST', 'signup-otp-match', data)
  }
  static LogninApi = (data) => {
    return Network('POST', 'login', data)
  }
  static LoginOtp = (data) => {
    return Network('POST', 'login-opt-match', data)
  }
  static ResendOtpSignup = (data) => {
    return Network('POST', 'signup-otp-resend', data)
  }
  static SendDateWebinar = (data) => {
    return Network('POST', 'expert-slot', data)
  }
  static CategoryApi = (data) => {
    return Network('GET', 'category-list', data)
  }
  static HomePagedata = async (data) => {
    const localData = await AsyncStorage.getItem('catID')
    return Network('GET', 'home-data?category_id=' + JSON.parse(localData), data)
  }
  static HomeDatalist = async (data) => {
    console.log('objectdatadatadatadatadata', data.type)
    return Network('GET', 'home-data-list?type='+data.type +'&category_id='+data.id, data)
  }
  static Welcomescreendata = (data) => {
    return Network('GET', 'welcome-screen-data', data)
  }
  static webinarlistLive = (data) => {
    return Network('GET', 'webinar-list?type=live', data)
  }
  static webinarrecoded = (data) => {
    return Network('GET', 'webinar-list?type=recorded', data)
  }
  static webinar_detail = (data) => {
    return Network('GET', 'webinar-detail?id=' + data.id, data)
  }
  static HomeListsDetails = (data) => {
    return Network('GET', 'home-list-details?type=' + data.type + '&id=' + data.id, data)
  }
  static Updata_Profile = (data) => {
    return Network('POST', 'profile-update', data, true)
  }
  static ExpertList = (data) => {
    return Network('GET', 'expert-list', data)
  }
  static AddBookmark = (data) => {
    console.log('data111111111111', data)
    return Network('POST', 'bookmark', data)
  }
  static AllBookMark = (data) => {
    return Network('GET', 'bookmark-list', data)
  }
  static instaMojoPayment = (data) => {
    return Network('POST', 'instamoja-payment', data)
  }
  static updatePayment = (data) => {
    return Network('POST', 'payment-update', data)
  }
  static recordedVideo = (data) => {
    return Network('GET', 'recorded-vedios', data)
  }
  static Signout = (data) => {
    return Network('POST', 'user-signout', data)
  }
  static TermsCondition = (data) => {
  return Network('GET', 'terms-condition-app', data)
  }

  // static fetch_usersTrip = () => {
  //  return Network('GET', 'driver/viewTrip')
  // }
  // static create_employee = (data) => {
  //   return Network('POST', 'create', data)
  // }

  // static OtpMobile = (data) => {
  //   return Network('POST', 'driverAuth/verifyMobile', data)
  // }
  // static Verifymail = (data) => {
  //   return Network('POST', 'driverAuth/verifyEmail', data)
  // }
  // static login = (data) => {
  //   return Network('POST', 'driverAuth/login', data)
  // }
  // static resendEmailVerifyOtp = (data) => {
  //   return Network('POST', 'driverAuth/resendEmailVerifyOtp', data)
  // }
  // static forgotPassword = (data) => {
  //   return Network('POST', 'driverAuth/forgotPassword', data)
  // }
  // static verifyResetPasswordOtp = (data) => {
  //   return Network('POST', 'driverAuth/verifyResetPasswordOtp', data)
  // }
  // static resetPassword = (data) => {
  //   return Network('POST', 'driverAuth/resetPassword', data)
  // }
  // static insertDetails = (data) => {
  //   return Network('POST', 'driver/insertDetails', data)
  // }
  // static updateDetails = (data) => {
  //   return Network('POST', 'driver/updateDetails', data)
  // }
  // static driverpostTrip = (data) => {
  //   return Network('POST', 'driver/postTrip', data)
  // }


}