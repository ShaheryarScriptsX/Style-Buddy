import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export function AuthButton({
  color = colors.primary,
  loading,
  onPress,
  title,
  variant = "primary"
}) {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      style={[
        styles.button,
        !isSecondary && { backgroundColor: color, shadowColor: color },
        isSecondary && styles.secondaryButton,
        loading && styles.disabled
      ]}
    >
      {!isSecondary ? <View pointerEvents="none" style={styles.glow} /> : null}
      {loading ? (
        <ActivityIndicator color={isSecondary ? colors.primary : "#FFFFFF"} />
      ) : (
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 18,
    minHeight: 56,
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 18,
    shadowColor: colors.primary,
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 24
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    shadowOpacity: 0
  },
  disabled: {
    opacity: 0.7
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.2
  },
  secondaryText: {
    color: colors.textLight
  },
  glow: {
    backgroundColor: "rgba(255, 255, 255, 0.24)",
    borderRadius: 999,
    height: 80,
    position: "absolute",
    right: -24,
    top: -42,
    width: 120
  }
});
