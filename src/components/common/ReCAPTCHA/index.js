import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const { GOOGLE_RECAPTCHA_SITE_KEY } = process.env;

const WrappedReCAPTCHA = ({ input: { onChange } }) => (
  <ReCAPTCHA
    sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
    onChange={onChange}
  />
);

export default WrappedReCAPTCHA;
