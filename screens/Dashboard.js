// screens/Dashboard.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, useColorScheme } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { ProgressContext } from '../context/ProgressContext';

export default function Dashboard() {
  const { progress } = useContext(ProgressContext);
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16 }}>
      <Text style={{ fontSize: 24, color: theme.colors.text, marginBottom: 16 }}>
        Dein Lernfortschritt
      </Text>
      {Object.entries(progress).map(([category, value]) => (
        <View key={category} style={{ marginBottom: 12 }}>
          <Text style={{ color: theme.colors.text, marginBottom: 4 }}>
            {category} ({Math.round(value * 100)}%)
          </Text>
          <ProgressBar progress={value} color={theme.colors.primary} />
        </View>
      ))}
    </ScrollView>
  );
}
