import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import Tabs from '../navigation/Tabs';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import WelcomeScreen from '../screens/WelcomeScreen';


function AppNav () {
    const {isLoading, userToken} = useContext(AuthContext);
    if (isLoading){
        return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={"large"}/>
        </View>   
        ); 
    }
    return (
    <NavigationContainer>
        {userToken !== null ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
    )
}
//<Stack.Navigator initialRouteName="Login">
//<Stack.Screen name="Login" component={LoginScreen} />
//<Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
//</Stack.Navigator>

export default AppNav;