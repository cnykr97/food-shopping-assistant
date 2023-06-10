import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {COLORS, FONTS, SIZES, assets} from '../constants'

const HomeHeader = ({onSearch, user}) => {
  return (
    <View style={{
        backgroundColor: COLORS.white,
        padding: SIZES.font
    }} >
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }} >
        <Image source={assets.logo} resizeMode="contain" style={{width:120, height:100}} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log("Create new basket pressed")}>
                  <Image 
                    source={assets.startShoppingIcon} 
                    resizeMode="contain"  
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Start Shopping!</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: SIZES.font}} >
        <Text style={{fontFamily:FONTS.regular, fontSize: SIZES.small}} >
          {"Hello " + user.name + " 👋"}
        </Text>

        <View style={{ marginTop: SIZES.font }} >
          <View style={{
            width:"100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.secondary,
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small -2
          }} >
            <Image 
              source={assets.search}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
                marginRight: SIZES.base
              }} 
            />
            <TextInput
              placeholder='Search for products'
              style={{flex:1, color: COLORS.white}}
              onChangeText={onSearch}
            />
            </View>
          </View>

        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large, marginTop: SIZES.font, marginBottom: -SIZES.font }} >
          Here are some suggestions for you!
        </Text>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 5,
        borderWidth: `2px solid ${COLORS.secondary}`,
        borderColor: COLORS.secondary,
        borderRadius: 5,
    },
    buttonIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    buttonText: {
      color: COLORS.secondary,
      fontWeight: 'bold'
    },
})

export default HomeHeader