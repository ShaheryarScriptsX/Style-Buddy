import AsyncStorage from "@react-native-async-storage/async-storage";

const sessionKey = "style-buddy-session";

export async function getStoredSession() {
  const rawSession = await AsyncStorage.getItem(sessionKey);
  return rawSession ? JSON.parse(rawSession) : null;
}

export async function saveSession(session) {
  await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
}

export async function clearSession() {
  await AsyncStorage.removeItem(sessionKey);
}
