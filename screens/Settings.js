import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../context/ThemeContext';
import { ProgressContext } from '../context/ProgressContext';
import { resetHistory } from '../utils/historyStore';

export default function Settings() {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { resetProgress } = useContext(ProgressContext);
  const { colors } = useTheme();

  const handleReset = () => {
    Alert.alert(
      "Fortschritt zurücksetzen",
      "Bist du sicher, dass du deinen gesamten Lernfortschritt löschen willst?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Ja, löschen",
          style: "destructive",
          onPress: async () => {
            await resetProgress();
            await resetHistory();
            Alert.alert("Erledigt", "Fortschritt gelöscht.");
          }
        }
      ]
    );
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
        Einstellungen
      </Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 10, marginBottom: 16 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Darkmode {mode === 'dark' ? 'deaktivieren' : 'aktivieren'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleReset}
        style={{ backgroundColor: 'crimson', padding: 14, borderRadius: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Fortschritt zurücksetzen
        </Text>
      </TouchableOpacity>
    </View>
  );
}
