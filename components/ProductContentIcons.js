import { View, Text, Image } from 'react-native'
import React from 'react'
import { assets, SIZES } from '../constants'

const ProductContentIcons = ({product}) => {
  return (
    <View style={{
        position: "absolute",
        bottom:0,
        left:0,
        display:"flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        paddingLeft: SIZES.small
    }} >
      { product.isGlutenFree ? <Image source={assets.glutenFreeIcon} style={{width: 60, height: 60, marginBottom:-10 }} /> : null}
      { product.isLactoseFree ? <Image source={assets.lactoseFreeIcon} style={{width: 60, height: 60}}/> : null}
      { product.isVegan ? <Image source={assets.veganIcon} style={{width: 50, height: 50}}/> : null}
    </View>
  )
}

export default ProductContentIcons