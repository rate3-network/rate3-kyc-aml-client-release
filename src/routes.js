import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import { routerActions } from 'react-router-redux';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect';

import Globals from './locales/globals';

import App from './containers/app/App';

import AuthWrapper from './containers/auth/AuthWrapper';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import RestorePassword from './containers/auth/RestorePassword';

import AppWrapper from './containers/app/AppWrapper';
import Account from './containers/account/Account';
import TokenSale from './containers/tokenSale/TokenSale';
import Verification from './components/verification/Verification';
import VerificationSuccess from './components/verification/Success';
import VerificationFailure from './components/verification/Failure';

import VerifyEmail from './containers/auth/VerifyEmail';

export const namedRoutes = {
  base: '/',
  verifyEmail: '/verify-email',
  signIn: '/auth/signin',
  signUp: '/auth/signup',
  password: '/auth/password',
  dashboard: '/dashboard',
  account: '/dashboard/account',
  tokenSale: '/dashboard/token-sale',
  verification: '/dashboard/verification',
  verificationSuccess: '/dashboard/verification/success',
  verificationFailure: '/dashboard/verification/failure'
};

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: namedRoutes.dashboard,
  allowRedirectBack: false,
  authenticatedSelector: (state) => !state.app.app.authorized,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

const userIsAuthenticatedAndNotEmailVerified = connectedRouterRedirect({
  redirectPath: (state) => (state.app.app.authorized ? namedRoutes.base : namedRoutes.signIn),
  authenticatedSelector: (state) => state.app.app.authorized && !state.app.app.emailVerified,
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticatedAndNotEmailVerified',
});

const userIsAuthenticatedAndEmailVerified = connectedRouterRedirect({
  redirectPath: namedRoutes.verifyEmail,
  allowRedirectBack: false,
  authenticatedSelector: (state) => state.app.app.authorized && state.app.app.emailVerified,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticatedAndEmailVerified',
});

const userIsKycVerified = connectedRouterRedirect({
  redirectPath: namedRoutes.verification,
  allowRedirectBack: false,
  authenticatedSelector: ({
    app: {
      app: {
        user: { kycStatus }
      }
    }
  }) => (kycStatus === 'ACCEPTED' || kycStatus === 'CLEARED'),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsKycVerified',
});

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRedirect to="dashboard/verification"/>

      <Route path="verify-email" component={userIsAuthenticatedAndNotEmailVerified((props) => (
        <AuthWrapper {...props}>
          <VerifyEmail />
        </AuthWrapper>
      ))}/>

      <Route path="auth" component={userIsNotAuthenticated(AuthWrapper)}>
        <IndexRedirect to="/" />
        {Globals.allowAccountRegistration &&
        <Route path="signup" component={SignUp} />
        }
        <Route path="signin" component={SignIn} />
        <Route path="password" component={RestorePassword} />
      </Route>

      <Route path="dashboard" component={userIsAuthenticatedAndEmailVerified(AppWrapper)}>
        <IndexRedirect to="/" />
        <Route path="account" component={Account}/>
        <Route path="token-sale" component={userIsKycVerified(TokenSale)} />
        <Route path="verification" component={Verification}/>
        <Redirect from="*" to="/" />
      </Route>

      <Redirect from="*" to="/" />
    </Route>

    <Route path="/dashboard/verification/success" component={VerificationSuccess}/>
    <Route path="/dashboard/verification/failure" component={VerificationFailure}/>
  </div>
);

export default routes;
