import React from "react";
import {
  Text,
  Center,
  useColorMode,
  NativeBaseProvider,
  StorageManager, 
  ColorMode
} from "native-base";

import AsyncStorage from '@react-native-async-storage/async-storage';

const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

const ThemeHelper = {
    getThemeBool: async function(){
      return (await colorModeManager.get()=='light')?true:false;
    },
    getTheme:  function(){
      return  colorModeManager.get()
    },
    setTheme: function(arg){
      colorModeManager.set(arg?'light':'dark');
    },
    helper3: function(param1, param2){

    }
}

export default ThemeHelper;
