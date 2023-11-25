import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};


export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value
    } else {
      return false
    }
  } catch (error) {
    console.log('Error retrieving value: ', error);
    return false
  }
};