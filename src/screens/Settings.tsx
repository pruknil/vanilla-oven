import React, { useEffect } from "react";
import {
  Text,
  Center,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Box,
  Button,
} from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import ThemeHelper from "../utils/Theme";

function SettingsScreen() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.debug('SettingsScreen is focused')
      return () => {
        console.debug('SettingsScreen is unfocused')
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  useEffect(() => {
    console.debug('SettingsScreen is useEffect')

  });
  
  return (
    <NativeBaseProvider colorModeManager={ThemeHelper.getColorModeManager()}>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Text>Settings!</Text>

      </Center>
      
    </NativeBaseProvider>

  );
}

export default SettingsScreen;