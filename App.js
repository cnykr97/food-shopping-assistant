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
import { BASE_URL } from "@env"
import FavoritesProvider from './context/FavoritesProvider';

// export NODE_OPTIONS=--openssl-legacy-provider

const LoginContainer = ({login, theme}) => {
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
          {props => <Login {...props} login={login} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" > 
          {props => <SignUp {...props} login={login} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

const Main = ({logout, theme, user}) => {
  const Tab = createBottomTabNavigator();
  const HiddenTabBarButton = () => <View style={{ width:0, height:0 }} />

  // screen names
  const homeName = "Home"
  const TakePhotoName = "TakePhoto"
  const ProfileName = "Profile"
  
  return(
    <FavoritesProvider>
      <NavigationContainer theme={theme}>
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

          <Tab.Screen name="Home" component={Home} initialParams={{user: user}} />
          <Tab.Screen name="TakePhoto" component={TakePhoto}/>
          <Tab.Screen name="Profile" component={Profile} initialParams={{user: user, logout: logout}} />
          <Tab.Screen name="ProductDetails" component={ProductDetails} options={{ tabBarButton: HiddenTabBarButton }} />
          <Tab.Screen name="ChangePreferences" component={ChangePreferences}  options={{ tabBarButton: HiddenTabBarButton }} />
          <Tab.Screen name="Baskets" component={Baskets}  options={{ tabBarButton: HiddenTabBarButton }} />
          <Tab.Screen name="Favorites" component={Favorites}  options={{ tabBarButton: HiddenTabBarButton }} />
          <Tab.Screen name="BasketDetails" component={BasketDetails} options={{ tabBarButton: HiddenTabBarButton }} />
          <Tab.Screen name="ProductNotFound" component={ProductNotFound} options={{ tabBarButton: HiddenTabBarButton }} initialParams={{user: user}} />
        </Tab.Navigator>

      </NavigationContainer>
    </FavoritesProvider>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const login = (access_token) => {
    fetch(`${BASE_URL}/users/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token.toString()
      }
    })
    .then(response => response.json())
    .then(json => setUser(json))
    .finally(() => setIsLoggedIn(true))
  }

  const logout = () => setIsLoggedIn(false)

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
  
  return isLoggedIn ? <Main logout={logout} theme={theme} user={user} /> : <LoginContainer login={login} theme={theme} />
}

export default App;


