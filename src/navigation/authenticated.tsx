import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/authenticated/Home";

const Tab = createBottomTabNavigator();

export default function AuthenticatedStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}