import React, { useState, useEffect, useCallback } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { StackNavigationProp } from '@react-navigation/stack';

import { useNews } from '../context/NewsContext';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList, NewsItem } from '../types/navigation';
import { LoadingAnimationView, NoDataView } from '../components/LottieAnimation';

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'News'>;
};

const NewsListScreen: React.FC<Props> = ({ navigation }) => {
    const categories = [
        'top', 'business', 'sports', 'domestic', 'crime', 'education',
        'entertainment', 'technology', 'health', 'food', 'tourism', 'lifestyle'
    ];
    const { bookmarkedArticles, toggleBookmark, theme } = useAppContext();
    const { articlesByCategory, loading, fetchNews } = useNews();
    const [selectedCategory, setSelectedCategory] = useState('top');
    const [articles, setArticles] = useState<NewsItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (articlesByCategory[selectedCategory]) {
            setArticles(articlesByCategory[selectedCategory]);
        } else {
            fetchNews(selectedCategory);
        }
    }, [selectedCategory, articlesByCategory]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNews(selectedCategory, true);
        setRefreshing(false);
    };

    const colors = {
        background: theme === 'dark' ? '#1c1c1c' : '#fff',
        card: theme === 'dark' ? '#2a2a2a' : '#f7f7f7',
        text: theme === 'dark' ? '#fff' : '#000',
        meta: theme === 'dark' ? '#aaa' : '#666',
        category: theme === 'dark' ? '#444' : '#f0f0f0',
        categoryActive: '#007AFF',
    };

    if (loading && !articles.length) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <LoadingAnimationView text="Please wait a few seconds..." />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            {/* Category Selector */}
            <View style={styles.categoryContainer}>
                <FlatList
                    horizontal
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedCategory(item)}
                            style={[
                                styles.categoryButton,
                                { backgroundColor: colors.category },
                                selectedCategory === item && { backgroundColor: colors.categoryActive }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    { color: theme === 'dark' ? '#fff' : '#555' },
                                    selectedCategory === item && styles.categoryTextActive
                                ]}
                            >
                                {item.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* News List */}
            <FlatList
                data={articles}
                keyExtractor={item => item.article_id}
                style={{ marginBottom: 12 }}
                renderItem={({ item, index }) => {
                    const isBookmarked = bookmarkedArticles.some(a => a.article_id === item.article_id);
                    return (
                        <TouchableOpacity
                            key={item.article_id}
                            style={[styles.card, { backgroundColor: colors.card }]}
                            onPress={() => navigation.navigate('Details', { item, index, data: articles })}
                        >
                            <Image
                                source={{ uri: item.image_url }}
                                style={styles.image}
                            />
                            <View style={styles.textContainer}>
                                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.meta, { color: colors.meta }]} numberOfLines={1}>
                                    {item.creator ? item.creator.join(', ') : item.source_name} • {new Date(item.pubDate).toLocaleDateString()}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.bookmarkIcon}
                                onPress={() => toggleBookmark(item)}
                            >
                                <Ionicons
                                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                                    size={22}
                                    color="#007AFF"
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={<NoDataView />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme === "dark" ? "#fff" : "#000"}
                        colors={["#007AFF"]}
                    />
                }
                contentContainerStyle={{ padding: 4 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    refreshButton: {
        padding: 8,
        borderRadius: 20,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 14,
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: '#ABC',
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    meta: {
        marginTop: 6,
        fontSize: 12,
    },
    bookmarkIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#ffe6f3ff',
        padding: 4,
        borderRadius: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NewsListScreen;
