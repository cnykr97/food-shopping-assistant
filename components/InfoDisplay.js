import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, COLORS, FONTS, SIZES, userPreferences } from '../constants'
import { BASE_URL } from '@env'
import useToken from '../hooks/useToken'

const InfoDisplay = ({product}) => {

    const [isSuitable, setIsSuitable] = useState(false)
    const { fetchToken } = useToken()

    useEffect(() => {
        fetchToken().then((token) => {
            fetch(`${BASE_URL}/product/consume/${product.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.log('Status Code: ', response.status);
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
        })
    }, [])

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