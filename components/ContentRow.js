import { View, Text, Image } from 'react-native'
import React from 'react'
import { FONTS, SIZES, assets } from '../constants'

const ContentRow = ({imgUrl, name, value}) => {
  return (
    <View style={{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical: SIZES.base,
        marginLeft: -SIZES.font,
        paddingHorizontal: SIZES.base*2,
        backgroundColor:"#f7fafb"
    }} >
        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
          <Image source={imgUrl} resizeMode="contain" style={{width:50, height:50}} />
          <Text style={{fontFamily:FONTS.semiBold }} > {name} {name === "calories" ? "(kcal)" : "(g)"} </Text>
        </View>

        <Text style={{fontFamily: FONTS.regular}} >
            {value}
        </Text>
  
    </View>
  )
}

export default ContentRow