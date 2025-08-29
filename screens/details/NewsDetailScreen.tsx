import React from 'react';

import ArticleDetail from '../../components/ArticleDetail'
import { NewsItem } from '../../types/navigation';

type Props = {
    route: { params: { item: NewsItem } };
};

const NewsDetailScreen: React.FC<Props> = ({ route }) => {
    const { item } = route.params;
    return (<ArticleDetail item={item} key={0} />)
}

export default NewsDetailScreen;
