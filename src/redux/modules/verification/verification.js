import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction, createAction, createSubmitAction } from '../../../utils/actions';

import { getKeyOfLastTruthyKvp } from '../../../utils/objectHelpers';

// -- Action Type
export const INIT_VERIFICATION = 'verification/verification/INIT_VERIFICATION';
export const FETCH_VERIFICATION = 'verification/verification/FETCH_VERIFICATION';
export const GO_TO_STEP_PENDING = 'verification/verification/GO_TO_STEP_PENDING';
// Verification step forms
export const SUBMIT_STEP_ONE = 'verification/verification/SUBMIT_STEP_ONE';
export const SUBMIT_STEP_TWO = 'verification/verification/SUBMIT_STEP_TWO';
export const SUBMIT_STEP_THREE = 'verification/verification/SUBMIT_STEP_THREE';

// -- Action Creators
export const initVerification = createAsyncAction(INIT_VERIFICATION);
export const fetchVerification = createAsyncAction(FETCH_VERIFICATION);
export const goToStepPending = createAction(GO_TO_STEP_PENDING);

export const verifyStepOne = createSubmitAction(SUBMIT_STEP_ONE);
export const verifyStepTwo = createSubmitAction(SUBMIT_STEP_TWO);
export const verifyStepThree = createSubmitAction(SUBMIT_STEP_THREE);

// Types of verification steps
export const VERIFICATION_STEP_TYPE = {
  NOT_STARTED: '0',
  STEP_ONE: '1',
  STEP_TWO: '2',
  STEP_THREE: '3',
  STEP_FOUR: '4',
  STEP_SIX: '6', // UNUSED
  PENDING: '7',
  ACCEPTED: '8',
  REJECTED: '9',
  ENDED_WITH_NO_APPLICATION: '10',
  UNKNOWN: '11',
};


const initialState = from({
  isLoading: true, // indicate loading by default
  error: false, // indicate verification fetch error
  // Verification steps state (from server)
  formStepIsProcessing: false, // indicate async process is executing on form
  steps: {
    1: null,
    2: null,
    3: null,
    4: null,
    6: null,
  },
  step: null,
});

export default createReducer({
  [initVerification.SUCCESS]: (state, { payload }) => (
    state.merge({
      ...payload
    })
  ),

  [initVerification.FAILURE]: (state, { payload }) => (
    state.merge({
      error: payload.error
    })
  ),

  // Hack to go to PENDING step
  [GO_TO_STEP_PENDING]: (state) => (
    state.merge({ step: VERIFICATION_STEP_TYPE.PENDING })
  ),

  [fetchVerification.SUCCESS]: (state, { payload }) => {
    const { steps, canRetryDocumentsUpload, approvalStatus, ended } = payload;
    const lastCompletedStep = getKeyOfLastTruthyKvp(steps);

    let step;
    switch (lastCompletedStep) {
      case VERIFICATION_STEP_TYPE.STEP_ONE:
        step = VERIFICATION_STEP_TYPE.STEP_TWO;
        break;

      case VERIFICATION_STEP_TYPE.STEP_TWO: {
        if (canRetryDocumentsUpload) {
          step = VERIFICATION_STEP_TYPE.STEP_TWO;
        }
      } // fallthrough - to accomodate scenario where steps three or four failed to get captured on backend
      case VERIFICATION_STEP_TYPE.STEP_THREE:
      case VERIFICATION_STEP_TYPE.STEP_FOUR: {
        if (!approvalStatus) {
          step = VERIFICATION_STEP_TYPE.PENDING; // Pending if approval status not available and retries exceeded
        // Approval Status is present
        } else if (approvalStatus.outcome === 'ACCEPTED' || approvalStatus.outcome === 'CLEARED') {
          step = VERIFICATION_STEP_TYPE.ACCEPTED; // Accepted when approval outcome status accepted
        } else if (approvalStatus.outcome === 'REJECTED') {
          step = VERIFICATION_STEP_TYPE.REJECTED; // Rejected when aopproval outcome status rejected
        } else {
          step = VERIFICATION_STEP_TYPE.UNKNOWN; // Unknown status
        }
        break;
      }

      default:
        step = VERIFICATION_STEP_TYPE.STEP_ONE;
    }

    // Accomodate KYC ended but application not completed
    if (ended) {
      // If user has not submitted anything and application period ended
      if (step === VERIFICATION_STEP_TYPE.STEP_ONE) {
        step = VERIFICATION_STEP_TYPE.ENDED_WITH_NO_APPLICATION;
      } else if (!approvalStatus) {
        step = VERIFICATION_STEP_TYPE.PENDING; // No approval status means pending
      } else if (approvalStatus.outcome === 'ACCEPTED' || approvalStatus.outcome === 'CLEARED') {
        step = VERIFICATION_STEP_TYPE.ACCEPTED; // Accepted when approval outcome status accepted
      } else if (approvalStatus.outcome === 'REJECTED') {
        step = VERIFICATION_STEP_TYPE.REJECTED; // Rejected when approval outcome status rejected
      } else {
        step = VERIFICATION_STEP_TYPE.PENDING; // Default status to pending
      }
    }

    return state.merge({
      isLoading: false,
      step,
    });
  },

  [fetchVerification.FAILURE]: (state) => (
    state.merge({
      isLoading: false,
      error: true,
    })
  ),

  // -- Handlers for verification step form submissions
  // Step One
  [verifyStepOne.REQUEST]: (state) => (
    state.merge({ formStepIsProcessing: true })
  ),

  [verifyStepOne.SUCCESS]: (state) => (
    state.merge({
      formStepIsProcessing: false,
      step: VERIFICATION_STEP_TYPE.STEP_TWO,
    })
  ),

  [verifyStepOne.FAILURE]: (state) => (
    state.merge({ formStepIsProcessing: false })
  ),

  // Step Two
  [verifyStepTwo.REQUEST]: (state) => (
    state.merge({ formStepIsProcessing: true })
  ),

  [verifyStepTwo.SUCCESS]: (state) => (
    state.merge({
      formStepIsProcessing: false,
      step: VERIFICATION_STEP_TYPE.PENDING,
    })
  ),

  [verifyStepTwo.FAILURE]: (state) => (
    state.merge({ formStepIsProcessing: false })
  ),
}, initialState);
