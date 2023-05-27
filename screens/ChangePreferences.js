import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularButton, FocusedStatusBar } from '../components';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, assets } from '../constants';

const ChangePreferences = ({ route, navigation }) => {
    const { user } = route.params;

    const [isGlutenFree, setIsGlutenFree] = useState(user.preferences.isGlutenFree);
    const [isCeliacFree, setIsCeliacFree] = useState(user.preferences.isCeliacFree);
    const [isLactoseFree, setIsLactoseFree] = useState(user.preferences.isLactoseFree);
    const [isVegan, setIsVegan] = useState(user.preferences.isVegan);


    const saveChanges = () => {
        
        navigation.navigate('Profile');
    };

    return (
        <SafeAreaView style={styles.container}>
            <FocusedStatusBar 
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <CircularButton imgUrl={assets.left} handlePress={() => navigation.navigate('Profile')}  top={SIZES.extraLarge*3} left={SIZES.small} width={50} height={50} />
            <View style={styles.header} >
                <Image source={assets.logo} resizeMode="contain" style={{width:240, height:200}} />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I have gluten intolerance</Text>
                <Switch 
                    value={isGlutenFree} 
                    onValueChange={() => setIsGlutenFree(!isGlutenFree)}
                    trackColor={{false: '#767577', true: COLORS.secondary}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I am Celiac</Text>
                <Switch 
                    value={isCeliacFree} 
                    onValueChange={() => setIsCeliacFree(!isCeliacFree)} 
                    trackColor={{false: '#767577', true: COLORS.secondary}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I have lactose intolerance</Text>
                <Switch 
                    value={isLactoseFree} 
                    onValueChange={() => setIsLactoseFree(!isLactoseFree)} 
                    trackColor={{false: '#767577', true: COLORS.secondary}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I am vegan</Text>
                <Switch 
                    value={isVegan} 
                    onValueChange={() => setIsVegan(!isVegan)} 
                    trackColor={{false: '#767577', true: COLORS.secondary}}
                    />
            </View>


            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: SIZES.extraLarge,
        marginBottom: SIZES.extraLarge, 
        borderBottomWidth: '2px solid', 
        borderBottomColor: COLORS.secondary
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    preferenceTitle: {
        fontSize: 18,
    },
    saveButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.secondary,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangePreferences;
