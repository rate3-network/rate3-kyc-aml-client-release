import firebase from 'firebase';
import jwtDecode from 'jwt-decode';

import FirebaseAuthError from './FirebaseAuthError';

let _firebaseAppInstance = null;
let _firebaseInitPromise = null;

class Firebase {
  /**
   * Initializer for Firebase. Subsequent calls after first initialization will not reinitialize
   * the instance.
   *
   * @return {Promise<User>} A promise that resolves when the authentication state is determined
   */
  static initAsync() {
    // Return first initialization promise if available
    if (_firebaseInitPromise && _firebaseInitPromise instanceof Promise) {
      return _firebaseInitPromise;
    }

    // Create and save first initialization promise
    _firebaseInitPromise = new Promise((resolve) => {
      if (_firebaseAppInstance) {
        resolve();
      }

      _firebaseAppInstance = firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      });

      // Get first auth state change to determine actual auth state before resolving
      const unsubscribe = _firebaseAppInstance.auth().onAuthStateChanged((user) => {
        unsubscribe(); // Stop listening to auth state changes

        // Force token refresh if user is logged in and email verification status for user object
        // and token data mismatched
        // ref: https://stackoverflow.com/questions/41326951/firebase-email-verification-behavior
        if (user && user.emailVerified && !jwtDecode(this.getUserToken()).email_verified) {
          user.getIdToken(true)
            .catch() // Fall through to resolve promise on failure
            .then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
    return _firebaseInitPromise;
  }

  /**
   * Internal helper to get firebase authenticated user.
   *
   * @return {firebase.User} Firebase auth instance User.
   * https://firebase.google.com/docs/reference/js/firebase.User?authuser=0
   */
  static get _currentUser() {
    return _firebaseAppInstance.auth().currentUser;
  }

  /**
   * Create a user account with email and password on firebase.
   *
   * https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserWithEmailAndPassword
   *
   * @param {String} email Email credential to create account with.
   * @param {String} password Passsword credential to create account with.
   *
   * @return {Promise<String, FirebaseAuthError>} A promise that returns the user token string if resolved, or a FirebaseAuthError object if rejected.
   */
  static async createUserAccountAsync(email, password) {
    try {
      const authUserCredentials = await _firebaseAppInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return authUserCredentials.qa;
    } catch (error) {
      throw new FirebaseAuthError(error);
    }
  }

  /**
   * Send verification email.
   *
   * https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
   *
   * @return {Promise<Void, FirebaseAuthError>} A promise that returns if resolved, or a FirebaseAuthError object if rejected.
   */
  static async sendEmailVerificationAsync() {
    // Throw not logged in error if user is not logged in
    if (!this._currentUser) {
      throw new FirebaseAuthError({
        type: FirebaseAuthError.TYPE.NOT_LOGGED_IN,
        message: 'You must be logged in to send a verification email.',
      });
    }

    // Throw email verified error if user is logged in and email is already verified
    if (this._currentUser.emailVerified) {
      throw new FirebaseAuthError({
        type: FirebaseAuthError.TYPE.EMAIL_ALREADY_VERIFIED,
        message: 'Email has already been verified.',
      });
    }

    // Send email verification
    const actionCodeSettings = {
      url: process.env.DOMAIN,
    };

    try {
      await this._currentUser.sendEmailVerification(actionCodeSettings);
      return;
    } catch (error) {
      throw new FirebaseAuthError(error);
    }
  }
  /**
   * Send password reset email
   *
   * https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
   *
   * @param {String} email Email address for password reset.
   *
   * @return {Promise<Void, FirebaseAuthError>} A promise that returns if resolved, or a FirebaseAuthError object if rejected.
   */
  static async sendPasswordResetEmailAsync(email) {
    if (!_firebaseAppInstance) {
      throw new FirebaseAuthError({
        type: FirebaseAuthError.TYPE.APP_NOT_INITIALIZED,
        message: 'Application not initialized.',
      });
    }

    // Send password reset email
    const actionCodeSettings = {
      url: process.env.DOMAIN,
    };

    try {
      await _firebaseAppInstance.auth().sendPasswordResetEmail(email, actionCodeSettings);
      return;
    } catch (error) {
      throw new FirebaseAuthError(error);
    }
  }

  /**
   * Login with email and password to firebase.
   *
   * https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signOut
   *
   * @param {String} email Account email credential.
   * @param {String} password Account password credential.
   *
   * @return {Promise<String, FirebaseAuthError>} A promise that returns the user token string if resolved, or a FirebaseAuthError object if rejected.
   */
  static async loginAsync(email, password) {
    try {
      const authUserCredentials = await _firebaseAppInstance
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password);
      return authUserCredentials.user.qa;
    } catch (error) {
      throw new FirebaseAuthError(error);
    }
  }

  /**
   * Logout.
   *
   * https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signOut
   * @return {Promise<Void>} A promise that returns void.
   */
  static async logoutAsync() {
    return _firebaseAppInstance.auth().signOut();
  }

  /**
   * Retrieve user token.
   * @return {String} JSON Web Token. Returns `null` if unset or not found.
   */
  static getUserToken() {
    return this._currentUser && this._currentUser.qa;
  }

  /**
   * Retrieve user's name.
   * @return {String} User's name. Returns `null` if unset or not found.
   */
  static getUserName() {
    return this._currentUser && this._currentUser.displayName;
  }

  /**
   * Retrieve user's email.
   * @return {String} User's email. Returns `null` if unset or not found.
   */
  static getUserEmail() {
    return this._currentUser && this._currentUser.email;
  }

  /**
   * Retrieve user email verification status.
   * @return {Boolean} User's email verification status. `true` if verified, `false` otherwise.
   */
  static getUserEmailVerificationStatus() {
    return (this._currentUser || false) && this._currentUser.emailVerified;
  }
}

export default Firebase;
