import React from "react";
import {
  Text,
  Center,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { useFocusEffect } from '@react-navigation/native';

function SettingsScreen() {
  const {
    colorMode,
    toggleColorMode
  } = useColorMode();
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
  return (
    <NativeBaseProvider  theme={extendTheme({  })}>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Text>Settings!</Text>

        <Text bold fontSize="lg">
            {colorMode}
          </Text>
      </Center>
    </NativeBaseProvider>

  );
}

export default SettingsScreen;