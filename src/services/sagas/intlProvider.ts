import { Action } from '../../types';
import { takeEvery, setContext, getContext } from 'redux-saga/effects';
import { IntlShape } from 'react-intl';

import { SAGA_CONTEXT_KEY } from '../../constants';

import types from '../actionTypes';

function* setIntl(action: Action) {
    const intl: IntlShape = action.payload.intl;
    yield setContext({
        [SAGA_CONTEXT_KEY]: intl,
    });
}

export function* getIntl() {
    const intl: IntlShape | null = yield getContext(SAGA_CONTEXT_KEY) || null;
    return intl;
}

export default function* intlProviderFlow() {
    yield takeEvery(types.SET_INTL, setIntl);
}
