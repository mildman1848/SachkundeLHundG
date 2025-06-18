import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'progress';

export const saveProgress = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('❌ Fehler beim Speichern des Fortschritts:', e);
  }
};

export const loadProgress = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  } catch (e) {
    console.error('❌ Fehler beim Laden des Fortschritts:', e);
    return {};
  }
};

export const resetProgress = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('🧹 Fortschritt zurückgesetzt.');
  } catch (e) {
    console.error('❌ Fehler beim Zurücksetzen des Fortschritts:', e);
  }
};
