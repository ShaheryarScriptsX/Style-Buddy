import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme/colors";

export function AuthTextInput({ inputStyle, label, secureTextEntry, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, isFocused && styles.inputWrapFocused]}>
        <TextInput
          placeholderTextColor={colors.muted}
          style={[styles.input, isPassword && styles.passwordInput, inputStyle]}
          autoCapitalize="none"
          secureTextEntry={isPassword && !isPasswordVisible}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {isPassword ? (
          <Pressable
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
            hitSlop={10}
            onPress={() => setIsPasswordVisible((current) => !current)}
            style={styles.eyeButton}
          >
            <Ionicons
              color={isFocused ? colors.primary : colors.muted}
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8
  },
  label: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3
  },
  inputWrap: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 56,
    overflow: "hidden"
  },
  inputWrapFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18
  },
  input: {
    color: colors.text,
    fontSize: 16,
    minHeight: 56,
    paddingHorizontal: 16
  },
  passwordInput: {
    paddingRight: 52
  },
  eyeButton: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    right: 14,
    top: 0
  }
});
