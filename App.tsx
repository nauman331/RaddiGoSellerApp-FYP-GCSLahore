import "./global.css"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthenticatedStack from "./src/navigation/authenticated"
import UnauthenticatedStack from "./src/navigation/unauthenticated"
import { View } from "react-native";
import React from "react";

const App: React.FC = () => {
  const isAuthenticated = false

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View className="flex-1 bg-gray-100 p-3">
          {
            isAuthenticated ?
              <AuthenticatedStack />
              : <UnauthenticatedStack />
          }
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App