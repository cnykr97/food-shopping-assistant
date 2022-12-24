import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, COLORS, FONTS, SIZES, userPreferences } from '../constants'

const InfoDisplay = ({product}) => {

    let isSuitable = true

    for (let i = 0; i < Object.keys(userPreferences).length; i++) {
        if(userPreferences[Object.keys(userPreferences)[i]]){
            if(!product[Object.keys(userPreferences)[i]]){
                isSuitable = false
            } 
        }
    }

    const backgroundColor = isSuitable ? COLORS.check : COLORS.attention

  return (
    <View style={{
        width:"100%",
        height:80,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor: backgroundColor,
        paddingHorizontal: SIZES.large
    }} >
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", marginLeft: -SIZES.small}} >
            <Image 
            source={isSuitable ? assets.checkIcon : assets.attentionIcon } 
            style={{ width:60, height:60 }}
            />
            <Text style={{ color: COLORS.white, fontFamily: FONTS.semiBold, fontSize: SIZES.font}} >
                {isSuitable ? "This product is suitable to your preferences!" : "This product is not suitable to your preferences! "}
            </Text>
        </View>
            
    </View>
  )
}

export default InfoDisplay