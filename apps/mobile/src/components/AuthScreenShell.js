import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { colors } from "../theme/colors";

export function AuthScreenShell({ children, scroll = false }) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(28)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          })
        ])
      )
    ]).start();
  }, [fade, pulse, rise]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08]
  });
  const reverseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1.12, 1]
  });

  const content = (
    <Animated.View
      style={[
        styles.content,
        scroll && styles.scrollContent,
        {
          opacity: fade,
          transform: [{ translateY: rise }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <Animated.View
        pointerEvents="none"
        style={[styles.blob, styles.blobPrimary, { transform: [{ scale }] }]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.blob,
          styles.blobAccent,
          { transform: [{ scale: reverseScale }] }
        ]}
      />
      <View pointerEvents="none" style={styles.grid} />
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    overflow: "hidden"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    width: "100%"
  },
  scrollContent: {
    justifyContent: "flex-start",
    paddingBottom: 36,
    paddingTop: 36
  },
  blob: {
    borderRadius: 999,
    opacity: 0.75,
    position: "absolute"
  },
  blobPrimary: {
    backgroundColor: colors.primary,
    height: 260,
    right: -100,
    top: -90,
    width: 260
  },
  blobAccent: {
    backgroundColor: colors.accent,
    bottom: -120,
    height: 280,
    left: -120,
    width: 280
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 36,
    borderWidth: 1,
    bottom: 28,
    left: 24,
    position: "absolute",
    right: 24,
    top: 28
  }
});
