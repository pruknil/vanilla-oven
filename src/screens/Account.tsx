import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {Text, View} from 'react-native';
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account!</Text>
      </View>
    );
  }

  export default AccountScreen;