import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';

import { signUp, endSignup, confirmEmail, END_SIGNUP, resetStore } from '../../redux/modules/auth/signUp';
import { login } from '../../redux/modules/app/app';

import Firebase from '../../utils/firebase';
import FirebaseAuthError from '../../utils/firebase/FirebaseAuthError';

function* signUpIterator({ payload }) {
  const { email, password } = payload;
  try {
    const userToken = yield call(Firebase.createUserAccountAsync, email, password);
    yield put(signUp.success());

    // Send verification email without regard for success or failure (best effort)
    Firebase.sendEmailVerificationAsync();

    yield put(endSignup(userToken));
  } catch (e) {
    // Define error messages
    const ERROR_EMAIL_TAKEN = 'This email is already taken.';
    const ERROR_INVALID_EMAIL = 'Please enter a valid email address.';
    const ERROR_WEAK_PASSWORD = 'Password must be at least 8 characters long.';
    const ERROR_GENERAL_FAILURE = 'Oops! Something went wrong please try again.';

    let _error;

    // use e.message to display firebase message
    switch (e.type) {
      case FirebaseAuthError.TYPE.EMAIL_IN_USE:
        _error = ERROR_EMAIL_TAKEN;
        break;
      case FirebaseAuthError.TYPE.INVALID_EMAIL:
        _error = ERROR_INVALID_EMAIL;
        break;
      case FirebaseAuthError.TYPE.WEAK_PASSWORD:
        _error = ERROR_WEAK_PASSWORD;
        break;
      default:
        _error = ERROR_GENERAL_FAILURE;
    }

    yield put(signUp.failure(new SubmissionError({ _error })));
  }
}

function* signUpSaga() {
  yield takeLatest(
    signUp.REQUEST,
    signUpIterator
  );
}

function* confirmEmailIterator({ payload }) {
  try {
    const data = yield call(post, '/user/activate', payload);
    yield put(confirmEmail.success(data));
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError({ _error: e.error })));
  }
}

function* confirmEmailSaga() {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  );
}

function* endSignUpIterator({ payload }) {
  yield put(login(payload)); // login
  yield put(resetStore()); // reset signup reducer
}

function* endSignUpSaga() {
  yield takeLatest(
    END_SIGNUP,
    endSignUpIterator
  );
}

export default function* () {
  yield all([
    fork(signUpSaga),
    fork(confirmEmailSaga),
    fork(endSignUpSaga)
  ]);
}
