import React from 'react';

import s from './styles.css';

const ProgressBar = ({ progressPercentage, height }) => (
  <div className={s.bar} style={{ height }}>
    <div
      className={s.progress} role="progressbar"
      style={{
        width: `${progressPercentage}%`,
      }}
    />
  </div>
);

export default ProgressBar;
