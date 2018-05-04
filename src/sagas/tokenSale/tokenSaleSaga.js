import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';

import CrowdsaleContract from '../../utils/contract/CrowdsaleContract';

import { getTokenSaleData, getCrowdsaleBalance, getWhitelistStatus } from '../../redux/modules/tokenSale/tokenSale';

/**
 * Selectors
 */
export const getUserEthAddress = (state) => state.app.app.user.ethAddress;

/**
 * Handle token sale actions
 */

function* getTokenValuesIterator() {
  try {
    const tokensSold = yield call(CrowdsaleContract.getAllTokensSoldAsync);

    // Manipulate display values
    const tokensCapToShow = 96000000;
    const tokensSoldToShow = tokensSold < tokensCapToShow
      ? tokensSold
      : tokensCapToShow;

    yield put(getTokenSaleData.success({
      tokensSold: tokensSoldToShow,
      tokensCap: tokensCapToShow,
    }));
  } catch (e) {
    yield put(getTokenSaleData.failure());
  }
}

function* getTokenValuesSaga() {
  yield takeLatest(
    getTokenSaleData.REQUEST,
    getTokenValuesIterator,
  );
}

function* getCrowdsaleBalanceIterator() {
  try {
    const userEthAddress = yield select(getUserEthAddress);
    const [tokenInvestments, bonusTokenInvestments] = yield all([
      call(CrowdsaleContract.getTokenInvestmentsAsync, userEthAddress),
      call(CrowdsaleContract.getBonusTokenInvestmentsAsync, userEthAddress),
    ]);
    yield put(getCrowdsaleBalance.success({ tokenInvestments, bonusTokenInvestments }));
  } catch (e) {
    yield put(getCrowdsaleBalance.failure(e));
  }
}

function* getCrowdsaleBalanceSaga() {
  yield takeLatest(
    getCrowdsaleBalance.REQUEST,
    getCrowdsaleBalanceIterator,
  );
}

function* getWhitelistStatusIterator() {
  try {
    const userEthAddress = yield select(getUserEthAddress);
    const whitelistStatus = yield call(CrowdsaleContract.getWhitelistStatusAsync, userEthAddress);
    yield put(getWhitelistStatus.success(whitelistStatus));
  } catch (e) {
    yield put(getWhitelistStatus.failure(e));
  }
}

function* getWhitelistStatusSaga() {
  yield takeLatest(
    getWhitelistStatus.REQUEST,
    getWhitelistStatusIterator,
  );
}

export default function* () {
  yield all([
    fork(getTokenValuesSaga),
    fork(getCrowdsaleBalanceSaga),
    fork(getWhitelistStatusSaga),
  ]);
}
