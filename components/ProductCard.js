import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import {COLORS, SIZES, SHADOWS, assets, FONTS} from '../constants'
import { CircularButton } from './Buttons'
import ProductContentIcons from './ProductContentIcons'
import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { BASE_URL } from '@env'
import useToken from '../hooks/useToken'
import FavoritesContext from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { baskets, setBaskets } = useContext(FavoritesContext);

  const [isInFavorites, setIsInFavorites] = useState(false)

  const [addToBasketSection, setaddToBasketSection] = useState(false)

  const [isProcessing, setIsProcessing] = useState(false)

  const { fetchToken, fetchUser } = useToken()

  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUserData() {
      const user = await fetchUser();
      setUser(user)
      user["likes"].map(item => {
        if (item.id === product.id) {
          setIsInFavorites(true)
        }
      })
    }
    fetchUserData();
  }, [favorites])

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
        setFavorites([...favorites, product])
        //setFavorites(prevFavorites => [...prevFavorites, { ...product, isFavorite: true }])
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
        setFavorites(favorites.filter(item => item.id !== product.id))
        //setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== product.id))
      })
      .catch(err => console.log(err))
      .finally(() => setIsProcessing(false))
    })
  }

  const handleFavorites = () => {
    isInFavorites ? removeFromFavorites() : addToFavorites() 
  }

  const handleAddToBasket = (selectedBasket) => {
    const updatedBasket = [product.id];
    selectedBasket.products.map((product) => updatedBasket.push(product.id))

    fetchToken().then(token => {
      fetch(`${BASE_URL}/basket/${selectedBasket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          name: selectedBasket.name,
          products: updatedBasket
        })
      })
      .then(response => {
          if (!response.ok) {
              console.log('Status Code: ', response.status);
              throw new Error(response.status);
          }
          return response.json();
      })
      .then( json  => {
        let updatedBaskets = baskets.map((basket) => 
          basket.id === selectedBasket.id ? json : basket
        );
        setBaskets(updatedBaskets)
      })
      .catch(err => console.log(err))
    })
  }

  const AddToBasketSection = () => {
    const [selectedBasket, setselectedBasket] = useState({})

    return (
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: SIZES.font}} >
        <SelectDropdown 
          data={user.baskets}
          onSelect={(selectedBasket) => setselectedBasket(selectedBasket)}
          buttonTextAfterSelection={(selectedItem, index) => {return selectedItem.name} }
          rowTextForSelection={(basket, index) => {return basket.name}}
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
        }} onPress={() => handleAddToBasket(selectedBasket)} disabled={!selectedBasket || !selectedBasket.products} >
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
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {product, navigation, user}) } style={{padding: SIZES.base}} >
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
            handlePress= {() => setaddToBasketSection(prev => !prev)}
            disabled={isProcessing}
            />
          <ProductContentIcons product={product} />
        </View>

        <View style={{width:"100%", padding: SIZES.font}}>
              <Text style={{ fontFamily: FONTS.semiBold }} > {product.name} </Text>
              {/* <Text style={{ fontFamily: FONTS.light }} > {product.weight} </Text> */}
        </View>
        <View>
          {user && addToBasketSection ? <AddToBasketSection /> : null}
        </View>
        
    </View>
  )
}

export default ProductCard