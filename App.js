import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Dashboard from './screens/Dashboard';
import Quiz from './screens/Quiz';
import Settings from './screens/Settings';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { mode } = useContext(ThemeContext);
  const selectedTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ProgressProvider>
      <NavigationContainer theme={selectedTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              if (route.name === 'Quiz') iconName = focused ? 'help-circle' : 'help-circle-outline';
              if (route.name === 'Einstellungen') iconName = focused ? 'settings' : 'settings-outline';
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Quiz" component={Quiz} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Einstellungen" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
