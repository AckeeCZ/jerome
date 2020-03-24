import { Action } from '../../types';
import { call, take, race } from 'redux-saga/effects';
import { IntlShape } from 'react-intl';

import types from '../actionTypes';

let intl: IntlShape | null = null;

function* initializedIntlProvider(action: Action) {
    intl = action.payload.intl;
}

export function* getIntl() {
    if (!intl) {
        const { payload } = yield take(types.CREATE_INTL_PROVIDER);
        return payload.intl;
    }
    return intl;
}

function cleanUp() {
    intl = null;
}

export default function* intlProviderFlow() {
    while (true) {
        const action = yield take(types.CREATE_INTL_PROVIDER);

        const result = yield race({
            task: call(initializedIntlProvider, action),
            cancel: take(types.DESTROY_INTL_PROVIDER),
        });

        if (!result.cancel) {
            yield take(types.DESTROY_INTL_PROVIDER);
        }

        cleanUp();
    }
}
