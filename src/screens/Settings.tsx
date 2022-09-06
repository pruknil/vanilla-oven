import React, { useEffect } from "react";
import {
  Text,
  Center,
  ScrollView,
  NativeBaseProvider,
  extendTheme,
  Box,
  Button,
  VStack,
  Image,
  Hidden,
  AddIcon,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Select,
  Stack,
  TextArea,
  Spacer,
  Avatar,
  ChevronRightIcon,
  Icon,
} from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import ThemeHelper from "../utils/Theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        flex={1} safeArea
      > 
<Box bg="blueGray.50" p="0" w="full" rounded="0" 
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
>
    <HStack alignItems="flex-start" justifyContent="space-between">
    <Avatar bg="green.500" alignSelf="center" size="sm"  source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>AJ</Avatar>
            <Input size="sm" placeholder="Search" w={"80%"}
              _light={{
                placeholderTextColor: "blueGray.400"
              }} _dark={{
                placeholderTextColor: "blueGray.50"
              }}
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="magnify" />} size={5} ml="2" color="muted.400" />}
            />
      <Icon as={MaterialCommunityIcons} name="bell" size={"xl"}/>
    </HStack>
</Box>
<ScrollView w="full" h="80">

<Box bg="blueGray.50" p="3" w="full" rounded="8">
    <HStack alignItems="flex-start">
      <Text fontSize="12" color="gray.500" fontWeight="medium">
        Business
      </Text>
      <Spacer />
      <Text fontSize="10" color="gray.400">
        1 month ago
      </Text>
    </HStack>
    <Text mt="3" fontWeight="medium" fontSize="20">
      Marketing License
    </Text>
    <Text mt="2" fontSize="14" color="gray.500">
      Unlock powerfull time-saving tools for creating email delivery and
      collecting marketing data
    </Text>
    <Text mt="2" fontSize="12" fontWeight="medium" color="cyan.600">
      Read More
    </Text>
  </Box>


</ScrollView>

      


      


      </Center>
      
    </NativeBaseProvider>

  );
}

export default SettingsScreen;