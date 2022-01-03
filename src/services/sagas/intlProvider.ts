import { takeEvery, getContext, take, TakeEffect } from 'redux-saga/effects';
import type { GetContextEffect } from 'redux-saga/effects';
import type { IntlShape } from 'react-intl';

import { SAGA_CONTEXT_KEY } from '../../constants';

import types from '../actionTypes';
import * as actions from '../actions';

export interface IntlContextValueShape {
    intl?: IntlShape;
}

export interface IntlContextShape {
    [SAGA_CONTEXT_KEY]: IntlContextValueShape;
}

export const IntlContext: IntlContextShape = {
    [SAGA_CONTEXT_KEY]: {},
};

export function createIntlContext(): IntlContextShape {
    return IntlContext;
}

export function* getIntl(): Generator<GetContextEffect | TakeEffect, IntlShape, IntlContextValueShape> {
    const intlContext = yield getContext(SAGA_CONTEXT_KEY);

    if (!intlContext?.intl) {
        yield take(types.SET_INTL);
    }

    return intlContext.intl as IntlShape;
}

function* setIntl(
    action: ReturnType<typeof actions['setIntl']>,
): Generator<GetContextEffect, void, IntlContextValueShape> {
    const intlContext = yield getContext(SAGA_CONTEXT_KEY);

    if (intlContext) {
        intlContext.intl = action.payload.intl;
    }
}

export default function* intlProviderFlow() {
    yield takeEvery(types.SET_INTL, setIntl);
}
