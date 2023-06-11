import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import {COLORS, SIZES, SHADOWS, assets, FONTS} from '../constants'
import { CircularButton } from './Buttons'
import ProductContentIcons from './ProductContentIcons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { BASE_URL } from '@env'
import useToken from '../hooks/useToken'

const ProductCard = ({ product, user }) => {
  const navigation = useNavigation();

  const [isInFavorites, setIsInFavorites] = useState(false)
  const [addToBasketSection, setaddToBasketSection] = useState(false)

  const [isProcessing, setIsProcessing] = useState(false)

  const { fetchToken } = useToken()

  useEffect(() => {
    user["likes"].map(item => {if (item.id === product.id) {setIsInFavorites(true)}} )
    console.log(product)
  },[])

  const addToFavorites = () => {
    setIsProcessing(true)
    fetchToken().then( token => {
      fetch(`${BASE_URL}/product/like/${product.id}`, {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token
         }
      })
      .then( response => {
        if (!response.ok) {
          console.log('Status Code: ', response.status);
          throw new Error(response.status);
        }
        setIsInFavorites(prev => !prev)
      })
      .catch(err => console.log(err))
      .finally(() => setIsProcessing(false))
    }) 
  }

  const removeFromFavorites = () => {
    setIsProcessing(true)
    fetchToken().then( (token) => {
      fetch(`${BASE_URL}/product/unlike/${product.id}`, {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token
         }
      })
      .then(response => {
        if (!response.ok) {
            console.log('Status Code: ', response.status);
            throw new Error(response.status);
        }
        setIsInFavorites(prev => !prev)
      })
      .catch(err => console.log(err))
      .finally(() => setIsProcessing(false))
    })
  }

  const handleFavorites = () => {
    isInFavorites ? removeFromFavorites() : addToFavorites() 
  }

  const AddToBasketSection = ({user, product}) => {
    const [selectedBasket, setselectedBasket] = useState(user.baskets[0].id)

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
                source={{ uri: product["photo_url"] }}
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
            handlePress= {handleFavorites}
            disabled={isProcessing}
            />
          <CircularButton 
            imgUrl={assets.addToBasketIcon} 
            width={50} 
            height={50} 
            right={10} 
            top={70}
            handlePress= {handleFavorites}
            disabled={isProcessing}
            />
          <ProductContentIcons product={product} />
        </View>

        <View style={{width:"100%", padding: SIZES.font}}>
              <Text style={{ fontFamily: FONTS.semiBold }} > {product.name} </Text>
              {/* <Text style={{ fontFamily: FONTS.light }} > {product.weight} </Text> */}
        </View>
        <View>
          {addToBasketSection ? <AddToBasketSection user={user} product={product}/> : null}
        </View>
        
    </View>
  )
}

export default ProductCard