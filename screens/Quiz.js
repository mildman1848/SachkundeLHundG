import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';

import questionsData from '../data/questions.json';
import QuestionCard from '../components/QuestionCard';
import { ProgressContext } from '../context/ProgressContext';
import { loadHistory, updateHistory } from '../utils/historyStore';
import { weightedShuffle } from '../utils/shuffle';

export default function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState({});

  const { updateProgress } = useContext(ProgressContext);
  const theme = useTheme();

  useEffect(() => {
    const load = async () => {
      const h = await loadHistory();
      setHistory(h);

      const enriched = questionsData.map(q => ({
        ...q,
        history: h[q.id] || []
      }));

      const shuffled = weightedShuffle(enriched);
      setQuestions(shuffled);
      setCurrent(shuffled[0]);
    };

    load();
  }, []);

  const toggleSelect = (index) => {
    if (showResult) return;
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getAnswerColor = (index) => {
    if (!showResult) return theme.colors.card;
    const correct = current.correct.includes(index);
    const wasSelected = selected.includes(index);
    if (correct && wasSelected) return 'green';
    if (!correct && wasSelected) return 'red';
    if (correct && !wasSelected) return 'red';
    return theme.colors.card;
  };

  const handleCheck = async () => {
    setShowResult(true);
    const correct = current.correct.sort().join(',');
    const given = selected.sort().join(',');
    const isCorrect = correct === given;

    await updateHistory(current.id, isCorrect);
    updateProgress(current.category, countCorrect(current.id, isCorrect, history));

    setTimeout(() => {
      const next = questions.find(q => q.id !== current.id && (history[q.id]?.filter(r => r === true).length || 0) < 3);
      if (next) {
        setCurrent(next);
        setSelected([]);
        setShowResult(false);
      }
    }, 1200);
  };

  const countCorrect = (id, isCorrect, h) => {
    const previous = h[id] || [];
    const updated = [...previous.slice(-2), isCorrect];
    return updated.filter(Boolean).length;
  };

  if (!current) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 10 }}>Fragen werden geladen...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 }}>
          Sachkunde-Prüfung NRW
        </Text>

        <QuestionCard
          question={current}
          selected={selected}
          toggleSelect={toggleSelect}
          showResult={showResult}
          getAnswerColor={getAnswerColor}
        />

        <TouchableOpacity
          onPress={handleCheck}
          disabled={showResult}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 12,
            borderRadius: 8,
            marginTop: 12
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
            {showResult ? 'Wird geladen…' : 'Lösung anzeigen'}
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: theme.colors.text, marginBottom: 4 }}>
            Fortschritt dieser Frage: {countCorrect(current.id, false, history)} von 3
          </Text>
          <ProgressBar
            progress={countCorrect(current.id, false, history) / 3}
            color={theme.colors.primary}
          />
        </View>
      </View>
    </ScrollView>
  );
}
