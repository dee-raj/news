import React from "react";

import { NewsItem } from "../../types/navigation";
import ArticleDetail from "../../components/ArticleDetail";

type Props = {
    route: { params: { item: NewsItem } };
};

const SearchDetailScreen: React.FC<Props> = ({ route }) => {
    const { item } = route.params;
    return (<ArticleDetail item={item} key={1} />);
};

export default SearchDetailScreen;
