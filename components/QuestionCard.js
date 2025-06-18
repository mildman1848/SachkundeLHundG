// components/QuestionCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function QuestionCard({ question, selected, toggleSelect, showResult, getAnswerColor }) {
  const { colors } = useTheme();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, color: colors.text }}>
        {question.text}
      </Text>

      {question.answers.map((answer, index) => {
        const backgroundColor = showResult ? getAnswerColor(index) : (selected.includes(index) ? colors.primary : colors.card);
        const textColor = showResult || selected.includes(index) ? 'white' : colors.text;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggleSelect(index)}
            style={{
              backgroundColor,
              padding: 12,
              marginBottom: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border
            }}>
            <Text style={{ color: textColor, fontSize: 16 }}>{answer}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
