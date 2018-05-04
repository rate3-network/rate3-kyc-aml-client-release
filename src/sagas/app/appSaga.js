import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken, isAuth } from '../../utils/auth';
import { get } from '../../utils/fetch';

import { namedRoutes } from '../../routes';
import Firebase from '../../utils/firebase';

import {
  login,
  setAuthState,
  LOGIN,
  CHECK_AUTH,
  LOGOUT,
  logout,
  fetchUser
} from '../../redux/modules/app/app';
import { getWhitelistStatus } from '../../redux/modules/tokenSale/tokenSale';
import { fetchVerification } from '../../redux/modules/verification/verification';
import { fetchError } from '../../utils/fetch/actions';

import CrowdsaleContract from '../../utils/contract/CrowdsaleContract';

/*
 * Login
 */

function* loginIterator({ payload: token }) {
  const emailVerified = Firebase.getUserEmailVerificationStatus();
  yield put(setAuthState({ authorized: true, token, emailVerified }));

  // Redirect to appropriate place
  if (emailVerified) {
    yield push(namedRoutes.dashboard);
  } else {
    yield push(namedRoutes.verifyEmail);
  }
}

function* loginSaga() {
  yield takeLatest(
    LOGIN,
    loginIterator
  );
}

/*
 * Check auth
 */

function* checkAuthIterator() {
  const auth = yield call(isAuth);

  if (auth) {
    const token = yield call(getToken);
    yield put(login(token));
  } else {
    yield put(setAuthState({ authorized: false, token: '' }));
  }
}

function* checkAuthSaga() {
  yield takeLatest(
    CHECK_AUTH,
    checkAuthIterator
  );
}

/*
 * Logout
 */

function* logoutIterator() {
  yield call(Firebase.logoutAsync);
  yield put(setAuthState({ authorized: false, token: '' }));
}

function* logoutSaga() {
  yield takeLatest(
    LOGOUT,
    logoutIterator
  );
}

/*
 * Loads all relevant data associated with logged in user.
 */

function* fetchUserIterator() {
  // Fetch user data
  try {
    // Call API endpoint to retrieve user information (also retrieves verification status)
    const data = yield call(get, '/users/me');

    // Retrieve user data
    const email = Firebase.getUserEmail() || '';
    const name = Firebase.getUserName() || '';
    const kycStatus = (data && data.approvalStatus && data.approvalStatus.outcome) || '';
    const ethAddress = (data && data.saleDetails && data.saleDetails.ethAddress) || null;
    const userData = { email, name, kycStatus, ethAddress };

    // Retrieve whitelist status
    const whitelistStatus = yield call(CrowdsaleContract.getWhitelistStatusAsync, ethAddress);

    // Extract verification data
    const { steps, canRetryDocumentsUpload, approvalStatus, ended } = data;
    const verificationData = { steps, canRetryDocumentsUpload, approvalStatus, ended };

    yield put(fetchUser.success(userData));
    yield put(fetchVerification.success(verificationData));
    yield put(getWhitelistStatus.success(whitelistStatus));
  } catch (e) {
    // Log error to Raven
    Raven.captureException(e, {
      extra: {
        email: Firebase.getUserEmail() || '',
        user: Firebase.getUserName() || '',
        token: Firebase.getUserToken() || '',
      },
    });
    yield put(fetchUser.failure());
    yield put(fetchVerification.failure());
    yield put(getWhitelistStatus.failure());
    yield put(fetchError(e));
  }
}

function* fetchUserSaga() {
  yield takeLatest(
    fetchUser.REQUEST, // Called when AppWrapper mounts
    fetchUserIterator
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(loginSaga),
    fork(checkAuthSaga),
    fork(logoutSaga),
    fork(fetchUserSaga)
  ]);
}
