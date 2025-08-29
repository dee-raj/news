import React from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types/navigation';
import { NoDataView } from '../components/LottieAnimation';

const SavedScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SavedNews'>>();
    const { bookmarkedArticles, theme } = useAppContext();
    const savedArticles = [...bookmarkedArticles].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    const colors = {
        background: theme === 'dark' ? '#1c1c1c' : '#fff',
        card: theme === 'dark' ? '#2a2a2a' : '#f9f9f9',
        text: theme === 'dark' ? '#fff' : '#000',
        meta: theme === 'dark' ? '#aaa' : '#666'
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {savedArticles.length === 0 ? (
                <NoDataView />
            ) : (
                <FlatList
                    data={savedArticles}
                    keyExtractor={item => item.article_id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={item.article_id}
                            style={[styles.card, { backgroundColor: colors.card }]}
                            onPress={() => navigation.navigate('SavedDetails', { item, index, data: savedArticles })}
                        >
                            <Image source={{ uri: item.image_url }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.meta, { color: colors.meta }]}>
                                    {item.creator ? item.creator.join(', ') : item.source_name} • {new Date(item.pubDate).toLocaleDateString()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<NoDataView />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    card: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        elevation: 2,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
    },
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    meta: {
        marginTop: 5,
        fontSize: 12,
    },
});

export default SavedScreen;
