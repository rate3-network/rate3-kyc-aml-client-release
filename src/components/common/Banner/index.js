import React from 'react';
import s from './styles.css';

const Banner = ({ colorCode, text, textColor }) => (
  <div
    className={s.banner}
    style={{
      borderLeftColor: colorCode,
      color: textColor,
    }}
  >
    {text}
  </div>
);

export default Banner;