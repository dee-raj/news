import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { NewsItem } from '../types/navigation';
import { useAppContext } from '../context/AppContext';

interface Props {
    item: NewsItem;
    onPress: () => void;
}

const NewsCard: React.FC<Props> = ({ item, onPress }) => {
    const { theme } = useAppContext();

    const colors = {
        background: theme === 'dark' ? '#1c1c1c' : '#fff',
        text: theme === 'dark' ? '#fff' : '#000',
        meta: theme === 'dark' ? '#aaa' : '#666',
    };

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: colors.background }]} onPress={onPress}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={[styles.meta, { color: colors.meta }]}>
                    {item.source_name ?? 'Unknown'} • {new Date(item.pubDate).toLocaleDateString()}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        flex: 1,
        padding: 10,
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

export default NewsCard;
