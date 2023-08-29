import { Image } from 'react-native';
import GallaryVericle from './gallerys/gallleryVerticle';
import GalleryHorizontal from './gallerys/galleryHorizontal';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
export default function Gallary() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen
                name="Screen1"
                component={GallaryVericle}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <Image
                        source={require('../../images/vertical.jpg')}
                            style={{ width: 75, height: 45, resizeMode: 'contain',alignItems:"center" }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Screen2"
                component={GalleryHorizontal}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <Image
                        source={require('../../images/horizontal.jpg')}
                            style={{ width: 75, height: 75, resizeMode: 'contain',alignItems:"center" }}
                        />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}



