import "./global.css"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CombinedNav from "./src/navigation/CombinedNav";
import { View } from "react-native";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, RootState } from "./src/store/store";

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <View className="flex-1 bg-gray-100 p-3">
              <CombinedNav />
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App