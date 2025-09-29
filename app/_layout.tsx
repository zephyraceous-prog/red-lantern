import "react-native-reanimated";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@/components/button";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(index)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(255, 107, 53)", // Chinese learning app primary color
      background: "rgb(255, 255, 255)", // Clean white background
      card: "rgb(255, 255, 255)", // White cards/surfaces
      text: "rgb(44, 62, 80)", // Dark text for readability
      border: "rgb(233, 236, 239)", // Light border
      notification: "rgb(255, 107, 53)", // Primary color for notifications
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(10, 132, 255)", // System Blue (Dark Mode)
      background: "rgb(1, 1, 1)", // True black background for OLED displays
      card: "rgb(28, 28, 30)", // Dark card/surface color
      text: "rgb(255, 255, 255)", // White text for dark mode
      border: "rgb(44, 44, 46)", // Dark gray for separators/borders
      notification: "rgb(255, 69, 58)", // System Red (Dark Mode)
    },
  };
  return (
    <>
      <StatusBar style="auto" animated />
        <ThemeProvider
          value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
        >
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              {/* Main app group */}
              <Stack.Screen name="(index)" />
              
              {/* Chinese Learning App Screens */}
              <Stack.Screen name="lessons/[category]" options={{ headerShown: true }} />
              <Stack.Screen name="lesson/[id]" options={{ headerShown: true }} />
              <Stack.Screen name="conversation-practice" options={{ headerShown: true }} />
              <Stack.Screen name="daily-challenge" options={{ headerShown: true }} />
              <Stack.Screen name="profile" options={{ headerShown: true }} />
              <Stack.Screen name="settings" options={{ headerShown: true }} />

              {/* Modal Demo Screens */}
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [0.5, 0.8, 1.0],
                  sheetCornerRadius: 20,
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  headerShown: false,
                }}
              />
            </Stack>
            <SystemBars style={"auto"} />
          </GestureHandlerRootView>
        </ThemeProvider>
    </>
  );
}
