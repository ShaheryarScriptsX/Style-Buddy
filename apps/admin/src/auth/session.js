const sessionKey = "style-buddy-admin-session";

export function getStoredSession() {
  const rawSession = localStorage.getItem(sessionKey);
  return rawSession ? JSON.parse(rawSession) : null;
}

export function saveSession(session) {
  localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(sessionKey);
}
