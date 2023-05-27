import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { FocusedStatusBar } from '../components'
import { COLORS } from '../constants'

const Favorites = ({route, navigation}) => {
    const { user } = route.params

  return (
    <SafeAreaView>
        <FocusedStatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
        />
        <View style={styles.container} >
            <View style={styles.header} >

            </View>
            <View style={styles.content} >

            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexdirection: 'column',
    },
    header: {
        flex: 1,
        backgroundColor: COLORS.secondary
    },
    content: {
        flex: 1.5
    }
})

export default Favorites