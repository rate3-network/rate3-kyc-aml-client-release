import React from 'react';

import s from './style.css';

const SpanLink = (props) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <span
      className={s.spanLink}
      {...restProps}
    >{children}</span>
  );
};

export default SpanLink;
