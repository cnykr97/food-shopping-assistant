import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularButton, FocusedStatusBar } from '../components';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, assets } from '../constants';
import { BASE_URL} from '@env'
import useToken from '../hooks/useToken'

const ChangePreferences = ({ navigation }) => {

    const { fetchToken, fetchUser } = useToken() 

    const [user, setUser] = useState({});

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isCeliacFree, setIsCeliacFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isOrganic, setIsOrganic] = useState(false);
    const [isPeanut, setIsPeanut] = useState(false);
    const [isSesame, setIsSesame] = useState(false);

    useEffect(() => {
        fetchUser()
            .then(user => {
                setUser(user);
                user.diets.map((diet) => {
                    if (diet.name === "celiac") { setIsCeliacFree(true)}
                    if (diet.name === "vegan") { setIsVegan(true)}
                    if (diet.name === "gluten_intolerance") { setIsGlutenFree(true)}
                    if (diet.name === "lactose") { setIsLactoseFree(true)}
                    if (diet.name === "peanut_allergy") { setIsPeanut(true)}
                    if (diet.name === "sesame_allergy") { setIsSesame(true)}
                    if (diet.name === "organic") { setIsOrganic(true)}
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);



    const saveChanges = () => {
        let newDiet = []

        if (isGlutenFree) { newDiet.push("gluten_intolerance")}
        if (isCeliacFree) { newDiet.push("celiac")}
        if (isLactoseFree) { newDiet.push("lactose")}
        if (isVegan) { newDiet.push("vegan")}
        if (isOrganic) { newDiet.push("organic")}
        if (isPeanut) { newDiet.push("peanut_allergy")}
        if (isSesame) { newDiet.push("sesame_allergy")}

        fetchToken().then((token) => fetch(`${BASE_URL}/users/update-diet`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "new_diet": newDiet
            })
        }))
        .then(response => {
                if (!response.ok) {
                    console.log('Status Code: ', response.status);
                    throw new Error(response.status);
                }
                return response.json();
            })
        .then( () => navigation.navigate('Profile'))
        .catch(err => console.log(err))
    }

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
                    onValueChange={() => setIsGlutenFree(prev => !prev)}
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I am Celiac</Text>
                <Switch 
                    value={isCeliacFree} 
                    onValueChange={() => setIsCeliacFree(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I have lactose intolerance</Text>
                <Switch 
                    value={isLactoseFree} 
                    onValueChange={() => setIsLactoseFree(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>

            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I am vegan</Text>
                <Switch 
                    value={isVegan} 
                    onValueChange={() => setIsVegan(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>
            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I want organic foods</Text>
                <Switch 
                    value={isOrganic} 
                    onValueChange={() => setIsOrganic(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>
            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I have peanut allergy</Text>
                <Switch 
                    value={isPeanut} 
                    onValueChange={() => setIsPeanut(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
                    />
            </View>
            <View style={styles.preference}>
                <Text style={styles.preferenceTitle}>I have sesame allergy</Text>
                <Switch 
                    value={isSesame} 
                    onValueChange={() => setIsSesame(prev => !prev)} 
                    trackColor={{false: COLORS.primary, true: COLORS.check}}
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
