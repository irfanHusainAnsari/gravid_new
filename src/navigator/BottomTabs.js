import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Webinar from '../screens/Webinar';
import Library from '../screens/Library';
import { svgs } from '@common';
import ParentingTV from '../screens/ParentingTV';
import ExpertList from '../screens/ExpertList';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  )
}
function WebinarTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="webinarScreen" component={Webinar} />
    </Stack.Navigator>
  )
}
function LibraryTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="libraryScreen" component={Library} />
    </Stack.Navigator>
  )
}
function ExpertListTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ExpertListScreen"
        component={ExpertList}
      // options={{ title: 'Welcome' }}
      />
    </Stack.Navigator>
  )
}
function ParentingTVtab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="ParentingTV" component={ParentingTV} />
    </Stack.Navigator>
  )
}
function BottomTabs() {
  return (
   
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return svgs.home(color, 22, 20);
          } else if (route.name === 'Webinar') {
            // return svgs.webinar(color, 22, 20);
            return svgs.webinar(color, 22, 20);
          } else if (route.name === 'Programs') {
            return svgs.program(color, 22, 20);
            // return svgs.library(color, 22, 20);
          } else if (route.name === 'Expert On Call') {
            return svgs.healthTracker(color, 22, 20);
          } else if (route.name === 'Packages') {
            return svgs.lappyIcon(color, 22, 20);
            // return svgs.userIcon(color, 22, 20);
          }
        },
        tabBarActiveTintColor: '#FE887E',
        tabBarInactiveTintColor: '#929397',
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeTab} />
      <Tab.Screen name="Webinar" options={{ headerShown: false }} component={WebinarTab} />
      <Tab.Screen name="Programs" options={{ headerShown: false }} component={LibraryTab} />
      <Tab.Screen name="Expert On Call" options={{ headerShown: false }} component={ExpertListTab} />
      <Tab.Screen name="Packages" options={{ headerShown: false }} component={ParentingTVtab} />
    </Tab.Navigator>
    
  );
}

export default BottomTabs;