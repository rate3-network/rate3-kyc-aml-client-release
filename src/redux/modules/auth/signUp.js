import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction, createAction } from '../../../utils/actions';

export const SIGN_UP = 'auth/signUp/SIGN_UP';
export const END_SIGNUP = 'auth/signUp/END_SIGNUP';
export const RESET_STORE = 'auth/signUp/RESET_STORE';
export const CHANGE_STEP = 'auth/signUp/CHANGE_STEP';

export const signUp = createSubmitAction(SIGN_UP);
export const endSignup = createAction(END_SIGNUP);
export const resetStore = createAction(RESET_STORE);
export const changeStep = createAction(CHANGE_STEP);

const initialState = from({
  step: 'signup',
  email: '',
  accessToken: '',
  spinner: false
});

export default createReducer({
  [signUp.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [signUp.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
    })
  ),

  [signUp.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [CHANGE_STEP]: (state, { payload }) => (
    state.merge({
      step: payload
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
