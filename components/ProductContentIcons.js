import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, SIZES } from '../constants'

const ProductContentIcons = ({product}) => {

  const [isGlutenFree, setIsGlutenFree] = useState(true);
  const [isCeliacFree, setIsCeliacFree] = useState(true);
  const [isLactoseFree, setIsLactoseFree] = useState(true);
  const [isVegan, setIsVegan] = useState(true);
  const [isOrganic, setIsOrganic] = useState(true);
  const [isPeanut, setIsPeanut] = useState(true);
  const [isSesame, setIsSesame] = useState(true);

  useEffect(() => {
    product.ingredients.map((ingredient) => {
        if (ingredient.name === 'gluten') {setIsGlutenFree(false)}
        if (ingredient.name === 'lactose') {setIsLactoseFree(false)}
        if (ingredient.name === 'msg') {setIsOrganic(false)}
        if (ingredient.name === 'trace amount of gluten') {setIsCeliacFree(false)}
        if (ingredient.name === 'not_vegan') {setIsVegan(false)}
        if (ingredient.name === 'peanut') {setIsPeanut(false)}
        if (ingredient.name === 'sesame') {setIsSesame(false)}
      })
  }, [])

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
      { isGlutenFree ? <Image source={assets.glutenFreeIcon} style={{width: 60, height: 60, marginBottom:-10, borderRadius: '50%' }} /> : null }
      { isLactoseFree ? <Image source={assets.lactoseFreeIcon} style={{width: 60, height: 60, borderRadius: '50%'}}/> : null }
      { isVegan ? <Image source={assets.veganIcon} style={{width: 50, height: 50, borderRadius: '50%'}}/> : null }
      { isPeanut ? <Image source={assets.peanutFreeIcon} style={{width: 50, height: 50, borderRadius: '50%'}}/> : null }
      { isSesame ? <Image source={assets.sesameFreeIcon} style={{width: 50, height: 50, borderRadius: '50%'}}/> : null }
      { isOrganic ? <Image source={assets.organicIcon} style={{width: 40, height: 40, borderRadius: '50%', marginLeft: SIZES.base}}/> : null }
    </View>
  )
}

export default ProductContentIcons