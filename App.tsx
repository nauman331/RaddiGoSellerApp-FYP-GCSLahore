import "./global.css"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CombinedNav from "./src/navigation/CombinedNav";
import { View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/store/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              <View className="flex-1 bg-gray-100 p-2">
                <AlertNotificationRoot>
                  <CombinedNav />
                </AlertNotificationRoot>
              </View>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  )
}

export default App