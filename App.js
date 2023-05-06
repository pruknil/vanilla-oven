
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


