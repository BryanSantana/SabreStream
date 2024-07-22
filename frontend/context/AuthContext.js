import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null)
    
    const login = async (email, password) => {
            setIsLoading(true);
            try {
              const response = await fetch(`${BASE_URL}users/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUserInfo(data)
                setUserToken(data['token']);
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                await AsyncStorage.setItem('userToken', data['token']);
              } else {
                console.error(response.message);
              }
            } catch (error) {
              console.error(`Login error: ${error}`);
            }
            setIsLoading(false);
          };

    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false);
    }
    const isLoggedIn = async() => {
        try {
        setIsLoading(true)
        let userInfo = await AsyncStorage.getItem('userInfo');
        let userToken = await AsyncStorage.getItem('userToken');
        userInfo = JSON.parse(userInfo)
        if (userInfo){
            setUserToken(userToken);
            setUserInfo(userInfo);
        }
        setIsLoading(false);
        } catch(e){
            console.log(`isLogged in error ${e}`);
        }
    }
    useEffect(() =>   {
        isLoggedIn();
    }, []);     

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}} > 
            {children}
        </AuthContext.Provider>
    );
}
