import React, { useState } from 'react';
import {
    View, TextInput, FlatList, Text,
    TouchableOpacity, StyleSheet, Image
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { NewsItem } from '../types/navigation';
import { useNews } from '../context/NewsContext';
import { useAppContext } from '../context/AppContext';
import { LoadingAnimationView, NoDataView } from '../components/LottieAnimation';

const highlightText = (text: string, query: string) => {
    if (!query) return <Text>{text}</Text>;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return (
        <Text>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <Text key={index} style={{ backgroundColor: '#fffa90' }}>{part}</Text>
                ) : (
                    <Text key={index}>{part}</Text>
                )
            )}
        </Text>
    );
};

const SearchScreen = ({ navigation }: any) => {
    const { theme } = useAppContext();
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const { searchResults, searchNews, clearSearch, loading } = useNews();

    const handleSearch = async () => {
        if (!query.trim()) {
            clearSearch();
            return;
        }
        setSearching(true);
        await searchNews(query);
        setSearching(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff' }]}>
            {/* Search Input */}
            <View style={styles.searchBar}>
                <TextInput
                    style={[styles.input, {
                        color: theme === 'dark' ? '#fff' : '#000',
                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                    }
                    ]}
                    placeholder="Search news..."
                    placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    disabled={loading || searching}
                    style={[
                        styles.button,
                        { backgroundColor: (loading || searching) ? '#888' : (theme === 'dark' ? '#444' : '#007AFF') }
                    ]}
                >
                    <Ionicons name="search" color="#fff" size={24} />
                </TouchableOpacity>
            </View>

            {/* Loader */}
            {loading && <LoadingAnimationView />}

            {/* Results */}
            <FlatList
                data={searchResults}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }: { item: NewsItem; index: number }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f7f7f7' }
                        ]}
                        onPress={() => navigation.navigate('SearchDetails', { item, index, data: searchResults })}
                    >
                        <Image
                            source={{ uri: item.image_url || 'https://bookninja.com/wp-content/uploads/2022/04/image-6.png?w=80' }}
                            style={styles.image}
                        />
                        <View style={styles.textContainer}>
                            <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                                {highlightText(item.title, query)}
                            </Text>
                            {item.description && (
                                <Text
                                    style={[styles.description, { color: theme === 'dark' ? '#ccc' : '#555' }]}
                                    numberOfLines={2}
                                >
                                    {item.description}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    !loading ? (
                        query ? (
                            <NoDataView text="Click 🔍 or try searching for something else" />
                        ) : (
                            <Text style={[styles.emptyText, { color: theme === 'dark' ? '#aaa' : '#888' }]}>
                                Start searching for news...
                            </Text>
                        )
                    ) : null
                }
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    searchBar: { flexDirection: 'row', marginBottom: 12, borderRadius: 12, alignItems: 'center' },
    input: { flex: 1, fontSize: 16, padding: 10, borderWidth: 1, borderRadius: 12 },
    button: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginLeft: 8, alignItems: 'center', justifyContent: 'center' },
    card: { flexDirection: 'row', padding: 12, borderRadius: 10, marginBottom: 10, elevation: 1, alignItems: 'center' },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 12, backgroundColor: '#ccc' },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
    description: { fontSize: 14 },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
