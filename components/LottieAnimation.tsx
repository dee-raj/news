import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import nodataAnimation from '../assets/animations/No-Data.json';
import loadingAnimation from '../assets/animations/loading.json';

export const NoDataView: React.FC<{ text?: string }> = ({ text = "No saved articles yet." }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <LottieView
            source={nodataAnimation}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
            resizeMode='contain'
        />
        <Text style={{ fontSize: 18, color: '#4e2121ff', marginTop: 20 }}>{text}</Text>
    </View>
);

export const LoadingAnimationView: React.FC<{ text?: string }> = ({ text }) => (
    <View style={{ padding: 20, alignItems: 'center' }}>
        <LottieView
            source={loadingAnimation}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
            resizeMode='contain'
        />
        {text && (
            <Text style={{ fontSize: 18, color: '#143d1eff', marginTop: 20 }}>{text}</Text>
        )}
    </View>
);
