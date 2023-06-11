import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env' 
import { useState } from 'react';

export default function useToken() {
  const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token.toString());
        } catch (e) {
            // Saving error
            console.error(e);
        }
    }

  const fetchToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      return value;
    } catch(err) {
      console.error(err);
    }
  }

  const fetchUser = async () => {
  try {
    const token = await fetchToken();
    const response = await fetch(`${BASE_URL}/users/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

  return {storeToken, fetchToken, fetchUser}
}



