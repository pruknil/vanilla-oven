import React,{ useState }  from "react";
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
  View,
} from "native-base";

import NativeBaseIcon from "../../components/NativeBaseIcon";
import { useFocusEffect } from '@react-navigation/native';
import ThemeHelper from "../utils/Theme";
function HomeScreen({ navigation }) {
    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        console.debug('HomeScreen is focused')
        return () => {
          console.debug('HomeScreen is unfocused')
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );

    return (
      <NativeBaseProvider colorModeManager={ThemeHelper.getColorModeManager()}>
        <Center
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.50" }}
          px={4}
          flex={1}
        >


          <VStack space={5} alignItems="center">
            <NativeBaseIcon />
            <Heading size="lg">Welcome to NativeBase</Heading>
            <HStack space={2} alignItems="center">
              <Text>Edit</Text>
              <Box
                _web={{
                  _text: {
                    fontFamily: "monospace",
                    fontSize: "sm",
                  },
                }}
                px={2}
                py={1}
                _dark={{ bg: "blueGray.800" }}
                _light={{ bg: "blueGray.200" }}
              >
                App.js
              </Box>
              <Text>and save to reload.</Text>
            </HStack>
            <Link href="https://docs.nativebase.io" isExternal>
              <Text color="primary.500" underline fontSize={"xl"}>
                Learn NativeBase
              </Text>
            </Link>
            <ToggleDarkMode />
          </VStack>
        </Center>
      </NativeBaseProvider>
    );
  }


// Color Switch Component
function ToggleDarkMode() {
    const { colorMode, toggleColorMode ,setColorMode} = useColorMode();
    const [value, setValue] = useState(false);
    ThemeHelper.getThemeBool().then(function(value) {
        return setValue(value);
    })
        ThemeHelper.getTheme().then(
        function(value) {
            setColorMode(value)
        }
      );
    return (
      <HStack space={2} alignItems="center">
        <Text>Dark</Text>
        <Switch
          isChecked={value}
          onToggle={() => toggle(value,setValue,setColorMode)}
          aria-label={
            colorMode === "light" ? "switch to dark mode" : "switch to light mode"
          }
        />
        <Text>Light</Text>
      </HStack>
    );
  }

  function toggle(obj,setValue,setColorMode){
    setValue(!obj)
    ThemeHelper.setTheme(!obj);
    ThemeHelper.getTheme().then(
        function(value) {
            setColorMode(value)
        }
      );
  }


  export default HomeScreen;