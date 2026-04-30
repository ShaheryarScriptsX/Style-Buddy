import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthButton } from "../../../components/AuthButton";
import { AuthScreenShell } from "../../../components/AuthScreenShell";
import { AuthTextInput } from "../../../components/AuthTextInput";
import { colors } from "../../../theme/colors";
import { useAuth } from "../AuthContext";
import { login } from "../authApi";

export function LoginScreen({ navigation }) {
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const result = await login({ email, password });
      await setSession(result);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreenShell>
      <View style={styles.hero}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>S</Text>
          </View>
          <View>
            <Text style={styles.logo}>Style Buddy</Text>
            <Text style={styles.tagline}>Beauty booking reimagined</Text>
          </View>
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Book salons, discover beauty experts, and manage appointments from one
          smart hub.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Sign in</Text>
          <Text style={styles.formMeta}>Secure local authentication</Text>
        </View>

        <AuthTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="you@example.com"
        />
        <AuthTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Your password"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthButton title="Login" loading={loading} onPress={handleLogin} />

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>

        <AuthButton
          title="Create new account"
          variant="secondary"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 16,
    marginBottom: 22
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 50,
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    width: 50
  },
  brandMarkText: {
    color: colors.textLight,
    fontSize: 24,
    fontWeight: "900"
  },
  logo: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "900"
  },
  tagline: {
    color: colors.mutedLight,
    fontSize: 13,
    fontWeight: "700"
  },
  title: {
    color: colors.textLight,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1
  },
  subtitle: {
    color: colors.mutedLight,
    fontSize: 16,
    lineHeight: 24
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 28,
    borderWidth: 1,
    gap: 16,
    padding: 18
  },
  formHeader: {
    gap: 4,
    marginBottom: 2
  },
  formTitle: {
    color: colors.textLight,
    fontSize: 20,
    fontWeight: "900"
  },
  formMeta: {
    color: colors.mutedLight,
    fontSize: 13,
    fontWeight: "700"
  },
  link: {
    color: colors.mutedLight,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center"
  },
  error: {
    color: colors.danger,
    fontWeight: "600"
  }
});
