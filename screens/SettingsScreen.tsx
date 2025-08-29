import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';

import AboutApp from "../components/AboutApp";
import { LanguageType } from "../types/navigation";
import { useAppContext } from "../context/AppContext";

const flags: Record<LanguageType, string> = {
    en: "https://flagcdn.com/w320/us.png",
    hi: "https://flagcdn.com/w320/in.png",
    pa: "https://flagcdn.com/w320/in.png",
    gu: "https://flagcdn.com/w320/in.png",
    mr: "https://flagcdn.com/w320/in.png",
    es: "https://flagcdn.com/w320/es.png",
    fr: "https://flagcdn.com/w320/fr.png",
    ne: "https://flagcdn.com/w320/np.png",
    jp: "https://flagcdn.com/w320/jp.png",
    ko: "https://flagcdn.com/w320/kr.png",
};

const languageNames: Record<LanguageType, string> = {
    en: "English",
    hi: "हिंदी",
    es: "Española",
    fr: "Français",
    ne: "नेपाली",
    jp: "日本語",
    ko: "한국인",
    pa: "पंजाबी",
    mr: "मराठी",
    gu: "ગુજરાતી",
};

const SettingsScreen: React.FC = () => {
    const { theme, setTheme, language, setLanguage, loadingSettings } = useAppContext();
    if (loadingSettings) return null;

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    const changeLanguage = (lang: LanguageType) => setLanguage(lang);
    const [visible, setVisible] = useState(false);

    return (
        <View style={{ flex: 1, marginBottom: 1, paddingTop: 24, backgroundColor: "#111" }}>
            <ScrollView style={[styles.container, theme === "dark" && styles.containerDark]}>

                {/* Theme Section */}
                <Text style={[styles.heading, theme === "dark" && styles.textDark]}>
                    Theme
                </Text>
                <View style={[styles.themeRow, theme === "dark" && { borderColor: "#FFE" }]}>
                    <Text style={theme === "dark" ? styles.textDark : undefined}>
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                    </Text>
                    <Switch
                        value={theme === "dark"}
                        onValueChange={toggleTheme}
                        thumbColor={theme === "dark" ? "#fff" : "#007AFF"}
                        trackColor={{ false: "#ccc", true: "#555" }}
                    />
                </View>

                {/* Language Section */}
                <Text style={[styles.heading, theme === "dark" && styles.textDark]}>
                    Language
                </Text>
                <View style={styles.languageContainer}>
                    {(Object.keys(flags) as LanguageType[]).map((lang) => {
                        const isSelected = language === lang;
                        return (
                            <TouchableOpacity
                                key={lang}
                                onPress={() => changeLanguage(lang)}
                                style={[
                                    styles.langRow,
                                    isSelected && theme === "dark" && styles.langRowDark,
                                    isSelected && theme === 'light' && { backgroundColor: "#DDD" }
                                ]}
                            >
                                <View style={[
                                    styles.checkbox,
                                    isSelected && styles.checkboxActive,
                                    theme === "dark" && styles.checkboxDark,
                                    isSelected && theme === "dark" && styles.checkboxActiveDark,
                                ]}
                                />
                                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.langText, theme === "dark" && styles.textDark]}>
                                        {languageNames[lang]}
                                    </Text>
                                    <Image source={{ uri: flags[lang] }} style={styles.flag} />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* About This App & Developer */}
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 52, marginTop: 8 }}>
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                        style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                    >
                        <Ionicons name="information-circle-outline" size={20} color="green" />
                        <Text style={{ color: "green", fontSize: 16, fontWeight: "600" }}>
                            About App
                        </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={visible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.overlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.sheet}>
                                    <AboutApp onClose={() => setVisible(false)} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: "#FFE" },
    containerDark: { backgroundColor: "#1c1c1c" },
    heading: { fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#000" },
    textDark: { color: "#fff" },
    themeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 12,
        borderRadius: 6
    },
    languageContainer: { marginTop: 10 },
    langRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomColor: "#777",
        borderBottomWidth: 1,
    },
    langRowDark: { backgroundColor: "#444" },
    langText: { fontSize: 16, fontWeight: 'bold' },
    flag: { width: 40, height: 40, borderRadius: 3 },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 4,
    },
    checkboxActive: {
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
    },
    checkboxDark: {
        borderColor: "#ccc",
    },
    checkboxActiveDark: {
        backgroundColor: "#3399ff",
        borderColor: "#3399ff",
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheet: {
        height: "64%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
});

export default SettingsScreen;
