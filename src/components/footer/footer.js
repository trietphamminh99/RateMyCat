import React, { useEffect, useReducer, useRef } from "react";
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Gallary from "../screens/gallerys";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import Lottie from 'lottie-react-native'
import Animated, { useDerivedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Profile from "../screens/profile";
import PhotoManage from "../screens/photoManage";

//---------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

//---------------------------------------------------------------------
const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {

    const { bottom } = useSafeAreaInsets();
    const reducer = (state, action) => {
        return [...state, { x: action.x, index: action.index }];
    };
    const [layout, dispatch] = useReducer(reducer, [])
    

    const handleLayout = (event, index) => {
        dispatch({ x: event.nativeEvent.layout.x, index })
    }
    const xOffset = useDerivedValue(() => {
        if (layout.length !== routes.length) return 0;
        return layout.find(({ index }) => index === activeIndex).x - 25;

    }, [activeIndex, layout])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
        }
    })
    return (
        <View style={[styles.tabBar, { paddingBottom: bottom + 10 }]}>
            <AnimatedSvg
                width={110}
                height={60}
                viewBox="0 0 110 60"
                style={[styles.activeBackground, animatedStyle]}
            >
                <Path
                    fill="white"
                    d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                />
            </AnimatedSvg>
            <View style={styles.tabBarContainer}>
                {routes.map((route, index) => {
                    const active = index === activeIndex
                    const {options} = descriptors[route.key]
                    return (
                        <TabBarComponent
                            key={route.key}
                            active={active}
                            options={options}
                            onLayout={(e) => handleLayout(e, index)}
                            onPress={() => navigation.navigate(route.name)}
                        />
                    );
                })}
            </View>
        </View>
    )
}


const TabBarComponent = ({ active, onLayout,options, onPress }) => {
  // handle lottie animation --------------------------- 
    const ref = useRef(null)

    useEffect(() =>{
        if(active && ref?.current){
            ref.current.play()
        }
    },[active])
   //handle animation ---------------------------------- 
    const animatedComponentCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(active ? 1 : 0, { duration: 250 })
                }
            ]
        }
    })
    return (
        <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
            <Animated.View
                style={[styles.componentCircle,animatedComponentCircleStyle]} />
            <Animated.View style={[styles.IconContainer]}>
            {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
            </Animated.View>
        </Pressable>
    )
};
   //Main Footer ---------------------------------- 
const Footer = () => {

    return (
        <Tab.Navigator

            tabBar={(props) => <AnimatedTabBar {...props} />}

        >
            <Tab.Group
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen
                    
                    name="Main?"
                    component={Main}
                    options={{
                        tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../../lottie/mainCat.json')} style={styles.icon} />,
                      }} />
                <Tab.Screen
                  name="Gallary"
                  component={Gallary}
                  options={{
                      tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../../lottie/gallary.json')} style={styles.icon} />,
                    }} />
                <Tab.Screen
                  name="PhotoManage"
                  component={PhotoManage}
                  options={{
                      tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../../lottie/imageM.json')} style={{height: 70,width:100}} />,
                    }} />
                 <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                      tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../../lottie/profile.json')} style={{height: 40,width:45}} />,
                    }} />
            </Tab.Group>
        </Tab.Navigator>
    )

}
const styles = StyleSheet.create({
    tabBar: {
        zIndex: 1,
        backgroundColor: '#99EDC3',
        

    },
    activeBackground: {
        position: "absolute"
        
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -5,
        
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'white',
        
    },
    IconContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: "center"
        
    },
    icon: {
        height: 50,
        width: 50,
        
    }


})
export default Footer