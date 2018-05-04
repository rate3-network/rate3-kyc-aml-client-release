import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

// -- Action Type
export const GET_TOKEN_SALE_DATA = 'tokenSale/tokenSale/GET_TOKEN_SALE_DATA';
export const GET_CROWDSALE_BALANCE = 'tokenSale/tokenSale/GET_CROWDSALE_BALANCE';
export const GET_WHITELIST_STATUS = 'tokenSale/tokenSale/GET_WHITELIST_STATUS';

// -- Action Creators
export const getTokenSaleData = createAsyncAction(GET_TOKEN_SALE_DATA);
export const getCrowdsaleBalance = createAsyncAction(GET_CROWDSALE_BALANCE);
export const getWhitelistStatus = createAsyncAction(GET_WHITELIST_STATUS);

const initialState = from({
  saleDataLoading: false,
  tokensSold: undefined,
  tokensCap: undefined,
  saleDataError: null,
  balanceLoading: false,
  tokenInvestments: undefined,
  bonusTokenInvestments: undefined,
  balanceError: null,
  whitelistStatus: undefined,
  whitelistStatusError: null,
});

export default createReducer({
  [getTokenSaleData.REQUEST]: (state) => (
    state.merge({
      saleDataLoading: true,
      saleDataError: initialState.saleDataError,
    })
  ),

  [getTokenSaleData.SUCCESS]: (state, { payload }) => (
    state.merge({
      saleDataLoading: false,
      tokensSold: payload.tokensSold,
      tokensCap: payload.tokensCap,
    })
  ),

  [getTokenSaleData.FAILURE]: (state) => (
    state.merge({
      saleDataLoading: false,
      saleDataError: true,
    })
  ),

  [getCrowdsaleBalance.REQUEST]: (state) => (
    state.merge({
      balanceLoading: true,
      balanceError: initialState.balanceError,
    })
  ),

  [getCrowdsaleBalance.SUCCESS]: (state, { payload }) => (
    state.merge({
      balanceLoading: false,
      ...payload,
    })
  ),

  [getCrowdsaleBalance.FAILURE]: (state) => (
    state.merge({
      balanceLoading: false,
      balanceError: true,
    })
  ),

  [getWhitelistStatus.SUCCESS]: (state, { payload }) => (
    state.merge({
      whitelistStatus: payload,
    })
  ),

  [getWhitelistStatus.FAILURE]: (state, { payload }) => (
    state.merge({
      whitelistStatusError: true,
    })
  )
}, initialState);
