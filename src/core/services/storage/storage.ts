import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("setItem error", e);
  }
};

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("getItem error", e);
  }
};

const removeItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.log("removeItem error", e);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log("clear error", e);
  }
};

export { setItem, getItem, removeItem, clearStorage };
