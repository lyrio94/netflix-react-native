import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import Home from './screen/Home'

const App = () => {

	useEffect(() => {

		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('Nova mensagem chegou!', JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);

	return <Home />
}

export default App
