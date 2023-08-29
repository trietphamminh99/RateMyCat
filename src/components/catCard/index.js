import React from "react";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
const Card = props => {
    const {name,bio,image} = props.cat
    return (
        <View style={styles.mainImageContainer}>
        <ImageBackground
        source={image}
        style={styles.mainImage}>
        <View style={styles.bioContainer}>
          <Text style={styles.catName}>{name}</Text>
          <Text style={styles.catBio}>{bio}</Text>
        </View>
      </ImageBackground>
      </View>
    )
    
}
const styles = StyleSheet.create({
    mainImage: {
      height: '100%',
      width: '100%',
      borderRadius: 30,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      
    },
    bioContainer:{
      alignItems: 'flex-start',
      alignSelf:'center',
      width: '80%',
      padding:10,
      marginBottom:30,
      backgroundColor: 'rgba(0,0,0, 0.10)',
      borderRadius: 30,
    },
    catName: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold'
    },
    catBio:{
      fontSize:18,
      color:'white'
      
    },
    mainImageContainer: {
        height: '80%',
        width: '98%',
        alignItems: 'center',
        borderRadius: 30,
      },
})
export default Card;