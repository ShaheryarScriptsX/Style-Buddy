import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getStoredSession } from "./src/features/auth/authStorage";
import { AuthProvider, useAuth } from "./src/features/auth/AuthContext";
import { ForgotPasswordScreen } from "./src/features/auth/screens/ForgotPasswordScreen";
import { LoginScreen } from "./src/features/auth/screens/LoginScreen";
import { SignupScreen } from "./src/features/auth/screens/SignupScreen";
import { HomeScreen } from "./src/features/home/HomeScreen";
import { colors } from "./src/theme/colors";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { session, setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedSession = await getStoredSession();
      setSession(storedSession);
      setIsLoading(false);
    }

    restoreSession();
  }, [setSession]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Style Buddy" }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "Create Account" }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: "Forgot Password" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </AuthProvider>
  );
}
