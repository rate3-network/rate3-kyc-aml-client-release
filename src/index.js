import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { AppContainer } from 'react-hot-loader';

import './assets/css/normalize.css';
import './assets/css/main.css';
import './assets/fonts/Roboto/stylesheet.css';

import configureStore from './redux/configureStore';
import routes from './routes';
import i18next from './utils/i18next';

import Firebase from './utils/firebase';
import CrowdsaleContract from './utils/contract/CrowdsaleContract';
import Spinner from './components/common/Spinner';

Raven.config(process.env.RAVEN_URL).install();
CrowdsaleContract.init();

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

const render = (appRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <Router history={history} routes={appRoutes} />
        </I18nextProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

const renderLoading = () => {
  ReactDOM.render(
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Spinner color="#0080ff"/>
    </div>,
    document.getElementById('app')
  );
};

// Wrapper for rendering app or loading screen
const startApp = (appRoutes) => {
  renderLoading();
  // Initialize Firebase and render app after init completes
  Firebase.initAsync()
    .then(() => {
      render(appRoutes);
    });
};

startApp(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    startApp(require('./routes').default);
  });
}
