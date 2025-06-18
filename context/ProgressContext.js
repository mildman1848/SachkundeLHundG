import React, { createContext, useState, useEffect } from 'react';
import { loadProgress, saveProgress, resetProgress } from '../utils/progressStore';

export const ProgressContext = createContext({
  progress: {},
  updateProgress: () => {},
  resetProgress: () => {}
});

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    (async () => {
      const stored = await loadProgress();
      setProgress(stored);
    })();
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  /**
   * Fortschritt für eine Kategorie aktualisieren.
   * @param {string} category
   * @param {number} correctCount - Anzahl korrekt beantworteter Fragen
   * @param {number} targetCount - Zielanzahl (Standard: 3)
   */
  const updateProgress = (category, correctCount, targetCount = 3) => {
    setProgress(prev => ({
      ...prev,
      [category]: Math.min(1, correctCount / targetCount)
    }));
  };

  const resetAll = async () => {
    await resetProgress();
    setProgress({});
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, resetProgress: resetAll }}>
      {children}
    </ProgressContext.Provider>
  );
};
