// Sachkunde-App Hauptkomponente (React Native + Expo, Android)
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

// Platzhalter für Fragenkatalog und Lösungen
import questions from './data/questions.json';

const getRandomQuestion = (questionList, answeredQuestions) => {
  const unanswered = questionList.filter(q => (answeredQuestions[q.id] || 0) < 3);
  return unanswered[Math.floor(Math.random() * unanswered.length)];
};

export default function App() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    const newQuestion = getRandomQuestion(questions, answeredQuestions);
    setQuestion(newQuestion);
    setSelected([]);
    setShowResult(false);
  }, [answeredQuestions]);

  const toggleSelect = (key) => {
    if (showResult) return;
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const checkAnswer = () => {
    setShowResult(true);
    const correct = question.correct;
    const isCorrect = correct.length === selected.length && selected.every(a => correct.includes(a));
    if (isCorrect) {
      setAnsweredQuestions(prev => ({
        ...prev,
        [question.id]: (prev[question.id] || 0) + 1
      }));
    }
  };

  const getAnswerColor = (key) => {
    if (!showResult) return '#ccc';
    const isCorrect = question.correct.includes(key);
    const wasSelected = selected.includes(key);
    if (isCorrect && wasSelected) return 'green';
    if (!isCorrect && wasSelected) return 'red';
    if (isCorrect && !wasSelected) return 'red';
    return '#ccc';
  };

  const getProgress = () => {
    const total = questions.length;
    const done = Object.values(answeredQuestions).filter(v => v >= 3).length;
    return done / total;
  };

  if (!question) return <Text>Fragen werden geladen...</Text>;

  return (
    <SafeAreaView style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sachkunde-App (LHundG)</Text>
      <Text style={{ marginVertical: 10 }}>Frage:</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{question.text}</Text>
      <FlatList
        data={question.answers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: getAnswerColor(index),
              padding: 10,
              marginBottom: 10,
              borderRadius: 10
            }}
            onPress={() => toggleSelect(index)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={checkAnswer}
        style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Lösung anzeigen</Text>
      </TouchableOpacity>
      <Text>Fortschritt: {(getProgress() * 100).toFixed(1)}%</Text>
      <ProgressBar progress={getProgress()} color="green" style={{ height: 10, marginTop: 5 }} />
    </SafeAreaView>
  );
}
