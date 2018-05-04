// -- Error Type definitions
// Shared errors
const INVALID_EMAIL = 'auth/invalid-email';
// Sign In errors
const USER_DISABLED = 'auth/user-disabled';
const USER_NOT_FOUND = 'auth/user-not-found';
const WRONG_PASSWORD = 'auth/wrong-password';
// Sign Up errors
const EMAIL_IN_USE = 'auth/email-already-in-use';
const NOT_ALLOWED = 'auth/operation-not-allowed'; // Sign up type not enabled in Firebase Console
const WEAK_PASSWORD = 'auth/weak-password';
// User functions errors
const NOT_LOGGED_IN = 'custom/not-logged-in'; // Custom-defined error for auth user null
const EMAIL_ALREADY_VERIFIED = 'custom/email-already-verified';
// Init errors
const APP_NOT_INITIALIZED = 'custom/app-not-initialized';

class FirebaseAuthError extends Error {
  constructor(error) {
    super(error.message);
    this.name = 'FirebaseAuthError';

    this.type = error.code;
    this.message = error.message;

    Error.captureStackTrace(this, FirebaseAuthError);
  }
}
FirebaseAuthError.TYPE = {
  // Shared
  INVALID_EMAIL,
  // Sign in
  USER_DISABLED,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  // Sign up
  EMAIL_IN_USE,
  NOT_ALLOWED,
  WEAK_PASSWORD,
  // User functions
  NOT_LOGGED_IN,
  EMAIL_ALREADY_VERIFIED,
  // Init
  APP_NOT_INITIALIZED,
};

export default FirebaseAuthError;
