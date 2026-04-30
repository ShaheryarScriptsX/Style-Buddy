import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AuthButton } from "../../components/AuthButton";
import { colors } from "../../theme/colors";
import { useAuth } from "../auth/AuthContext";

export function HomeScreen() {
  const { session, logout } = useAuth();
  const user = session?.user;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true
    }).start();
  }, [fade]);

  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blob} />
      <Animated.View style={[styles.content, { opacity: fade }]}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Logged in locally</Text>
          <Text style={styles.title}>Hello, {user?.name || "Stylemate"}!</Text>
          <Text style={styles.subtitle}>
            Authentication is connected to the local Style Buddy API. The next
            screens can build from here: vendor search, profiles, services, and
            booking requests.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24/7</Text>
            <Text style={styles.statLabel}>Booking ready</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>MVP</Text>
            <Text style={styles.statLabel}>Auth active</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user?.role}</Text>
        </View>

        <AuthButton title="Logout" variant="secondary" onPress={logout} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    overflow: "hidden"
  },
  blob: {
    backgroundColor: colors.primaryDark,
    borderRadius: 999,
    height: 320,
    opacity: 0.55,
    position: "absolute",
    right: -120,
    top: -120,
    width: 320
  },
  content: {
    gap: 20,
    padding: 24
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
    padding: 22
  },
  eyebrow: {
    color: colors.mutedLight,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.textLight,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedLight,
    fontSize: 16,
    lineHeight: 24
  },
  statsRow: {
    flexDirection: "row",
    gap: 12
  },
  statCard: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 20,
    flex: 1,
    padding: 16
  },
  statValue: {
    color: colors.primaryDark,
    fontSize: 22,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4
  },
  details: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 18,
    gap: 6,
    padding: 18
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8
  }
});
