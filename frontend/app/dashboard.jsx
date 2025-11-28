import React from 'react'
import {
    ScrollView
} from 'react-native'
import WelcomeScreen from '../components/WelcomeScreen'
import AgeSelectionScreen from './age-selection'
import HomeScreen from './home-screen'
import Login from './log-in'
import CreateAccount from './create-account'
import ProfileScreen from './profile'
import ExploreScreen from './explore'
import ProgressScreen from './progress'




const dashboard = () => {
 return (
   <ScrollView showsVerticalScrollIndicator={false}>
     <WelcomeScreen/>
     <AgeSelectionScreen />
     <HomeScreen/>
     <Login/>
     <CreateAccount/>
     <ProfileScreen/>
     <ExploreScreen/>
     <ProgressScreen/>
   </ScrollView>
 );
}

export default dashboard