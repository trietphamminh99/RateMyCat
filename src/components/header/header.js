import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
const Header = () => {

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>𝓡𝓪𝓽𝓮 𝓜𝔂 𝓒𝓪𝓽</Text>
      </View>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({

  header: {
    flex: 0,
    width: '100%',
    justifyContent: "flex-start",
    borderRadius: 30,

  },
  headerText: {
    padding: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#99EDC3'
  }
});
export default Header