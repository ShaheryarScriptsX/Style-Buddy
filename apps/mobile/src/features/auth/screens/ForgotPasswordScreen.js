import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthButton } from "../../../components/AuthButton";
import { AuthScreenShell } from "../../../components/AuthScreenShell";
import { AuthTextInput } from "../../../components/AuthTextInput";
import { colors } from "../../../theme/colors";
import { forgotPassword } from "../authApi";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await forgotPassword({ email });
      setMessage(result.message);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreenShell>
      <View style={styles.header}>
        <View style={styles.iconBubble}>
          <Text style={styles.iconText}>?</Text>
        </View>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Enter your email. For local development this endpoint only confirms the
          request, and email delivery will be added later.
        </Text>
      </View>

      <View style={styles.form}>
        <AuthTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="you@example.com"
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthButton
          title="Send reset instructions"
          loading={loading}
          onPress={handleForgotPassword}
        />
      </View>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 14,
    marginBottom: 24
  },
  iconBubble: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 58,
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    width: 58
  },
  iconText: {
    color: colors.textLight,
    fontSize: 28,
    fontWeight: "900"
  },
  title: {
    color: colors.textLight,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -0.7
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
  message: {
    color: colors.mutedLight,
    fontWeight: "700"
  },
  error: {
    color: colors.danger,
    fontWeight: "600"
  }
});
