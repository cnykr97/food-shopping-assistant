import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native'

const BasketItemRow = ({item, navigation}) => {
  return (
    <TouchableOpacity style={styles.container} >
        <Text style={styles.basketName} > {item.basketName} </Text>
        <Text> Total Calories: {item.totalCalories} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: SIZES.extraLarge,
      paddingHorizontal: SIZES.base,
      marginVertical: SIZES.base
    },
    basketName: {
      color: COLORS.secondary,
      fontSize: SIZES.large,
      fontWeight: 'bold'
    }
})

export default BasketItemRow