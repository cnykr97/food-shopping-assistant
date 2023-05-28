import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import {COLORS, SIZES, SHADOWS, assets, FONTS} from '../constants'
import { CircularButton } from './Buttons'
import ProductContentIcons from './ProductContentIcons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

const ProductCard = ({ product, user }) => {
  const navigation = useNavigation();

  const [isInFavorites, setIsInFavorites] = useState(false)
  const [addToBasketSection, setaddToBasketSection] = useState(false)

  const AddToBasket = ({user, product}) => {
    const [selectedBasket, setselectedBasket] = useState(user.baskets[0].id)

    const handleAddProductToBasket = () => {
      console.log("product added to basket")
    }

    return (
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: SIZES.font}} >
        <SelectDropdown 
          data={user.baskets}
          onSelect={(selectedBasket, index) => setselectedBasket(selectedBasket)}
          buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.basketName} }
          rowTextForSelection={(basket, index) => {return basket.basketName}}
          defaultButtonText='select a basket'
          buttonStyle={{
            borderRadius: SIZES.font,
            backgroundColor: COLORS.secondary
          }}
          buttonTextStyle= {{
            color: COLORS.white,
            fontWeight: 'bold'
          }}
          dropdownStyle={{
            borderRadius: SIZES.font,
          }}
        />
        <TouchableOpacity style={{
          backgroundColor: COLORS.secondary,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: SIZES.font,
          padding: SIZES.base
        }} >
          <Image source={assets.plusWhite} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', paddingHorizontal: SIZES.medium}} >Add</Text>
        </TouchableOpacity>
        
      </View>
    )
  }

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
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {product, navigation, user}) } >
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
          <CircularButton 
            imgUrl={assets.addToBasketIcon} 
            width={50} 
            height={50} 
            right={10} 
            top={70}
            handlePress= {() => setaddToBasketSection(!addToBasketSection)}
            />
          <ProductContentIcons product={product} />
        </View>

        <View style={{width:"100%", padding: SIZES.font}}>
              <Text style={{ fontFamily: FONTS.semiBold }} > {product.name} </Text>
              <Text style={{ fontFamily: FONTS.light }} > {product.weight} </Text>
        </View>
        <View>
          {addToBasketSection ? <AddToBasket user={user} product={product}/> : null}
        </View>
        
    </View>
  )
}

export default ProductCard