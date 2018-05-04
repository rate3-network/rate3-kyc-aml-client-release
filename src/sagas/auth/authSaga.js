import { all, takeEvery, put, fork } from 'redux-saga/effects';

import { logout } from '../../redux/modules/app/app';
import { FETCH_ERROR } from '../../utils/fetch/actions';

/**
 * Handle auth effects for certain actions
 */

/**
 * Handle auth effects on fetch errors.
 * @param {RequestError} payload Redux action payload.
 */
function* handleFetchErrorIterator({ payload }) {
  switch (payload.code) {
    case 401: // HTTP UNAUTHORIZED
      yield put(logout());
      break;
    default:
      // Do nothing
  }
}

function* handleFetchErrorSaga() {
  yield takeEvery(
    FETCH_ERROR,
    handleFetchErrorIterator,
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(handleFetchErrorSaga),
  ]);
}