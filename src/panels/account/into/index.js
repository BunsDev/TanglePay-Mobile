import React, { useRef } from 'react';
import { Container, View, Text, Input, Textarea, Form, Item, Button, Label, Content } from 'native-base';
import { Base, I18n, IotaSDK } from '@tangle-pay/common';
import { Formik } from 'formik';
import { useRoute } from '@react-navigation/native';
import { useAddWallet } from '@tangle-pay/store/common';
import * as Yup from 'yup';
import { useCreateCheck } from '@tangle-pay/store/common';
import { S, SS, Nav, ThemeVar, SvgIcon, Toast } from '@/common';

const schema = Yup.object().shape({
	mnemonic: Yup.string().required(),
	name: Yup.string().required(),
	password: Yup.string().required(),
	rePassword: Yup.string().required(),
	agree: Yup.bool().isTrue().required()
});
export const AccountInto = () => {
	const form = useRef();
	useCreateCheck((name) => {
		form.current.setFieldValue('name', name);
	});
	const { params } = useRoute();
	const type = params.type;
	const from = params.from;
	const addWallet = useAddWallet();
	return (
		<Container>
			<Nav title={I18n.t('account.intoBtn')} />
			<Content>
				<Formik
					innerRef={form}
					initialValues={{
						agree: true
					}}
					validateOnBlur={false}
					validateOnChange={false}
					validateOnMount={false}
					validationSchema={schema}
					onSubmit={async (values) => {
						//import mnemonics
						if (type === 1) {
							const { password, rePassword } = values;
							if (!Base.checkPassword(password)) {
								return Toast.error(I18n.t('account.intoPasswordTips'));
							}
							if (password !== rePassword) {
								return Toast.error(I18n.t('account.checkPasswrod'));
							}
							const res = await IotaSDK.importMnemonic({
								...values
							});
							addWallet({
								...res
							});
							if (from === 'smr') {
								Base.replace('assets/claimReward/claimSMR', {
									id: res.id
								});
							} else {
								Base.popToTop();
								Base.replace('main');
							}
						}
					}}>
					{({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
						<View style={[SS.p16, SS.jsb, S.h(ThemeVar.contentHeight1)]}>
							<Form>
								{type === 1 ? (
									<View>
										<View>
											<Text style={[SS.fz24, SS.fw600, SS.mb8]}>
												{I18n.t(type === 1 ? 'account.intoTitle1' : 'account.intoTitle2')}
											</Text>
											<Text style={[SS.fz14, SS.pb16, SS.cS]}>
												{I18n.t('account.mnemonicTips')}
											</Text>
										</View>
										<Textarea
											blurOnSubmit={true}
											returnKeyType='done'
											bordered
											style={[
												{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 },
												S.border(2, !errors.mnemonic ? '#eee' : ThemeVar.brandDanger, 1),
												SS.fz14,
												SS.ph0,
												SS.pl0,
												SS.mt0,
												SS.pt0,
												SS.pb8
											]}
											rowSpan={3}
											onChangeText={handleChange('mnemonic')}
											value={values.mnemonic}
										/>
									</View>
								) : (
									<View
										style={[
											SS.radius10,
											SS.mt10,
											S.h(140),
											SS.c,
											S.border(4, !errors.mnemonic ? '#eee' : ThemeVar.brandDanger)
										]}>
										<SvgIcon size={50} name='file' style={[SS.mb20]} />
										<Text>{I18n.t('account.intoSelectFile')}</Text>
									</View>
								)}
								<Text style={[SS.fz14, SS.mt24]}>{I18n.t('account.intoName')}</Text>
								<Item style={[SS.mt8, SS.ml0]} error={!!errors.name}>
									<Input
										style={[SS.fz14, SS.pl0, S.h(44)]}
										placeholder={I18n.t('account.intoNameTips')}
										onChangeText={handleChange('name')}
										value={values.name}
									/>
								</Item>
								<Text style={[SS.fz14, SS.mt24]}>
									{I18n.t(type === 1 ? 'account.intoPassword' : 'account.intoFilePassword')}
								</Text>
								<Item style={[SS.mt8, SS.ml0]} error={!!errors.password}>
									<Input
										keyboardType='ascii-capable'
										secureTextEntry
										textContentType={Base.isIos14 ? 'oneTimeCode' : 'none'}
										style={[SS.fz14, SS.pl0, S.h(44)]}
										placeholder={I18n.t(
											type === 1 ? 'account.intoPasswordTips' : 'account.intoFilePasswordTips'
										)}
										onChangeText={handleChange('password')}
										value={values.password}
									/>
								</Item>
								<Input style={[S.h(1)]} />
								{type === 1 && (
									<Item style={[SS.ml0, SS.mt8]} error={!!errors.rePassword}>
										<Input
											keyboardType='ascii-capable'
											// secureTextEntry={!Base.isIos14}
											secureTextEntry
											textContentType={Base.isIos14 ? 'oneTimeCode' : 'none'}
											style={[SS.fz14, SS.pl0, S.h(44)]}
											placeholder={I18n.t('account.intoRePasswordTips')}
											onChangeText={handleChange('rePassword')}
											value={values.rePassword}
										/>
									</Item>
								)}
							</Form>
							<Form style={[SS.mb80]}>
								<Item
									style={[SS.row, SS.as, SS.ml0, SS.mb40, { borderBottomWidth: 0 }]}
									onPress={() => {
										setFieldValue('agree', !values.agree);
									}}>
									<SvgIcon
										color={values.agree ? ThemeVar.brandPrimary : ThemeVar.textColor}
										size={15}
										style={[SS.mr8, S.marginT(3)]}
										name={values.agree ? 'checkbox_1' : 'checkbox_0'}
									/>
									<View style={[S.w(ThemeVar.deviceWidth - 70)]}>
										<Text
											style={[
												SS.fz12,
												S.tl,
												S.lineHeight(22),
												SS.fw600,
												S.color(!errors.agree ? '#eee' : ThemeVar.brandDanger)
											]}>
											{I18n.t('account.intoAgree')
												.split('##')
												.filter((e) => !!e)
												.map((e, i) => {
													return i % 2 ? (
														<Text
															onPress={() => {
																Base.push(
																	i === 1
																		? 'https://tanglepay.com/terms.html'
																		: 'https://tanglepay.com/policy.html'
																);
															}}
															key={i}
															style={[SS.cP, SS.fw600]}>
															{e}
														</Text>
													) : (
														<Text key={i}>{e}</Text>
													);
												})}
										</Text>
									</View>
								</Item>
								<Button block onPress={handleSubmit}>
									<Text>{I18n.t('account.intoBtn')}</Text>
								</Button>
							</Form>
						</View>
					)}
				</Formik>
			</Content>
		</Container>
	);
};
