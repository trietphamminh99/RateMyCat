import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Text, useWindowDimensions, Image, ImageBackground,SafeAreaView } from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import Header from './src/components/header/header';
import Footer from './src/components/footer/footer';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
 
  return (
   
    <GestureHandlerRootView style={{ flex: 1 ,}}>
      
        <Header/>
        <NavigationContainer>
          <Footer/>
        </NavigationContainer>
      
    </GestureHandlerRootView>
    
  );
}

