import { View, Text, Image } from 'react-native'
import {COLORS, SIZES, SHADOWS, assets, FONTS} from '../constants'
import { CircularButton } from './Buttons'

const ProductCard = ({ product }) => {
  return (
    <View style={{ 
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark
        }} >
      <View style={{width:"100%", height:250}} >
        <Image 
            source={product.image}
            resizeMode="contain"
            style={{
                width:"100%",
                height:"100%",
                borderRadius: SIZES.font
            }}
        />
        <CircularButton imgUrl={assets.heart} width={40} height={40} right={10} top={10} />
      </View>

      <View style={{width:"100%", padding: SIZES.font}}>
            <Text style={{ fontFamily: FONTS.semiBold }} > {product.name} </Text>
            <Text style={{ fontFamily: FONTS.light }} > {product.weight} </Text>
      </View>
    </View>
  )
}

export default ProductCard