import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuestionCard({ question, selected, toggleSelect, showResult, getAnswerColor }) {
  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{question.text}</Text>
      {question.answers.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: getAnswerColor(index),
            padding: 10,
            marginBottom: 10,
            borderRadius: 10
          }}
          onPress={() => toggleSelect(index)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
