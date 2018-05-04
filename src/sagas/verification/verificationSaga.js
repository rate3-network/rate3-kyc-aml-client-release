import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { get, post, postFile } from '../../utils/fetch';
import { fetchError } from '../../utils/fetch/actions';
import { getKeyOfFirstTruthyKvp } from '../../utils/objectHelpers';

import {
  // initVerification, // UNUSED
  goToStepPending,
  verifyStepOne,
  verifyStepTwo,
} from '../../redux/modules/verification/verification';
import Firebase from '../../utils/firebase';

/**
 * Init verification
 */

/* UNUSED
function* initVerificationIterator() {
  try {
    const data = yield call(get, '/kyc/init');
    yield put(initVerification.success(data));
  } catch (e) {
    yield put(initVerification.failure(e));
  }
}

function* initVerificationSaga() {
  yield takeLatest(
    initVerification.REQUEST,
    initVerificationIterator
  );
}
*/

function* verifyStepOneIterator({ payload }) {
  // Transform payload values to conform to API parameter format
  const [year, month, day] = payload.date_of_birth.split('-');
  const apiPayload = {
    ...payload,
    date_of_birth: `${day}/${month}/${year}`,
    ethAmountIntended: Number(payload.ethAmountIntended),
  };

  try {
    const result = yield call(post, '/kyc/individual_risk', apiPayload);
    yield put(verifyStepOne.success());
  } catch (e) {
    // Log error to Raven
    Raven.captureException(e, {
      extra: {
        email: Firebase.getUserEmail() || '',
        user: Firebase.getUserName() || '',
        token: Firebase.getUserToken() || '',
      },
    });
    // If failed to fetch
    if (!e.code && e.message === 'Failed to fetch') {
      yield put(verifyStepOne.failure(new SubmissionError({ _error: 'Oops something went wrong please try again!' })));
    } else {
      yield put(verifyStepOne.failure(new SubmissionError({ ...e.error, _error: e.message })));
    }
    yield put(fetchError(e));
  }
}

function* verifyStepOneSaga() {
  yield takeLatest(
    verifyStepOne.REQUEST,
    verifyStepOneIterator,
  );
}

function* verifyStepTwoIterator({ payload }) {
  try {
    // Prepare data for transmission to API
    const officialDocFile = payload.file_official[0];
    const selfieDocFile = payload.file_selfie[0];

    const dataToTransmit = new FormData();
    dataToTransmit.append('official_doc_type', payload.document_type);
    dataToTransmit.append('official_doc_file', officialDocFile);
    dataToTransmit.append('selfie_doc_file', selfieDocFile);

    // Transmit files
    const result = yield call(postFile, '/kyc/individual_doc', dataToTransmit);
    yield put(verifyStepTwo.success());
  } catch (e) {
    // Log error to Raven
    Raven.captureException(e, {
      extra: {
        email: Firebase.getUserEmail() || '',
        user: Firebase.getUserName() || '',
        token: Firebase.getUserToken() || '',
      },
    });
    // If failed to fetch
    if (!e.code && e.message === 'Failed to fetch') {
      yield put(verifyStepTwo.failure(new SubmissionError({ _error: 'Oops something went wrong please try again!' })));
    } else {
      const canRetryDocumentsUpload = e.meta && e.meta.canRetryDocumentsUpload;

      // Hack to go to pending step on retry not allowed
      if (canRetryDocumentsUpload) {
        yield put(verifyStepTwo.failure(new SubmissionError({ ...e.error, _error: 'Please ensure that your face is clear and upright for the uploaded images.' })));
      } else {
        yield put(goToStepPending());
      }
    }
    yield put(fetchError(e));
  }
}

function* verifyStepTwoSaga() {
  yield takeLatest(
    verifyStepTwo.REQUEST,
    verifyStepTwoIterator,
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    // fork(initVerificationSaga), // UNUSED
    fork(verifyStepOneSaga),
    fork(verifyStepTwoSaga),
  ]);
}
