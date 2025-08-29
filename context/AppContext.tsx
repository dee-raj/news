import React, {
    createContext, useCallback,
    useContext, useEffect, useState
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LanguageType, NewsItem, ThemeType } from "../types/navigation";

const BOOKMARKS_KEY = "bookmarkedArticles";
const THEME_KEY = "appTheme";
const LANGUAGE_KEY = "appLanguage";

export const AppContext = createContext<{
    bookmarkedArticles: NewsItem[];
    toggleBookmark: (article: NewsItem) => void;
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    loadingSettings: boolean;
}>({
    bookmarkedArticles: [],
    toggleBookmark: () => { },
    theme: "light",
    setTheme: () => { },
    language: "en",
    setLanguage: () => { },
    loadingSettings: true,
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsItem[]>([]);
    const [theme, setThemeState] = useState<ThemeType>("light");
    const [language, setLanguageState] = useState<LanguageType>("en");
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Load bookmarks, theme, and language from AsyncStorage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const [savedBookmarks, savedTheme, savedLanguage] = await Promise.all([
                    AsyncStorage.getItem(BOOKMARKS_KEY),
                    AsyncStorage.getItem(THEME_KEY),
                    AsyncStorage.getItem(LANGUAGE_KEY),
                ]);

                if (savedBookmarks) setBookmarkedArticles(JSON.parse(savedBookmarks));

                if (savedTheme === "light" || savedTheme === "dark")
                    setThemeState(savedTheme as ThemeType);

                if (savedLanguage &&
                    ["en", "es", "fr", "hi", "jp", "ko", "ne"].includes(savedLanguage)
                )
                    setLanguageState(savedLanguage as LanguageType);
            } catch (error) {
                console.error("Failed to load app settings:", error);
            } finally {
                setLoadingSettings(false);
            }
        };
        loadSettings();
    }, []);

    // Save bookmarks whenever they change
    useEffect(() => {
        AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedArticles)).catch(console.error);
    }, [bookmarkedArticles]);

    // Save theme whenever it changes
    useEffect(() => {
        AsyncStorage.setItem(THEME_KEY, theme).catch(console.error);
    }, [theme]);

    // Save language whenever it changes
    useEffect(() => {
        AsyncStorage.setItem(LANGUAGE_KEY, language).catch(console.error);
    }, [language]);

    const toggleBookmark = useCallback((article: NewsItem) => {
        setBookmarkedArticles((prev) => {
            const exists = prev.find((a) => a.article_id === article.article_id);
            return exists
                ? prev.filter((a) => a.article_id !== article.article_id)
                : [...prev, article];
        });
    }, []);

    const setTheme = useCallback((newTheme: ThemeType) => setThemeState(newTheme), []);
    const setLanguage = useCallback((lang: LanguageType) => setLanguageState(lang), []);

    return (
        <AppContext.Provider
            value={{
                bookmarkedArticles,
                toggleBookmark,
                theme,
                setTheme,
                language,
                setLanguage,
                loadingSettings,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
