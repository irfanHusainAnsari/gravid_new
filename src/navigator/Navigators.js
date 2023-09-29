import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Introduction from '../screens/Introduction';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import OtpVerify from '../screens/OtpVerify';
import CompleteVerify from '../screens/CompleteVerify';
import CompleteVerifyDoc from '../screens/CompleteVerifyDoc';
import BottomTabs from './BottomTabs';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Referral from '../screens/Referral';
import TermsCondition from '../screens/Terms&Condition';
import Privacy_Policy from '../screens/Privacy_Policy';
import List_of_Docters from '../screens/List_of_Doctors';
import RecentBlogsDetail from '../screens/RecentBlogsDetail';
import VideosDetails from '../screens/VideosDetails';
import RecentIssuesDetail from '../screens/RecentIssuesDetail';
import ExpertListDetail from '../screens/ExpertListDetail';
import CurrentIssue from '../screens/CurrentIssue';
import Blogs from '../screens/Blogs';
import Video_Library from '../screens/Video_Library';
import WebinarDetail from '../screens/WebinarDetail';
import RecordedVideoDetail from '../screens/RecordedVideoDetail';
import InstaMojoWebScreen from '../screens/InstaMojoWebScreen';
import Offers from '../screens/Offers';
import RecentOffersDetail from '../screens/RecentOffersDetail';
import Library from '../screens/Library';
import ExpertList from '../screens/ExpertList';
import ParentingTV from '../screens/ParentingTV';
import Notifications from '../screens/Notifications';
import WebViewScreen from '../component/WebViewScreen';
import ServiceSelection from '../screens/ServiceSelection';
import Cart from '../screens/Cart';
import ProgramsDetail from '../screens/ProgramsDetail';
import PackageDetail from '../screens/PackageDetail.js';
import RecordedWebinarVidioList from '../screens/RecordedWebinarVidioList/RecordedWebinarVidioList';
import OrderHistory from '../screens/OrderHistory';
import OrderHistoryDetail from '../screens/OrderHistoryDetail.js';
import NewPackegedetail from '../screens/NewPackegedetail';
import ParentingList from '../screens/ParentingList';
import TrackerLink from '../screens/TrackerLink';
import PregnancyTracker from '../screens/PregnancyTracker';
import OvulationTracker from '../screens/OvulationTracker';
import PregnancyDetail from '../screens/PregnancyDetail';
import OvulationDetail from '../screens/OvulationDetail';
import PregnancyDetailView from '../screens/PregnancyDetailView.js';
import EpisodeVideoDetail from '../screens/EpisodeVideoDetail';
import MoodTracker from '../screens/MoodTracker';
import MoodTrackerDetail from '../screens/MoodTrackerDetail';
import Dummy from '../screens/Dommy';

const RootStack = createNativeStackNavigator();
const Navigators = () => {
  return (
    <RootStack.Navigator
    // initialRouteName='OvulationDetail'
    >
      {/* <RootStack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} /> */}
      {/* <RootStack.Screen name="Dommy" component={Dummy} options={{ headerShown: false }} /> */}
      <RootStack.Screen name="splash" component={Splash} options={{ headerShown: false }} />
      <RootStack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
      <RootStack.Screen name="welcome" component={Welcome} options={{ headerShown: false }} />
      <RootStack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
      <RootStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <RootStack.Screen name="otpverify" component={OtpVerify} options={{ headerShown: false }} />
      <RootStack.Screen name="completeVerify" component={CompleteVerify} options={{ headerShown: false }} />
      <RootStack.Screen name="CompleteVerifyDoc" component={CompleteVerifyDoc} options={{ headerShown: false }} />
      <RootStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <RootStack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
      <RootStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <RootStack.Screen name="Library" component={Library} options={{ headerShown: false }} />
      <RootStack.Screen name="ParentingTV" component={ParentingTV} options={{ headerShown: false }} />
      <RootStack.Screen name="ExpertList" component={ExpertList} options={{ headerShown: false }} />
      <RootStack.Screen name="Referral" component={Referral} options={{ headerShown: false }} />
      <RootStack.Screen name="TermsCondition" component={TermsCondition} options={{ headerShown: false }} />
      <RootStack.Screen name="Privacy_Policy" component={Privacy_Policy} options={{ headerShown: false }} />
      <RootStack.Screen name="List_of_Docters" component={List_of_Docters} options={{ headerShown: false }} />
      <RootStack.Screen name="RecentBlogsDetail" component={RecentBlogsDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="RecentOffersDetail" component={RecentOffersDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="VideosDetails" component={VideosDetails} options={{ headerShown: false }} />
      <RootStack.Screen name="RecentIssuesDetail" component={RecentIssuesDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="ExpertListDetail" component={ExpertListDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="CurrentIssue" component={CurrentIssue} options={{ headerShown: false }} />
      <RootStack.Screen name="blogs" component={Blogs} options={{ headerShown: false }} />
      <RootStack.Screen name="Offers" component={Offers} options={{ headerShown: false }} />
      <RootStack.Screen name="Video_Library" component={Video_Library} options={{ headerShown: false }} />
      <RootStack.Screen name="webinarDetail" component={WebinarDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="RecordedVideoDetail" component={RecordedVideoDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="InstaMojoWebScreen" component={InstaMojoWebScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <RootStack.Screen name="WebViewScreen" component={WebViewScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="ServiceSelection" component={ServiceSelection} options={{ headerShown: false }} />
      <RootStack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <RootStack.Screen name="ProgramsDetail" component={ProgramsDetail} options={{ headerShown: false }} />
      <RootStack.Screen name="PackageDetail" component={PackageDetail} options={{ headerShown: false }} />
      <RootStack.Screen name='RecordedWebinarVidioList' component={RecordedWebinarVidioList} options={{ headerShown: false }} />
      <RootStack.Screen name='OrderHistory' component={OrderHistory} options={{ headerShown: false }} />
      <RootStack.Screen name='OrderHistoryDetail' component={OrderHistoryDetail} options={{ headerShown: false }} />
      <RootStack.Screen name='NewPackegedetail' component={NewPackegedetail} options={{headerShown: false}}/>
      <RootStack.Screen name='ParentingList' component={ParentingList} options={{headerShown: false}}/>
      <RootStack.Screen name='TrackerLink' component={TrackerLink} options={{headerShown: false}}/>
      <RootStack.Screen name='PregnancyTracker' component={PregnancyTracker} options={{headerShown: false}}/>
      <RootStack.Screen name='OvulationTracker' component={OvulationTracker} options={{headerShown: false}}/>
      <RootStack.Screen name='PregnancyDetail' component={PregnancyDetail} options={{headerShown: false}}/>
      <RootStack.Screen name='OvulationDetail' component={OvulationDetail} options={{headerShown: false}}/>
      <RootStack.Screen name='PregnancyDetailView' component={PregnancyDetailView} options={{headerShown: false}}/>
      <RootStack.Screen name='EpisodeVideoDetail' component={EpisodeVideoDetail} options={{headerShown: false}}/>
      <RootStack.Screen name='MoodTracker' component={MoodTracker} options={{headerShown: false}}/>
      <RootStack.Screen name='MoodTrackerDetail' component={MoodTrackerDetail} options={{headerShown: false}}/>
    </RootStack.Navigator>
  );
};

export default Navigators