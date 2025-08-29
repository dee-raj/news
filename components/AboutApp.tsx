import React from "react";
import {
    Alert, Text, StyleSheet, View,
    Linking, TouchableOpacity, ScrollView
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useAppContext } from "../context/AppContext";

const AboutApp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { theme } = useAppContext();

    const openEmail = async () => {
        try {
            const email = process.env.DEV_EMAIL || "www.moon.knight73@gmail.com";
            const subject = encodeURIComponent("Feedback on News App");
            const body = encodeURIComponent(
                `Hi Dhurbaraj Joshi,\n\nI would like to share some feedback...`
            );
            const url = `mailto:${email}?subject=${subject}&body=${body}`;
            await Linking.openURL(url);
        } catch (err) {
            console.error("Failed to open email:", err);
            Alert.alert("Error", "Something went wrong while trying to open email.");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                theme === "dark" && styles.containerDark
            ]}
        >
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons
                    name="arrow-back"
                    size={22}
                    color={theme === 'dark' ? "#FFF" : "#000"}
                    style={{ marginRight: 6 }}
                />
                <Text style={styles.closeText}>Go Back</Text>
            </TouchableOpacity>

            <Text style={[styles.heading, theme === "dark" && styles.textDark]}>
                About This App
            </Text>
            <Text style={[styles.text, theme === "dark" && styles.textDark]}>
                This is a news aggregator delivering the latest news in multiple languages.
                You can bookmark articles, switch themes, and customize your language preference.
            </Text>
            <Text style={[styles.text, theme === "dark" && styles.textDark]}>
                Version: 1.0.0
            </Text>

            <Text style={[styles.heading, theme === "dark" && styles.textDark]}>
                About Developer
            </Text>
            <Text style={[styles.text, theme === "dark" && styles.textDark]}>
                Developed by <Text style={styles.devName}>{"Dhurbaraj Joshi"}</Text>
            </Text>

            <View style={styles.linksContainer}>
                <TouchableOpacity
                    style={styles.linkRow}
                    onPress={async () => await Linking.openURL("https://github.com/dee-raj")}
                >
                    <Ionicons
                        name="logo-github"
                        color={theme === "dark" ? "#FFF" : "#000"}
                        size={24}
                    />
                    <Text style={[styles.link, theme === "dark" && styles.linkDark]}>
                        GitHub Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkRow}
                    onPress={openEmail}
                >
                    <Ionicons
                        name="mail-unread-outline"
                        color={theme === "dark" ? "#FFF" : "#000"}
                        size={24}
                    />
                    <Text style={[styles.link, theme === "dark" && styles.linkDark]}>
                        Contact/Feedback via Email
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    containerDark: {
        backgroundColor: "#1c1c1c",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
        color: "#333",
        textAlign: 'justify',
    },
    textDark: {
        color: "#fff",
    },
    devName: {
        fontFamily: 'monospace',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    closeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    closeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    linksContainer: {
        marginTop: 20,
        gap: 12,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    link: {
        fontSize: 16,
        color: "#007AFF",
    },
    linkDark: {
        color: "#3399ff",
    },
});

export default AboutApp;
