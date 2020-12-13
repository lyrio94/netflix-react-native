import React, { useEffect, useState } from "react";
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./routes/Tabs";
import Camera from "./screen/Camera";
import ChooseIcon from "./screen/ChooseIcon";
import ProfileToEdit from "./screen/ProfileToEdit";
import { ProfileContext } from "./context/ProfileContext";
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const AppNetflix = () => {
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      Alert.alert(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage.notification),
      );
    });


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const [user, newUser] = useState("Jose");
  console.log("user", user);
  return (
    <ProfileContext.Provider value={{ user, newUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChooseIcon"
            component={ChooseIcon}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ProfileToEdit"
            component={ProfileToEdit}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileContext.Provider>
  );
};
AppRegistry.registerComponent(appName, () => AppNetflix);
export default AppNetflix;
