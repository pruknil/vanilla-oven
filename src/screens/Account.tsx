import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from "native-base";
function AccountScreen() {
    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        console.debug('AccountScreen is focused')
        return () => {
          console.debug('AccountScreen is unfocused')
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );
    return (
      <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Text>Account!</Text>
        </Center>
    </NativeBaseProvider>
    );
  }

  export default AccountScreen;