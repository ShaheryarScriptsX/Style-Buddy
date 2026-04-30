import { createContext, useContext, useMemo, useState } from "react";
import { clearSession, saveSession } from "./authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(null);

  async function setSession(nextSession) {
    setSessionState(nextSession);

    if (nextSession) {
      await saveSession(nextSession);
    } else {
      await clearSession();
    }
  }

  const value = useMemo(
    () => ({
      session,
      setSession,
      logout: () => setSession(null)
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
