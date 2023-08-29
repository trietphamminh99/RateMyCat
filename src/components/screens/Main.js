import React,{useState} from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View,  } from 'react-native';
import Card from '../catCard';
import catData from '../../data/catData';
import AnimatedStack from '../animatedCard/animatedCardIndex';


export default function Main() {
    

    const onSwipeLeft = (cat) => {
        console.log("swipe left", cat.name)
        cat.status = "Dislike"
        console.log(cat.status)
        console.log(cat)
    }
    const onSwipeRight = (cat) => {
        console.log("swipe right", cat.name)
        cat.status = "Like"
        console.log(cat.status)
        console.log(cat)
    }
    return (

        <View style={styles.imageContainer}>
            <AnimatedStack
                data={catData}
                renderItem={({ item }) => <Card cat={item} />}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            />
            
        </View>

    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    },
    mainImage: {
        height: '100%',
        width: '100%',
        
    },
});
