import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'react-notification-system-redux';

import app from './modules/app/app';
import sidebar from './modules/app/sidebar';

import signInReducer from './modules/auth/signIn';
import signUpReducer from './modules/auth/signUp';
import restorePassword from './modules/auth/restorePassword';

import verification from './modules/verification/verification';
import tokenSale from './modules/tokenSale/tokenSale';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  notifications: notificationsReducer,

  app: combineReducers({
    app,
    sidebar
  }),

  auth: combineReducers({
    signIn: signInReducer,
    signUp: signUpReducer,
    restorePassword
  }),

  verification: combineReducers({
    verification
  }),
  tokenSale: combineReducers({
    tokenSale,
  }),
});
