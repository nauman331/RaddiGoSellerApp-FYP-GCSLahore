import "./global.css"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import AuthenticatedStack from "./src/navigation/authenticated"
import UnauthenticatedStack from "./src/navigation/unauthenticated"
import { View } from "react-native";

const App = () => {
  const isAuthenticated = false

  return (
    <NavigationContainer>
      <View className="flex-1 bg-white p-3">
        {
          isAuthenticated ?
            <AuthenticatedStack />
            : <UnauthenticatedStack />
        }
      </View>
    </NavigationContainer>
  )
}

export default App