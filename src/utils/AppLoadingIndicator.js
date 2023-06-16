import React from 'react';
import { LoadingIndicator } from 'react-native-expo-fancy-alerts';

const AppLoadingIndicator = (props) => {
    return <LoadingIndicator visible={props.visible} />;
}

export default AppLoadingIndicator;