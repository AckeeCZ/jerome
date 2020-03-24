import { Action } from '../../types';
import { take, takeEvery } from 'redux-saga/effects';
import { IntlShape } from 'react-intl';

import types from '../actionTypes';

let intl: IntlShape | null = null;

function setIntl(action: Action) {
    intl = action.payload.intl;
}

export function* getIntl() {
    if (!intl) {
        const { payload } = yield take(types.SET_INTL);
        return payload.intl;
    }
    return intl;
}

export default function* intlProviderFlow() {
    yield takeEvery(types.SET_INTL, setIntl);
}
