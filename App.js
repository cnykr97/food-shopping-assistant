import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme, StackActions } from "@react-navigation/native";
import IonIcons from 'react-native-vector-icons/Ionicons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { COLORS, SIZES, users } from "./constants";
import Home from "./screens/Home";
import TakePhoto from "./screens/TakePhoto";
import Profile from "./screens/Profile";
import ProductDetails from "./screens/ProductDetails";
import ChangePreferences from "./screens/ChangePreferences";
import { View } from "react-native";
import Baskets from "./screens/Baskets";
import Favorites from "./screens/Favorites";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import BasketDetails from "./screens/BasketDetails";
import ProductNotFound from "./screens/ProductNotFound";
import { useState } from "react";

// export NODE_OPTIONS=--openssl-legacy-provider

const LoginContainer = ({setLogged, theme}) => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer theme={theme} >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" > 
          {props => <Login {...props} setLogged={setLogged} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" > 
          {props => <SignUp {...props} setLogged={setLogged} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

const Main = ({setLogged, theme}) => {
  const Tab = createBottomTabNavigator();
  const HiddenTabBarButton = () => <View style={{ width:0, height:0 }} />

  // screen names
  const homeName = "Home"
  const TakePhotoName = "TakePhoto"
  const ProfileName = "Profile"
  
  return <NavigationContainer theme={theme}>
      <Tab.Navigator  
        initialRouteName={"homeName"}
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

        <Tab.Screen name="Home" component={Home} initialParams={{user: users[1]}} />
        <Tab.Screen name="TakePhoto" component={TakePhoto}/>
        <Tab.Screen name="Profile" component={Profile} initialParams={{user: users[1], setLogged: setLogged}} />
        <Tab.Screen name="ProductDetails" component={ProductDetails} options={{ tabBarButton: HiddenTabBarButton }} />
        <Tab.Screen name="ChangePreferences" component={ChangePreferences} options={{ tabBarButton: HiddenTabBarButton }} />
        <Tab.Screen name="Baskets" component={Baskets} options={{ tabBarButton: HiddenTabBarButton }} />
        <Tab.Screen name="Favorites" component={Favorites} options={{ tabBarButton: HiddenTabBarButton }} />
        <Tab.Screen name="BasketDetails" component={BasketDetails} options={{ tabBarButton: HiddenTabBarButton }} />
        <Tab.Screen name="ProductNotFound" component={ProductNotFound} options={{ tabBarButton: HiddenTabBarButton }} initialParams={{user: users[1]}} />
      </Tab.Navigator>

    </NavigationContainer>
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const setLogged = () => setIsLoggedIn(prev => !prev)

  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  })

  if (!loaded) return null

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent"
    }
  }
  
  return isLoggedIn ? <Main setLogged={setLogged} theme={theme} /> : <LoginContainer setLogged={setLogged} theme={theme} />
}

export default App;


