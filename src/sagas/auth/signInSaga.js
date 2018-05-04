import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { signIn, endSignIn, END_SIGNIN, resetStore } from '../../redux/modules/auth/signIn';
import { login } from '../../redux/modules/app/app';

import Firebase from '../../utils/firebase';
import FirebaseAuthError from '../../utils/firebase/FirebaseAuthError';

function* signInIterator({ payload }) {
  try {
    const userToken = yield call(Firebase.loginAsync, payload.email, payload.password);
    console.log('userToken:', userToken);
    yield put(signIn.success());
    yield put(endSignIn(userToken));
  } catch (e) {
    const ERROR_CREDENTIALS = 'Incorrect email or password entered.';
    const ERROR_ACCOUNT_DISABLED = 'Your account has been disabled.';
    const ERROR_GENERAL_FAILURE = 'Oops! Something went wrong please try again.';

    let _error;

    switch (e.type) {
      case FirebaseAuthError.TYPE.INVALID_EMAIL:
      case FirebaseAuthError.TYPE.WRONG_PASSWORD:
      case FirebaseAuthError.TYPE.USER_NOT_FOUND:
        _error = ERROR_CREDENTIALS;
        break;
      case FirebaseAuthError.TYPE.USER_DISABLED:
        _error = ERROR_ACCOUNT_DISABLED;
        break;
      default:
        _error = ERROR_GENERAL_FAILURE;
    }

    yield put(signIn.failure(new SubmissionError({ _error })));
  }
}

function* signInSaga() {
  yield takeLatest(
    signIn.REQUEST,
    signInIterator
  );
}

function* endSignInIterator({ payload }) {
  yield put(login(payload));
  yield put(resetStore()); // reset signin reducer
}

function* endSignInISaga() {
  yield takeLatest(
    END_SIGNIN,
    endSignInIterator
  );
}

export default function* () {
  yield all([
    fork(signInSaga),
    fork(endSignInISaga)
  ]);
}
