import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, Image, FlatList, Dimensions,Pressable } from 'react-native';
import catData from '../../data/catData';
import tierData from '../../data/tierData';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function Profile() {
  const [activeIndex, setActiveIndex] = useState(0);


  const handleOnScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / SCREEN_WIDTH.toFixed(2);
    const indexFixed = Math.ceil(index)
    setActiveIndex(indexFixed)
  }
  const renderDotInicators = () => {
    return tierData.map((dot, index) => {
      // console.log("index", index)
      // console.log("active", activeIndex)
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={styles.dotActive}
          >
          </View>
        )
      } else {
        return <View
          key={index}
          style={styles.dot}
        >
        </View>
      }

    })
  }
  const Button = (props) => {
    const { onPress, title = 'Save' } = props;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  }
  const handleButtonPress = () => {
    alert('Upgrading');
};
  return (
    
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ ...styles.imageContainer, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../images/catProfile.jpg")} styles={styles.image}></Image>

        </View>
        <Text style={styles.profileText}>Triet Pham, 24</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment='center'
          pagingEnabled
          data={tierData}
          onScroll={handleOnScroll}
          scrollEventThrottle={0}
          renderItem={({ item }) => {
            return (
              <View style={{ ...styles.container, width: SCREEN_WIDTH, marginTop:15,marginBottom:15}}>

                <View style={styles.cardContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between",padding:10 }}>
                    <Text style={styles.headerText}>𝓡𝓪𝓽𝓮 𝓜𝔂 𝓒𝓪𝓽</Text>
                    <View style={{ ...styles.TierContainer, backgroundColor: item.color}}>
                      <Text style={{...styles.Tier,color: item.textColor}}>{item.Tier}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: "row",justifyContent:"space-between",margin:15}}>
                      <Text style={{...styles.TierInclued, fontWeight:"bold"}}>What's Included:</Text>
                      <Text style={{...styles.TierInclued,marginLeft:15}}>Free</Text>
                      <Text style={styles.TierInclued}>{item.Tier}</Text>
                  </View>
                  <View style={{flexDirection: "row",justifyContent:"space-between",alignItems:"center",margin:15}}>
                      <Text style={styles.TierInclued}>{item.benefit[0]}</Text>
                      <Text style={styles.iconText}>-</Text>
                      <Text style={styles.iconText}>✔</Text>
                  </View>

                  <View style={{flexDirection: "row",justifyContent:"space-between",alignItems:"center",margin:15}}>
                      <Text style={styles.TierInclued}>{item.benefit[1]}</Text>
                      <Text style={styles.iconText}>-</Text>
                      <Text style={styles.iconText}>✔</Text>
                  </View>
                  <View style={{flexDirection: "row",justifyContent:"space-between",alignItems:"center",margin:15}}>
                      <Text style={styles.TierInclued}>{item.benefit[2]}</Text>
                      <Text style={styles.iconText}>-</Text>
                      <Text style={styles.iconText}>✔</Text>
                  </View>
                  <View style={{...styles.buttonContainer}}>
                        <Button onPress={handleButtonPress} title="Upgrade" />
                      </View>
                </View>
              </View>
            )
          }}
        />
        <View style={styles.dotcontainer}>
          {renderDotInicators()}
        </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  imageContainer: {
    marginTop: 10,
    width: 180,
    height: 180,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#99EDC3',
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    justifyContent: "center",

  },
  buttonContainer:{
    marginTop:30,
    marginLeft:60,
    marginRight:60,
  },
  cardContainer: {
    width: SCREEN_WIDTH - 50,
    height: SCREEN_WIDTH - 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#99EDC3',
    overflow: 'hidden',
  },
  TierContainer: {
    alignItems: 'center',
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
    
  },
  Tier: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold'

  },
  TierInclued:{
    alignSelf: 'center',
    justifyContent: "center",
    
  },
  iconText: {
    fontSize: 18, 
    marginHorizontal: 15, 
    marginLeft:30
  },
  profileText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  settingText: {
    marginTop: 10,
    paddingTop: 10,
    width: "50%",
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  dotcontainer: {
    flexDirection: 'row',
    width: "100%",
    alignItems: "center",
    justifyContent: 'center'
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#ccc'
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#99EDC3'
  },
  headerText: {
    fontSize: 30,
    color: '#99EDC3',
    fontWeight: 'bold',
    width: "50%"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:"#99EDC3"
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


});