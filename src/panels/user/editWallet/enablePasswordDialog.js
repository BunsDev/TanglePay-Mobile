import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import { View, Text, Form, Input, Item, Button } from 'native-base';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { I18n } from '@tangle-pay/common';
import { useEditWallet } from '@tangle-pay/store/common';
import { Formik } from 'formik';
import { Toast } from '@/common';
import { context, markWalletPasswordEnabled } from '@tangle-pay/domain';
import * as Yup from 'yup';
import { S, SS } from '@/common';

export const EnablePasswordDialog = ({ dialogRef, data }) => {
  const [isShow, setShow] = useState(false);
  const cbRef = useRef();
  const editWallet = useEditWallet();

  useImperativeHandle(dialogRef, () => {
    return {
      show
    };
  });

  const show = (cb) => {
    cbRef.current = cb;
    setShow(true);
  };

  const hide = () => {
    if (cbRef.current) {
      cbRef.current().then(() => {
        setShow(false);
      });
    }
  };

  return (
    <Modal hasBackdrop backdropOpacity={0.3} onBackButtonPress={hide} onBackdropPress={hide} isVisible={isShow}>
      <View style={[SS.w100, SS.radius10, SS.bgW]}>
        <ScrollView contentContainerStyle={[SS.p16]}>
          <Formik
            initialValues={{
              newPassword: '',
              retypePassword: ''
            }}
            isValidating={true}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string().required(),
              retypePassword: Yup.string()
                .required()
                .oneOf([Yup.ref('newPassword'), null], I18n.t('account.passwordMismatch'))
            })}
            onSubmit={async (values, { resetForm }) => {
              if (values.newPassword !== values.retypePassword) {
                return Toast.errors(I18n.t('account.passwordMismatch'));
              }
              try {
                Toast.showLoading();
                editWallet(data.id, { ...data, password: values.retypePassword, oldPassword: context.state.pin }, true);
                await markWalletPasswordEnabled(data.id);
                Toast.success(I18n.t('account.passwordEnabled'));
                resetForm();
              } finally {
                Toast.hideLoading();
                hide();
              }
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <Form>
                <Text style={[SS.fz18, SS.fw600]}>{I18n.t('account.walletPasswordTitle')}</Text>
                <Item style={[SS.mt10, SS.ml0, { minHeight: 50 }]} stackedLabel error={!!errors.newPassword}>
                  <Input
                    style={[SS.fz14]}
                    placeholder={I18n.t('account.enterNewPassword')}
                    onChangeText={handleChange('newPassword')}
                    value={values.newPassword}
                  />
                </Item>
                <Item style={[SS.mt10, SS.ml0, { minHeight: 50 }]} stackedLabel error={!!errors.retypePassword}>
                  <Input
                    style={[SS.fz14]}
                    placeholder={I18n.t('account.retypeNewPassword')}
                    onChangeText={handleChange('retypePassword')}
                    value={values.retypePassword}
                  />
                </Item>
                <View style={[S.marginT(24)]}>
                  <Button block onPress={handleSubmit}>
                    <Text>{I18n.t('assets.confirm')}</Text>
                  </Button>
                </View>
              </Form>
        )}
      </Formik>
    </ScrollView>
  </View>
</Modal>);
};