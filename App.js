import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, StackActions } from "@react-navigation/native";
import IonIcons from 'react-native-vector-icons/Ionicons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from "./constants";
import Home from "./screens/Home";
import TakePhoto from "./screens/TakePhoto";
import Profile from "./screens/Profile";
import ProductDetails from "./screens/ProductDetails";
import { View } from "react-native";

// export NODE_OPTIONS=--openssl-legacy-provider

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// screen names
const homeName = "Home"
const TakePhotoName = "TakePhoto"
const ProfileName = "Profile"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>

      <Tab.Navigator  
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: COLORS.secondary,
          inactiveTintColor: COLORS.gray,
          labelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === TakePhotoName) {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (rn === ProfileName) {
              iconName = focused ? 'person' : 'person-outline';
            } 
            
            return <IonIcons name={iconName} size={size} color={color} />
          },
        })}>

        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="TakePhoto" component={TakePhoto}/>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="ProductDetails" component={ProductDetails} options={{ tabBarButton: () => <View style={{ width:0, height:0 }} ></View> }} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default App;


