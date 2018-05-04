import React from 'react';

import FieldError from '../FieldError';
import Select from '../../common/Select';

const RenderSelect = (props) => {
  const {
    input,
    meta,
    selectOptions, // (Array) values for select options
    placeholderOption, // (String) Use placeholder option
    ...restProps
  } = props;

  const renderSelectOptions = () => {
    const selectOptionsToRender = [];

    // Add placeholder option if set
    if (placeholderOption) {
      selectOptionsToRender.push((
        <option key="placeholderOption" value="" disabled={true}>{placeholderOption}</option>
      ));
    }

    // Add passed in select options
    if (selectOptions && selectOptions.constructor === Array) {
      selectOptions.forEach((selectOption) => selectOptionsToRender.push((
        <option key={selectOption} value={selectOption}>{selectOption}</option>
      )));
    }

    return selectOptionsToRender;
  };

  return (
    <FieldError meta={meta}>
      <Select
        meta={meta}
        {...input}
        {...restProps}
      >{renderSelectOptions()}</Select>
    </FieldError>
  );
};

export default RenderSelect;