// utils/shuffle.js

/**
 * Shuffle-Algorithmus mit Gewichtung:
 * Fragen mit mehr Fehlern in den letzten 3 Antworten bekommen ein höheres Zufallsgewicht.
 */
export const weightedShuffle = (questions) => {
  const copy = [...questions];

  // Berechne ein Gewicht für jede Frage
  const weighted = copy.map((q) => {
    const history = q.history || [];
    const recent = history.slice(-3);
    const wrongCount = recent.filter(ans => !ans).length;

    // Gewicht: Basis 1 + bis zu 1 Bonus (bei 3x falsch = 2.0 Gewicht)
    const weight = 1 + wrongCount * 0.33;
    return { question: q, weight };
  });

  // Erzeuge gewichtete Zufallswerte
  const randomized = weighted
    .map(({ question, weight }) => ({
      question,
      sortKey: Math.random() ** (1 / weight)
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((item) => item.question);

  return randomized;
};
