import { all } from 'redux-saga/effects';
import { leadsSaga } from './leads/sagas';
import { formSaga } from './form/sagas';

export function* rootSaga() {
  yield all([
    leadsSaga(),
    formSaga(),
  ]);
}
