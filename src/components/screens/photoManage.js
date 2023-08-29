import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import RemoveImage from './photoManage/removeImage';
import AddImage from './photoManage/addImage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
export default function PhotoManage() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Tab.Screen
            name="Screen1"
            component={RemoveImage}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: () => (
                    <Image
                    source={require('../../images/removeImage.png')}
                        style={{ width: 75, height: 45, resizeMode: 'contain',alignItems:"center" }}
                    />
                ),
            }}
        />
         <Tab.Screen
            name="Screen2"
            component={AddImage}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: () => (
                    <Image
                    source={require('../../images/importImage.png')}
                        style={{ width: 75, height: 45, resizeMode: 'contain',alignItems:"center" ,marginTop:7}}
                    />
                ),
            }}
        />
        

    </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    users:{
        margin:10,
        padding:10,
        flexDirection:"row",
        flexWrap:"wrap"
    },
    user:{
        width:150,
        height:150,
        margin:10
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius: 50,
        borderWidth: 3,   
        borderColor: '#99EDC3', 
    },
    xMark:{
        height:50,
        width:50,
        position:"absolute",
        zIndex:1,
        borderRadius: 50,
        overflow: 'hidden',
        top:-20,
        alignSelf:"flex-end"
    }
})
