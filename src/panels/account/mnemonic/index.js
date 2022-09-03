import React, { useEffect, useState, useCallback } from 'react';
import { Container, Content, View, Text, Button } from 'native-base';
import { Base, I18n, IotaSDK } from '@tangle-pay/common';
import { useStore } from '@tangle-pay/store';
import { S, SS, Nav, ThemeVar } from '@/common';
import { AppState, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FlagSecure from 'react-native-flag-secure-android';
export const AccountMnemonic = () => {
	const [registerInfo, setRegisterInfo] = useStore('common.registerInfo');
	const [list, setList] = useState([]);
	const [opacity, setOpacity] = useState(1);
	const [errList, setErrList] = useState([]);
	useEffect(() => {
		const code = IotaSDK.getMnemonic();
		setList(code.toString().split(' '));
		setErrList(IotaSDK.getMnemonic().toString().split(' '));
		setRegisterInfo({ ...registerInfo, mnemonic: code });
	}, []);
	const _handleAppStateChange = (nextAppState) => {
		setOpacity(nextAppState === 'active' ? 1 : 0);
	};
	useFocusEffect(
		useCallback(() => {
			if (Platform.OS === 'android') {
				FlagSecure.activate();
			}
			const appStateEvt = AppState.addEventListener('change', _handleAppStateChange);
			return () => {
				if (Platform.OS === 'android') {
					FlagSecure.deactivate();
				}
				appStateEvt.remove();
			};
		}, [])
	);
	return (
		<Container style={{ opacity: opacity }}>
			<Nav title={I18n.t('account.mnemonicTitle')} />
			<Content contentContainerStyle={[SS.ph16, SS.pb50, SS.pt16]}>
				<View style={[SS.mb10]}>
					<Text style={[SS.cS, SS.fz14]}>{I18n.t('account.mnemonicSubTitle')}</Text>
				</View>
				<View style={[S.radius(20), S.border(4, '#eee', 1), SS.row, { flexWrap: 'wrap' }]}>
					{list.map((e, i) => {
						return (
							<View
								key={`${e}_${i}`}
								style={[
									i >= 3 && S.border(0, '#eee', 1),
									i % 3 !== 2 && S.border(1, '#eee', 1),
									S.w('33.33%'),
									SS.p5
								]}>
								<Text style={[SS.fz13, SS.cS]}>{i + 1}</Text>
								<Text style={[SS.fz15, SS.tc]}>{e}</Text>
							</View>
						);
					})}
				</View>
				<View style={[SS.mb10, SS.mt20, SS.as, SS.row, SS.mr24]}>
					<Text style={[SS.mr20, { fontSize: 6 }, SS.mt5]}>●</Text>
					<Text style={[SS.fz14, SS.cS]}>{I18n.t('account.mnemonicPhraseTips1')}</Text>
				</View>
				<View style={[SS.mb10, SS.as, SS.row, SS.mr24]}>
					<Text style={[SS.mr20, { fontSize: 6 }, SS.mt5]}>●</Text>
					<Text style={[SS.fz14, SS.cS]}>{I18n.t('account.mnemonicPhraseTips2')}</Text>
				</View>
				<View style={[SS.mt15]}>
					<Button
						block
						onPress={() => {
							Base.push('account/verifyMnemonic', { list, errList });
						}}>
						<Text>{I18n.t('account.mnemonicBtn')}</Text>
					</Button>
				</View>
			</Content>
		</Container>
	);
};
