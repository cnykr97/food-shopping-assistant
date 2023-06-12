import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CircularButton, FocusedStatusBar, ProductCard } from '../components'
import { assets, FONTS, SIZES } from '../constants'
import ContentRow from '../components/ContentRow'
import InfoDisplay from '../components/InfoDisplay'
import useToken from '../hooks/useToken'

//const [user, setUser] = useState({})

const { fetchUser } = useToken()


const ContentDisplay = ({product}) => {
  const content = product.nutrition
  const keys = Object.keys(content)

  return keys.map( (key) => {
    return <ContentRow imgUrl={assets[`${key}Icon`]} name={key} value={content[key]} key={key.id} />
  })
}

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params
  const user = fetchUser()

  return (
    <SafeAreaView style={{ display:"flex", flexDirection:"column" }} key={product.id}>
      <ScrollView>
        <FocusedStatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {user && <ProductCard product={product} />}

        <CircularButton imgUrl={assets.left} handlePress={navigation.goBack}  top={SIZES.extraLarge} left={SIZES.small} width={50} height={50} />

        <InfoDisplay product={product} />

        <View style={{display:"flex", flexDirection:"column", marginTop: SIZES.small, marginLeft: SIZES.small}} >
          <View style={{marginBottom:SIZES.small, marginHorizontal:SIZES.small ,display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}} >
            <Text style={{fontFamily:FONTS.semiBold}} >
              Nutritive value 
            </Text>
            <Text style={{fontFamily:FONTS.semiBold}} >
              {"100g/ml"}
            </Text>
          </View>
          <ScrollView>
            <ContentDisplay product={product} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetails