import Firebase from '../firebase';

export const getToken = () => Firebase.getUserToken() || '';

export const getEmail = () => {
  return Firebase.getUserEmail();
};

export const isAuth = () => {
  const token = getToken();

  if (token) {
    return true; // return true if token is available (regardless expired or not)
  }

  return false;
};
