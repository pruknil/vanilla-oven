import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import Home from './src/screens/tabs/Home';
import Cam from './src/screens/tabs/Cam';
import Tab3 from './src/screens/tabs/Tab3';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
import {Context as AuthContext} from './src/context/AuthContext';
import {useEffect, useState} from "react";
import Account from "./src/screens/tabs/Account";
import {Icon, ThemeProvider, createTheme, useTheme} from '@rneui/themed';
import Profile from "./src/screens/tabs/Profile";


const theme = createTheme({
    lightColors: {
     //   background: '#7dcbe8',
    },
    darkColors: {
     //   background: '#631ce8',
    },
  //  mode: isDarkTheme,
});
//const isDarkTheme = theme === 'dark';
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
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline';
                            break;
                        case 'Camera':
                            iconName = focused
                                ? 'ios-camera'
                                : 'ios-camera-outline';
                            break;
                        case 'Tab3':
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                            break;
                        case 'Setting':
                            iconName = focused
                                ? 'ios-person'
                                : 'ios-person-outline';
                            break;
                    }

                    // You can return any component that you like here!
                    return (
                        <Icon name={iconName} type="ionicon" size={size} color={color}/>
                        );
                },
                "tabBarActiveTintColor": "tomato",
                "tabBarInactiveTintColor": "gray",
                "tabBarStyle": [
                    {
                        display: "flex",
                        backgroundColor: theme.colors.white,
                    },
                    null
                ],
                 headerTitleStyle: {
                     fontWeight: "bold",
                     color: theme.colors.black,
                     fontSize: 25,
                 },
                headerStyle: {
                    backgroundColor: theme.colors.white,
                },
                headerShadowVisible: false,
                backgroundColor: theme.colors.grey5,
                animationEnabled: true,
                headerTitleAlign: 'left',
            })}
            >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Camera" component={Cam} options={{unmountOnBlur: true}}/>
            <Tab.Screen name="Tab3" component={Tab3} />
            <Tab.Screen name="Setting" component={SettingsStackScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
    const { theme } = useTheme();
    return (
        <SettingsStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontWeight: "bold",
                color: theme.colors.black,
                fontSize: 25,
            },
            headerStyle: {
                backgroundColor: theme.colors.white,
            },
            headerShadowVisible: false,
            backgroundColor: theme.colors.grey5,
            animationEnabled: true,
            headerTitleAlign: 'left',

        }}>
            <SettingsStack.Screen name="Account" component={Account}  options={{headerShown: true}} />
            <SettingsStack.Screen name="Profile" component={Profile}  options={{headerShown: true}} />
        </SettingsStack.Navigator>
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
                        name="NonAuth"
                        component={HomeFlow}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
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
