// utils/historyStore.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'question_history';

/**
 * Lädt den Antwortverlauf aller Fragen.
 * @returns {Promise<Object>} z. B. { "42": [true, false, true], "17": [false] }
 */
export const loadHistory = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : {};
  } catch (e) {
    console.error('❌ Fehler beim Laden der Antwortverläufe:', e);
    return {};
  }
};

/**
 * Aktualisiert den Verlauf für eine einzelne Frage (max. 3 letzte Einträge).
 * @param {number|string} id - Frage-ID
 * @param {boolean} isCorrect - Ob die Antwort richtig war
 */
export const updateHistory = async (id, isCorrect) => {
  try {
    const all = await loadHistory();
    const prev = all[id] || [];
    const updated = [...prev.slice(-2), isCorrect]; // Nur die letzten 3 Einträge behalten
    all[id] = updated;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('❌ Fehler beim Speichern des Antwortverlaufs:', e);
  }
};

/**
 * Löscht den gesamten Antwortverlauf (z. B. für Reset).
 */
export const resetHistory = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('🧹 Antwortverlauf zurückgesetzt.');
  } catch (e) {
    console.error('❌ Fehler beim Zurücksetzen des Antwortverlaufs:', e);
  }
};
