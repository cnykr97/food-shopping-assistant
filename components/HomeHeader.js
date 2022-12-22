import { View, Text, Image, TextInput } from 'react-native'
import {COLORS, FONTS, SIZES, assets} from '../constants'

const HomeHeader = ({onSearch}) => {
  return (
    <View style={{
        backgroundColor: COLORS.white,
        padding: SIZES.font
    }} >
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }} >
        <Image source={assets.logo} resizeMode="contain" style={{width:120, height:100}} />
        <View style={{ width:50, height:50}} >
          <Image 
            source={assets.defaultUser} 
            resizeMode="contain"  
            style={{ width:"100%", height:"100%", borderRadius:"50%" }}
            />
        </View>
      </View>

      <View style={{marginVertical: SIZES.font}} >
        <Text style={{fontFamily:FONTS.regular, fontSize: SIZES.small}} >
          Hello, Beyza 👋
        </Text>

        <View style={{ marginTop: SIZES.font }} >
          <View style={{
            width:"100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.secondary,
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small -2
          }} >
            <Image 
              source={assets.search}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
                marginRight: SIZES.base
              }} 
            />
            <TextInput
              placeholder='Search for products'
              style={{flex:1, color: COLORS.white}}
              onChangeText={onSearch}
            />
            </View>
          </View>

        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large, marginTop: SIZES.font, marginBottom: -SIZES.font }} >
          We have 3 suggestions for you!
        </Text>
      </View>

      
    </View>
  )
}

export default HomeHeader