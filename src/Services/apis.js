import { Network } from './network'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  static CheckTrackerHistory = async (data) => {
    return Network('GET', 'check-tracker-history?type=' + data.type, data)
  }


  static getNotificationData = async (data) => {
    return Network('GET', 'get-notifications', data)
  }
  static getOrderHistory = async (data) => {
    return Network('GET', 'order-history', data)
  }
  static getOrderHistoryDetail = async (data) => {
    return Network('GET', `order-history?id=${JSON.parse(data?.id)}`, data)
  }
  
  static getPackageItem = async (data) => {
    return Network('GET', 'packages', data)
  }

  static getPackageItemDetail = async (data) => {
    return Network('GET', `packages?search_id=${data?.search_id}`, data)
  }
  static HomeDatalist = async (data) => {
    return Network('GET', 'home-data-list?type='+data.type +'&category_id='+data.id, data)
  }
  static Welcomescreendata = (data) => {
    return Network('GET', 'welcome-screen-data', data)
  }
  static webinarlistLive = (data) => {
    return Network('GET', 'webinar-list?type=live', data)
  }
  static programslistLive = (data) => {
    return Network('GET', 'program-list', data)
  }
  static getreadNotification = (data) => {
    return Network('POST', 'read-notifications', data , true)
  }
  static webinarrecoded = (data) => {
    return Network('GET', 'webinar-list?type=recorded', data)
  }
  static EpisodeVideos = (data) => {
    return Network('GET', 'episode-vedios?episode_id=' + data.episode_id, data)
  }
  static Coupancode = (data) => {
    return Network('GET', 'check-coupan-code?coupon_code=' + data.coupon_code, data)
  }
  static ParentigListVideos = (data) => {
    return Network('GET', 'parentingtv', data)
  }
  static ParentigDetailVideos = (data) => {
    return Network('GET', 'parentingtv?search_id=' + data.search_id, data)
  }
  static webinar_detail = (data) => {
    return Network('GET', 'webinar-detail?id=' + data.id, data)
  }
  static programs_detail = (data) => {
    return Network('GET', 'program-detail?id=' + data.id, data)
  }
  static expert_detail = (data) => {
    return Network('GET', 'expert-detail?id=' + data.id, data)
  }
  static getCartPostSaveData = (data) => {
    return Network('POST', 'cart-post', data , true)
  }
  static getDirect_order = (data) => {
    return Network('POST', 'direct-order', data , true)
  }
  
  static proceedOrder = (data) => {
    return Network('POST', 'order-post', data , true)
  }
  static RemoveCart = (data) => {
    return Network('POST', 'cart-remove', data , true)
  }
  static getCartData = (data) => {
    return Network('GET', 'carts', data)
  }
  static HomeListsDetails = (data) => {
    return Network('GET', 'home-list-details?type=' + data.type + '&id=' + data.id, data)
  }
  // moodTrackerTips
  static moodTrackerTips = (data) => {
    return Network('GET', 'mood-tracker-tips?tip_no=' +data.tip_no , data)
  }
  static Updata_Profile = (data) => {
    return Network('POST', 'profile-update', data, true)
  }
  static ExpertList = (data) => {
    return Network('GET', 'expert-list', data)
  }
  static AddBookmark = (data) => {
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
  static get_TrackerData = (data) => {
    return Network('POST', 'pregnancy-tracker', data, true)
  }
  static userCategory = (data) => {
    return Network('POST', 'user-category', data, true)
  }
  static get_OvulationData = (data) => {
    return Network('POST', 'ovulation-tracker', data, true)
  }
  static get_MoodData = (data) => {
    return Network('GET', 'mood-tracker', data)
  }
  static moodTrackerStore = (data) => {
    return Network('POST', 'create-mood-tracker', data,true)
  }
}