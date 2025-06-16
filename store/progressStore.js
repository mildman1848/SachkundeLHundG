import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProgress = async (data) => {
  try {
    await AsyncStorage.setItem('progress', JSON.stringify(data));
  } catch (e) {
    console.error('Fehler beim Speichern des Fortschritts', e);
  }
};

export const loadProgress = async () => {
  try {
    const value = await AsyncStorage.getItem('progress');
    return value != null ? JSON.parse(value) : {};
  } catch (e) {
    console.error('Fehler beim Laden des Fortschritts', e);
    return {};
  }
};
