import { Action } from '../../types';
import { takeEvery, getContext } from 'redux-saga/effects';
import { IntlShape } from 'react-intl';

import { SAGA_CONTEXT_KEY } from '../../constants';

import types from '../actionTypes';

interface IntlContextValueShape {
    intl?: IntlShape;
}

interface IntlContextShape {
    [SAGA_CONTEXT_KEY]: IntlContextValueShape;
}

export const IntlContext: IntlContextShape = {
    [SAGA_CONTEXT_KEY]: {},
};

export function createIntlContext(): IntlContextShape {
    return IntlContext;
}

export function* getIntl() {
    const intlContext: IntlContextValueShape = yield getContext(SAGA_CONTEXT_KEY);
    if (intlContext) {
        const { intl } = intlContext;
        return intl || null;
    }
    return null;
}

function* setIntl(action: Action) {
    const intl: IntlShape = action.payload.intl;

    const intlContext: IntlContextValueShape = yield getContext(SAGA_CONTEXT_KEY);

    if (intlContext) {
        intlContext.intl = intl;
    }
}

export default function* intlProviderFlow() {
    yield takeEvery(types.SET_INTL, setIntl);
}
