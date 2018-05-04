import Web3 from 'web3';

import Globals from '../../locales/globals';

import nationalities from './nationalities';
import countries from './countries';
import documentTypes from './documentTypes';

const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEXP = /^[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
export const NUMBER_REGEXP = /^\d{0,}(\.\d{0,}){0,1}$/;

export const requiredValidator = (msg) =>
  (value) =>
    (value ? '' : msg || 'required');

export const minLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length >= limit ? '' : msg || `minLength ${limit}`);

export const maxLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length <= limit ? '' : msg || `maxLength ${limit}`);

export const minNumber = (limit, msg) =>
  (value) => (limit && value && Number(value) >= limit ? '' : msg || `Min ${limit}`);

export const length = (prop, msg) =>
  (value) =>
    (value && prop && value.length === prop ? '' : msg || `length ${prop}`);

export const email = (msg) =>
  (value) =>
    (value && EMAIL_REGEXP.test(value) ? '' : msg || 'invalid email');

export const password = (msg) =>
  (value) =>
    (value && PASSWORD_REGEXP.test(value) ? '' : msg || 'incorrect password');

export const numberValidator = (msg) =>
  (value) =>
    (value && NUMBER_REGEXP.test(value) ? '' : msg || 'not number');

// KYC validators
export const nationalityValidator = (msg) =>
  (value) =>
    (value && nationalities.includes(value) ? '' : msg || 'unknown nationality');

export const countryValidator = (msg) =>
  (value) =>
    (value && countries.includes(value) ? '' : msg || 'unknown country');

export const ethereumAddressValidator = (msg) =>
  (value) =>
    (value && Web3.utils.isAddress(value) ? '' : msg || 'unknown address');

export const ethereumAmountIntendedValidator = (invalidNumMsg, outOfRangeMsg) =>
  (value) => {
    const MINIMUM_AMOUNT = 0.01;
    const MAXIMUM_AMOUNT = 10000;
    const MAXIMUM_DECIMAL_PLACES = 2;

    // Validate number
    if (!NUMBER_REGEXP.test(value)) {
      console.log('invalid num');
      return invalidNumMsg || 'not number';
    }

    // Validate not more than maximum allowed decimal places
    const decimalValueString = value.split('.')[1];
    if (decimalValueString && decimalValueString.length > MAXIMUM_DECIMAL_PLACES) {
      return outOfRangeMsg || `maximum ${MAXIMUM_DECIMAL_PLACES} decimal places`;
    }

    // Validate number in range
    const numericValue = Number(value);
    if (numericValue < MINIMUM_AMOUNT || numericValue > MAXIMUM_AMOUNT) {
      return outOfRangeMsg || `must be between ${MINIMUM_AMOUNT} and ${MAXIMUM_AMOUNT}`;
    }

    return '';
  };

export const documentTypeValidator = (msg) =>
  (value) =>
    (value && documentTypes.includes(value) ? '' : msg || 'unknown document type');

export const fileRequiredValidator = (msg) =>
  (value) =>
    (value && value.length > 0 ? '' : msg || 'required');

export const maxFileSize = (maxBytes, msg) =>
  (value) =>
    (value && value.every((file) => file.size <= maxBytes) ? '' : msg || 'file size limit exceeded');

export const maxFileNameLength = (limit, msg) =>
  (value) =>
    (value && value.every((file) => file.name.length < limit) ? '' : msg || 'file name limit exceeded');

export const dateFormatValidator = (msg) =>
  (value) =>
    (value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? '' : msg || 'must be YYYY-MM-DD');

export const dateOfBirthValidator = (msg) =>
  (value) =>
    (value && ((new Date(value)) < Date.now()) ? '' : msg || 'invalid date of birth');

export const minAge = (limit, msg) =>
  (value) => {
    if (!value) {
      return msg || `minimum age ${limit}`;
    }

    const timeValueDifference = Date.now() - (new Date(value)).getTime();
    const ageDate = new Date(timeValueDifference);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return (age >= limit) ? '' : msg || `minimum age ${limit}`;
  };

export const emailValidate = [
  requiredValidator('Must be filled'),
  email('Invalid e-mail')
];

export const passwordValidate = [
  requiredValidator('Must be filled'),
  password('Invalid password')
];

export const fullNameValidate = [
  requiredValidator('Must be filled'),
  minLength(3, 'Min 3 chars'),
  maxLength(30, 'Max 30 chars')
];

export const required = [
  requiredValidator('Must be filled')
];

export const twoFactorCode = [
  minLength(6, 'Require 6 digits'),
  maxLength(6, 'Require 6 digits')
];

export const number = [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers')
];

export const ethInvest = [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers'),
  minNumber(0.1, 'Min 0.1 ETH')
];

export const jcrInvest = (rate) => [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers'),
  minNumber(0.1 / rate, `Min ${0.1 / rate} ${Globals.tokenName}`)
];

// KYC validate rules
export const nameValidate = [
  requiredValidator('Must be filled'),
  minLength(2, 'Min 2 chars'),
  maxLength(30, 'Max 30 chars'),
];

export const nationalityValidate = [
  requiredValidator('Must select a nationality'),
  nationalityValidator('Select a valid nationality'),
];

export const countryValidate = [
  requiredValidator('Must select a country'),
  countryValidator('Select a valid country'),
];

export const dateOfBirthValidate = [
  requiredValidator('Must be filled'),
  dateFormatValidator('Date must be in format YYYY-MM-DD'),
  dateOfBirthValidator('Invalid date of birth'),
  minAge(18, 'Minimum 18 years old'),
];

export const ethereumAddressValidate = [
  requiredValidator('Must be filled'),
  ethereumAddressValidator('Invalid etherum address'),
];

export const ethereumAmountIntendedValidate = [
  requiredValidator('Must be filled'),
  ethereumAmountIntendedValidator(),
];

export const documentTypeValidate = [
  requiredValidator('Must select a document type'),
  documentTypeValidator('Invalid document type'),
];

export const fileValidate = [
  fileRequiredValidator('Must upload file'),
  maxFileSize(2000000, 'File size must not exceed 2 MB'),
  maxFileNameLength(80, 'File name must be less than 80 characters'),
];
