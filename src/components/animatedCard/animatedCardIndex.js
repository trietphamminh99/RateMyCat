import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Pressable, StyleSheet, View, Text, useWindowDimensions,Image,Dimensions } from 'react-native';


import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedGestureHandler, useDerivedValue,withSpring,runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Like from '../../images/LIKE.png'
import Nope from '../../images/nope.png'

const ROTATION = 60;
const SWIPE_VELOCITY = 1500
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AnimatedStack(props) {

    const {data,renderItem,onSwipeRight,onSwipeLeft} = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProfile = data[currentIndex]

  const [nextIndex, setNextIndex] = useState(currentIndex + 1)
  const nextProfile = data[nextIndex]

  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);

  const rotate = useDerivedValue(
    () => interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + 'deg',
  );
//Handle Animated Card ---------------------------------- 
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value
      }
    ]
  }));
  
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.9, 1]
        )
      }
    ]
  }))
//Handle Like and nope Card ---------------------------------- 
  const likeStyle =useAnimatedStyle(()=> ({
    opacity:interpolate(
      translateX.value,
      [ 0, hiddenTranslateX/5],
      [0, 1]
    )
  }))

  const nopeStyle =useAnimatedStyle(()=> ({
    opacity:interpolate(
      translateX.value,
      [ 0, -hiddenTranslateX/5],
      [0, 1]
    )

  }))
  //Get Hand Gesture ---------------------------------- 
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX

    },
    onEnd: event => {
    
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        ()=>runOnJS(setCurrentIndex)(currentIndex+1)
        );
        const onSwipe = event.velocityX > 0? onSwipeRight : onSwipeLeft
        onSwipe && runOnJS(onSwipe)(currentProfile)
    }
  })
  useEffect(()=>{
    translateX.value = 0;
    setNextIndex(currentIndex +1);
  },[currentIndex,translateX]
  )

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
       {nextProfile && (<View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item:nextProfile})}
          </Animated.View>
        </View>
        )}

        {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          
          <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Animated.Image source={Like} style={[styles.like, {left:10},likeStyle]} resizeMode='contain'></Animated.Image>
          <Animated.Image source={Nope} style={[styles.like, {right:10},nopeStyle]} resizeMode='contain'></Animated.Image>
            {renderItem({item:currentProfile})}
          </Animated.View>
        </PanGestureHandler>
)}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  animatedCard: {
    height: '120%',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  like:{
    width:200,
    height:300,
    position:'absolute',
    top:10,
    zIndex:1
  }
});
