import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { initiateRestorePassword } from '../../redux/modules/auth/restorePassword';

import Firebase from '../../utils/firebase';

/**
 * Initiate restore password
 */

function* initiateRestorePasswordIterator({ payload }) {
  const { email } = payload;

  try {
    yield call(Firebase.sendPasswordResetEmailAsync, email);
    yield put(initiateRestorePassword.success());
  } catch (e) {
    yield put(initiateRestorePassword.failure(new SubmissionError({ _error: 'Reset password failed. Please try again.' })));
  }
}

function* initiateRestorePasswordSaga() {
  yield takeLatest(
    initiateRestorePassword.REQUEST,
    initiateRestorePasswordIterator
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(initiateRestorePasswordSaga),
  ]);
}
