import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/appSaga';

import authSaga from './auth/authSaga';
import signUpSaga from './auth/signUpSaga';
import signInSaga from './auth/signInSaga';
import restorePasswordSaga from './auth/restorePasswordSaga';

import verificationSaga from './verification/verificationSaga';
import tokenSaleSaga from './tokenSale/tokenSaleSaga';

export default function* () {
  yield all([
    fork(formActionSaga),
    fork(appSaga),
    fork(authSaga),
    fork(signUpSaga),
    fork(signInSaga),
    fork(restorePasswordSaga),
    fork(verificationSaga),
    fork(tokenSaleSaga),
  ]);
}
