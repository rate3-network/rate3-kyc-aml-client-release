import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const INITIATE_RESTORE_PASSWORD = 'auth/restorePassword/INITIATE_RESTORE_PASSWORD';
export const RESET_STORE = 'auth/restorePassword/RESET_STORE';

export const initiateRestorePassword = createSubmitAction(INITIATE_RESTORE_PASSWORD);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  resetRequestSent: false,
  spinner: false,
});

export default createReducer({
  [initiateRestorePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateRestorePassword.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      resetRequestSent: true,
    })
  ),

  [initiateRestorePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
