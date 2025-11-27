import React from 'react'
import {
    ScrollView
} from 'react-native'
import Logo from '../components/Logo'
import AgeSelectionScreen from './age-selection'
import HomeScreen from './home-screen'
// import HomeScreen from './home'



const dashboard = () => {
 return (
   <ScrollView showsVerticalScrollIndicator={false}>
     <Logo />
     <AgeSelectionScreen />
     <HomeScreen/>
   </ScrollView>
 );
}

export default dashboard