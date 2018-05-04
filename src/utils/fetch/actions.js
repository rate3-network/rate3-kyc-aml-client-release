import { createAction } from '../actions';

export const FETCH_ERROR = 'util/fetch/FETCH_ERROR';

export const fetchError = createAction(FETCH_ERROR);
