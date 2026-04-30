import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthButton } from "../../../components/AuthButton";
import { AuthScreenShell } from "../../../components/AuthScreenShell";
import { AuthTextInput } from "../../../components/AuthTextInput";
import { colors } from "../../../theme/colors";
import { useAuth } from "../AuthContext";
import { signup } from "../authApi";

const roleOptions = {
  customer: {
    accent: colors.primary,
    badge: "New customer access",
    description: "Book salons, discover beauty experts, and manage appointments.",
    helper: "Browse salons and request beauty appointments.",
    label: "Customer",
    title: "Create customer account"
  },
  vendor: {
    accent: colors.accent,
    badge: "Vendor partner access",
    description: "List your salon, manage services, and receive bookings.",
    helper: "Manage your salon profile and booking requests.",
    label: "Vendor",
    title: "Create vendor account"
  }
};

const businessTypes = [
  "Salon",
  "Barber",
  "Makeup Artist",
  "Nail Studio",
  "Spa",
  "Home Service",
  "Other"
];

export function SignupScreen() {
  const { setSession } = useAuth();
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Salon");
  const [businessCity, setBusinessCity] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedRole = roleOptions[role];
  const isVendor = role === "vendor";

  async function handleSignup() {
    setError("");
    setLoading(true);

    try {
      const result = await signup({
        name,
        email,
        phone,
        password,
        role,
        ...(isVendor
          ? {
              businessAddress,
              businessCity,
              businessDescription,
              businessName,
              businessType
            }
          : {})
      });
      await setSession(result);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreenShell scroll>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: selectedRole.accent }]}>
            <Text style={styles.badgeText}>{selectedRole.badge}</Text>
          </View>
          <Text style={styles.title}>{selectedRole.title}</Text>
          <Text style={styles.subtitle}>
            {selectedRole.description}
          </Text>
        </View>

        <View
          style={[
            styles.roleTabs,
            { borderColor: `${selectedRole.accent}66` }
          ]}
        >
          {Object.entries(roleOptions).map(([optionRole, option]) => {
            const isActive = role === optionRole;

            return (
              <Pressable
                key={optionRole}
                onPress={() => setRole(optionRole)}
                style={[
                  styles.roleTab,
                  isActive && { backgroundColor: option.accent }
                ]}
              >
                <Text
                  style={[
                    styles.roleTabTitle,
                    isActive && styles.activeRoleTabTitle
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.roleTabHelper,
                    isActive && styles.activeRoleTabHelper
                  ]}
                >
                  {option.helper}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={[
            styles.form,
            { borderColor: `${selectedRole.accent}66` }
          ]}
        >
          <AuthTextInput
            label="Full name"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <AuthTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="you@example.com"
          />
          <AuthTextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+92 300 0000000"
          />
          <AuthTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="At least 8 characters"
          />

          {isVendor ? (
            <View style={styles.vendorFields}>
              <View>
                <Text style={styles.sectionTitle}>Business details</Text>
                <Text style={styles.sectionSubtitle}>
                  Tell customers and admins what kind of business you run.
                </Text>
              </View>

              <AuthTextInput
                label="Business name"
                value={businessName}
                onChangeText={setBusinessName}
                placeholder="Glow Beauty Salon"
              />

              <View style={styles.businessTypeGroup}>
                <Text style={styles.inputLabel}>Business type</Text>
                <View style={styles.businessTypeGrid}>
                  {businessTypes.map((type) => {
                    const isActive = businessType === type;

                    return (
                      <Pressable
                        key={type}
                        onPress={() => setBusinessType(type)}
                        style={[
                          styles.businessTypeOption,
                          isActive && { backgroundColor: selectedRole.accent }
                        ]}
                      >
                        <Text
                          style={[
                            styles.businessTypeText,
                            isActive && styles.activeBusinessTypeText
                          ]}
                        >
                          {type}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <AuthTextInput
                label="City / area"
                value={businessCity}
                onChangeText={setBusinessCity}
                placeholder="Lahore, Gulberg"
              />
              <AuthTextInput
                label="Business address"
                value={businessAddress}
                onChangeText={setBusinessAddress}
                placeholder="Street, market, or nearby landmark"
              />
              <AuthTextInput
                inputStyle={styles.multilineInput}
                label="Business description"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={businessDescription}
                onChangeText={setBusinessDescription}
                placeholder="Briefly describe your services"
              />
            </View>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AuthButton
            title="Create account"
            color={selectedRole.accent}
            loading={loading}
            onPress={handleSignup}
          />
        </View>
      </ScrollView>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
    paddingBottom: 12
  },
  header: {
    gap: 12
  },
  badge: {
    alignSelf: "flex-start",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  badgeText: {
    color: colors.mutedLight,
    fontSize: 13,
    fontWeight: "800"
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
  roleTabs: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 8
  },
  roleTab: {
    borderRadius: 18,
    flex: 1,
    gap: 4,
    minHeight: 94,
    padding: 12
  },
  roleTabTitle: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "900"
  },
  activeRoleTabTitle: {
    color: colors.textLight
  },
  roleTabHelper: {
    color: colors.mutedLight,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17
  },
  activeRoleTabHelper: {
    color: colors.textLight
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 28,
    borderWidth: 1,
    gap: 16,
    padding: 18
  },
  vendorFields: {
    gap: 16
  },
  sectionTitle: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "900"
  },
  sectionSubtitle: {
    color: colors.mutedLight,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
    marginTop: 4
  },
  inputLabel: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3
  },
  businessTypeGroup: {
    gap: 8
  },
  businessTypeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  businessTypeOption: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  businessTypeText: {
    color: colors.mutedLight,
    fontSize: 12,
    fontWeight: "800"
  },
  activeBusinessTypeText: {
    color: colors.textLight
  },
  multilineInput: {
    minHeight: 92,
    paddingTop: 16
  },
  error: {
    color: colors.danger,
    fontWeight: "600"
  }
});
