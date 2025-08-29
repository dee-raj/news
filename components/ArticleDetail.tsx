import React from 'react';
import {
    ScrollView, Text, Image, StyleSheet,
    TouchableOpacity, Linking, View
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { NewsItem } from '../types/navigation';
import { useAppContext } from '../context/AppContext';

type Props = { item: NewsItem };

const ArticleDetail: React.FC<Props> = ({ item }) => {
    const { bookmarkedArticles, toggleBookmark, theme } = useAppContext();
    const isBookmarked = bookmarkedArticles.some(a => a.article_id === item.article_id);

    const colors = {
        background: theme === 'dark' ? '#1c1c1c' : '#fff',
        text: theme === 'dark' ? '#fff' : '#000',
        meta: theme === 'dark' ? '#aaa' : '#888',
        link: '#007AFF',
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} key={item.article_id}>
            <Image
                source={{ uri: item.image_url || 'https://bookninja.com/wp-content/uploads/2022/04/image-6.png' }}
                style={styles.image} />
            <Text selectable selectionColor={"#7D3"} style={[styles.title, { color: colors.text }]}>{item.title}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.meta, { color: colors.meta }]}>
                    <Text style={[styles.link, { color: colors.link }]} onPress={() => Linking.openURL(item.source_url)}>
                        {item.source_name}
                    </Text>
                    {" • "} {new Date(item.pubDate).toLocaleDateString()}
                </Text>
                <Ionicons
                    onPress={() => toggleBookmark(item)}
                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={colors.link}
                />
            </View>

            <Text selectable style={[styles.description, { color: colors.text }]}>{item.description}</Text>

            <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.moreBtn}>
                <Text style={[styles.link, { color: colors.link }]}>Read Full Article</Text>
                <Ionicons name='sparkles' color={colors.link} />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 4,
        textAlign: 'justify'
    },
    meta: { fontSize: 13, marginTop: 5 },
    description: {
        fontSize: 16,
        marginTop: 15,
        lineHeight: 28
    },
    moreBtn: {
        flexDirection: 'row',
        marginBottom: 32,
        paddingVertical: 12,
        gap: 12,
        alignItems: 'center',

    },
    link: { fontSize: 16, fontStyle: 'italic' }
});

export default ArticleDetail;
