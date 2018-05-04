import React from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

const Select = (props) => {
  const {
    children,
    invalid,
    size,
    tip,
    meta,
    ...restProps
  } = props;

  const getSize = (val) => {
    switch (val) {
      case 'large':
        return s.large;
      default:
        return null;
    }
  };

  const renderSelectCaret = () => (
    <svg className={s.selectCaret} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" version="1.1">
      <g transform="translate(-45186 31002)">
        <path
          transform="matrix(-1 -1.22656e-16 1.22274e-16 -1 45196.7 -30996.2)"
          fill="#203542"
        d="M 5.62499 0L 10.4964 5.63376L 0.753605 5.63376L 5.62499 0Z"
      />
      </g>
    </svg>
  );

  const renderTip = (tip) =>
    (tip && meta.dirty ? (<div className={s.tip}>{tip}</div>) : null);

  const className = cx(
    s.select,
    getSize(size),
    tip ? s.withTip : null
  );

  return (
    <div className={s.wrapper}>
      {renderSelectCaret()}
      <select className={className} {...restProps}>
        {children}
      </select>
      {renderTip(tip)}
    </div>
  );
};

export default Select;
