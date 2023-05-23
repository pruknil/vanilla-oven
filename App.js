import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
import {Context as AuthContext} from './src/context/AuthContext';
import {useEffect, useState} from "react";
const AuthStack = createStackNavigator();
function AuthFlow() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                options={{headerShown: false}}
                name="SignIn"
                component={SignIn}
            />
            <AuthStack.Screen
                options={{headerShown: true}}
                name="SignUp"
                component={SignUp}
            />
            <AuthStack.Screen
                options={{headerShown: true}}
                name="ForgotPassword"
                component={ForgotPassword}
            />
        </AuthStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function HomeFlow() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    switch (route.name) {
                        case 'Tab1':
                            iconName = focused
                                ? 'ios-checkbox'
                                : 'ios-checkbox-outline';
                            break;
                        case 'Tab2':
                            iconName = focused
                                ? 'ios-add-circle'
                                : 'ios-add-circle-outline';
                            break;
                        case 'Tab3':
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                            break;
                    }

                    // You can return any component that you like here!
                    return (
                        <Icon name={iconName} type="ionicon" size={size} color={color} />
                    );
                },
                "tabBarActiveTintColor": "tomato",
                "tabBarInactiveTintColor": "gray",
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]

            })}
            >
            <Tab.Screen name="Tab1" component={Tab1} />
            <Tab.Screen name="Tab2" component={Tab2} />
            <Tab.Screen name="Tab3" component={Tab3} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();
function App() {
    const {state, setState} = React.useContext(AuthContext);
    useEffect(() => {
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {state.token === null ? (
                    <Stack.Screen
                        options={{headerShown: false}}
                        name="Auth"
                        component={AuthFlow}
                    />

                ) : (
                    <Stack.Screen
                        options={{headerShown: false}}
                        name="Home"
                        component={HomeFlow}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
};



/*

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./src/screens/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from "./src/screens/DetailScreen";
import {Button, Image} from "react-native";
const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require("./src/assets/icon.png")}
        />
    );
}

export default function App() {
    let someData = 'Hellox';
    return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen   name="Home"
                              // component={HomeScreen}
                              options={{ title: 'Overview'}}
              >
                  {(props) => <HomeScreen {...props} extraData={someData} />}
              </Stack.Screen>
              <Stack.Screen name="Details" component={DetailScreen}
                            options={{
                                headerTitle: (props) => <LogoTitle {...props} />,
                                headerRight: () => (
                                    <Button
                                        onPress={() => alert('This is a button!')}
                                        title="Info"
                                        color="#000"
                                    />
                                ),
                            }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


*/
