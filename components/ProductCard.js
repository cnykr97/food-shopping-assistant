import { View, Text, Image, TouchableOpacity } from 'react-native'
import {COLORS, SIZES, SHADOWS, assets, FONTS} from '../constants'
import { CircularButton } from './Buttons'
import ProductContentIcons from './ProductContentIcons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

const ProductCard = ({ product, user }) => {
  const navigation = useNavigation();

  const [isInFavorites, setIsInFavorites] = useState(false)

  return (
    <View style={{ 
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark
        }}
        >
        <View style={{width:"100%", height:250}} >
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {product, navigation}) } >
            <Image 
                source={product.image}
                resizeMode="contain"
                style={{
                    width:"100%",
                    height:"100%",
                    borderRadius: SIZES.font
                }}
            />
          </TouchableOpacity>
          <CircularButton 
            imgUrl={isInFavorites ? assets.removeFromFavoritesIcon : assets.addToFavoritesIcon} 
            width={50} 
            height={50} 
            right={10} 
            top={10}
            handlePress= {() => setIsInFavorites(!isInFavorites)}
            />
          <ProductContentIcons product={product} />
        </View>

        <View style={{width:"100%", padding: SIZES.font}}>
              <Text style={{ fontFamily: FONTS.semiBold }} > {product.name} </Text>
              <Text style={{ fontFamily: FONTS.light }} > {product.weight} </Text>
        </View>
    </View>
  )
}

export default ProductCard