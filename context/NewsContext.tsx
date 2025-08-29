// context/NewsContext.tsx
import React, {
    createContext, useContext,
    useState, useEffect, useCallback
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsApi from '../api/newsApi';
import { useAppContext } from './AppContext';
import { NewsItem } from '../types/navigation';

type NewsContextType = {
    articlesByCategory: Record<string, NewsItem[]>;
    searchResults: NewsItem[];
    loading: boolean;
    fetchNews: (category: string, forceRefresh?: boolean) => Promise<void>;
    searchNews: (query: string) => Promise<void>;
    clearSearch: () => void;
};

const NewsContext = createContext<NewsContextType | null>(null);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [articlesByCategory, setArticlesByCategory] = useState<Record<string, NewsItem[]>>({});
    const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    const { language } = useAppContext();

    const fetchNews = useCallback(async (category: string, forceRefresh = false) => {
        setLoading(true);
        try {
            const categoryQuery = category !== 'all' ? category : 'political';

            const cacheKey = `news-${categoryQuery}-${language}`;
            // Skip cache if forceRefresh is true
            if (!forceRefresh) {
                const cached = await AsyncStorage.getItem(cacheKey);
                if (cached) {
                    setArticlesByCategory(prev => ({
                        ...prev,
                        [category]: JSON.parse(cached),
                    }));
                    setLoading(false);
                    return;
                }
            }
            if (forceRefresh) {
                await AsyncStorage.removeItem(cacheKey);
            }

            const res = await newsApi.get('', {
                params: { category: categoryQuery, language }
            });

            const data: NewsItem[] = res.data?.results?.filter((item: NewsItem) => !item.duplicate) || [];

            setArticlesByCategory(prev => ({ ...prev, [category]: data }));
            await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        setLoading(false);
    }, [language]);

    // 🔎 Search News
    const searchNews = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const res = await newsApi.get('', {
                params: { q: query, language }
            });

            const data: NewsItem[] = res.data?.results?.filter((item: NewsItem) => !item.duplicate) || [];
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching news:', error);
        }
        setLoading(false);
    }, [language]);

    const clearSearch = () => setSearchResults([]);

    // 🔁 Refetch all categories whenever language changes
    useEffect(() => {
        Object.keys(articlesByCategory).forEach(category => {
            fetchNews(category);
        });
    }, [language]);

    return (
        <NewsContext.Provider value={{ articlesByCategory, searchResults, loading, fetchNews, searchNews, clearSearch }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => {
    const ctx = useContext(NewsContext);
    if (!ctx) throw new Error('useNews must be used inside NewsProvider');
    return ctx;
};
