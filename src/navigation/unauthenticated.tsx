import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/unauthenticated/SignIn";
import InitialScreen from "../screens/unauthenticated/InitialScreen";

const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: "fade" }}>
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    );
}