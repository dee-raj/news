export interface NewsItem {
    article_id: string;
    title: string;
    link: string;
    creator: string[] | null;
    description: string;
    content: string;
    pubDate: string;
    image_url: string;
    source_name: string;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    duplicate: boolean;
    keywords?: string[];
}

export type RootTabParamList = {
    Home: undefined;
    Bookmark: undefined;
    Search: undefined;
    Settings: undefined;
};

export type RootStackParamList = {
    News: undefined;
    Details: { item: NewsItem; index: number; data: NewsItem[] };

    SavedNews: undefined;
    SavedDetails: { item: NewsItem; index: number; data: NewsItem[] };

    SearchNews: undefined;
    SearchDetails: { item: NewsItem; index: number; data: NewsItem[] };
};

export type ThemeType = "light" | "dark";
export type LanguageType = "en" | "es" | "fr" | "hi" | "jp" | "ko" | "ne" | "pa" | "mr" | "gu";
