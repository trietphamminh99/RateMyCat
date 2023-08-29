import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import catData from '../../../data/catData';

const Button = (props) => {
    const { onPress, title = 'Save' } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}
export default function AddImage(props) {
    const handleButtonPress = () => {
        alert('Importing');
    };
    return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button onPress={handleButtonPress} title="Import Picture" />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'black',
          },
          text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          },
        });