import React from 'react';

import s from './styles.css';

import Spinner from '../Spinner';

/**
 * Higher Order Component that wraps a base component with loading elements
 * @param {React.Component} WrappedComponent
 */
function WithLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    const Component = <WrappedComponent {...props} />;

    return isLoading
      ? (<div className={s.wrapper}>
          {Component}
          <div className={s.loader}>
            <Spinner color="#0080ff" />
          </div>
        </div>)
      : Component;
  };
}

export default WithLoading;
