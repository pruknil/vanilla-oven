import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Text, View, Dimensions,StyleSheet} from 'react-native';
import { Center, NativeBaseProvider } from 'native-base';
import ThemeHelper from '../utils/Theme';

function MapScreen() {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = 9.965520472473635;
    const LONGITUDE = 98.63465356467604;
    const LATITUDE_DELTA = 0.0050;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const [mapRegion, setmapRegion] = useState({
      latitude: LATITUDE,
      longitude: LONGITUDE, latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

    
    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        console.debug('MapScreen is focused')
        return () => {
          console.debug('MapScreen is unfocused')
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
        <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
  
            <Marker coordinate={mapRegion} description={"Bakery and Beverages"} title='Vanilla Oven'>
  
            </Marker>
          </MapView>
        </View>

      </Center>
      
    </NativeBaseProvider>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
export default MapScreen;