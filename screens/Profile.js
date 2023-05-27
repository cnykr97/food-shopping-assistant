import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FocusedStatusBar } from '../components';
import { assets, COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Profile = ({ route }) => {
    const { user } = route.params;

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <FocusedStatusBar 
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />

            <View style={styles.topSection}>
                <Image source={user.profilePicture} style={styles.profilePic} />
                <Text style={styles.username}>{user.userName}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout Pressed")}>
                  <Image 
                    source={assets.logoutIconWhite} 
                    resizeMode="contain"  
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Favorites", {user, navigation})}>
                  <Image 
                    source={assets.heartIcon} 
                    resizeMode="contain"  
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Baskets", {user, navigation})}>
                  <Image 
                    source={assets.basketIcon} 
                    resizeMode="contain"  
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Shopping Baskets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("ChangePreferences", {user, navigation})}>
                  <Image 
                    source={assets.changeIcon} 
                    resizeMode="contain"  
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Change Preferences</Text>
                </TouchableOpacity>
                
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        flex: 1.75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },
    bottomSection: {
        flex: 1.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    profilePic: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: width * 0.2,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: COLORS.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 5,
        borderWidth: `2px solid ${COLORS.secondary}`,
        borderColor: COLORS.secondary,
        borderRadius: 5,
        width: width * 0.6,
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
    logoutButton: {
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        borderWidth: `2px solid ${COLORS.white}`,
        borderColor: COLORS.white,
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: COLORS.white
    },
});

export default Profile;
