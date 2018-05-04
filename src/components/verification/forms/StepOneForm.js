import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import s from './styles.css';

// Import validators
import {
  nameValidate,
  nationalityValidate,
  countryValidate,
  dateOfBirthValidate,
  ethereumAddressValidate,
  ethereumAmountIntendedValidate,
} from '../../../utils/validators';

// Import select options
import nationalities from '../../../utils/validators/nationalities';
import countries from '../../../utils/validators/countries';

import Button from '../../common/Button';
import RenderInput from '../../forms/RenderInput';
import RenderSelect from '../../forms/RenderSelect';
import ReCAPTCHA from '../../common/ReCAPTCHA';

const StepOneForm = (props) => {
  const {
    // Translate function prop
    t,
    // Redux form wrapper props
    handleSubmit,
    invalid,
    error,
    spinner,
  } = props;

  return (
    <div>
      <div className={s.headingContainer}>
        <div className={s.title}>Personal Information</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <label htmlFor="country_of_residence" className={s.fieldLabel}>Country of Residence</label>
          <Field
            component={RenderSelect}
            id="country_of_residence"
            name="country_of_residence"
            disabled={spinner}
            validate={countryValidate}
            // Select props
            selectOptions={countries}
            placeholderOption="-- Select Country of Residence --" />
        </div>

        <div className={s.field}>
          <label htmlFor="first_name" className={s.fieldLabel}>First Name</label>
          <Field
            component={RenderInput}
            id="first_name"
            name="first_name"
            type="text"
            disabled={spinner}
            validate={nameValidate} />
        </div>

        <div className={s.field}>
          <label htmlFor="last_name"className={s.fieldLabel}>Last Name</label>
          <Field
            component={RenderInput}
            name="last_name"
            type="text"
            disabled={spinner}
            validate={nameValidate} />
        </div>

        <div className={s.field}>
          <label htmlFor="nationality" className={s.fieldLabel}>Nationality</label>
          <Field
            component={RenderSelect}
            id="nationality"
            name="nationality"
            disabled={spinner}
            validate={nationalityValidate}
            // Select props
            selectOptions={nationalities}
            placeholderOption="-- Select Nationality --" />
        </div>

        <div className={s.field}>
          <label htmlFor="date_of_birth" className={s.fieldLabel}>Date of Birth</label>
          <Field
            component={RenderInput}
            id="date_of_birth"
            name='date_of_birth'
            type="date"
            disabled={spinner}
            validate={dateOfBirthValidate} />
        </div>

        <div className={s.field}>
          <label htmlFor="ethAddress" className={s.fieldLabel}>Ethereum Wallet Address</label>
          <Field
            component={RenderInput}
            id="ethAddress"
            name="ethAddress"
            type="text"
            disabled={spinner}
            validate={ethereumAddressValidate} />
        </div>

        <div className={s.field}>
          <label htmlFor="ethAmountIntended" className={s.fieldLabel}>Intended ethereum amount</label>
          <Field
            component={RenderInput}
            // parse={(value) => (!value ? null : Number(value))}
            id="ethAmountIntended"
            name="ethAmountIntended"
            type="number"
            min="0.01"
            max="10000"
            step="0.01"
            disabled={spinner}
            validate={ethereumAmountIntendedValidate} />
        </div>

        <div className={s.field}>
          <Field
            component={ReCAPTCHA}
            name="g-recaptcha-response" />
        </div>

        {error && <div className={s.error}>{error}</div>}

        <div className={s.field}>
          <Button type="submit" spinner={spinner} disabled={invalid && !error}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'StepOne',
  initialValues: {
    first_name: '',
    last_name: '',
  }
})(StepOneForm);

const TranslatedComponent = translate('verification')(FormComponent);

export default TranslatedComponent;
