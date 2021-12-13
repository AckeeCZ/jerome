import { takeEvery, all, put,  } from 'redux-saga/effects';

import type { Action,  } from '../../../types';
import { LOCALE_KEY } from '../../../constants';
import { logger } from '../../../config';

import { setLocale } from '../../actions';
import types from '../../actionTypes';

import * as IndexedDBStorage from './IndexedDBWrapper';

function* saveLocaleToLocalStorage(action: Action) {
    try {
        yield IndexedDBStorage.set(LOCALE_KEY, action.locale);
    } catch (e) {
        logger.error(e);
    }
}

function* retrieveLocaleFromLocaleStorage() {
    try {
        const locale = yield IndexedDBStorage.get(LOCALE_KEY);

        if (locale) {
            yield put(setLocale(locale));
        }
    } catch (e) {
        logger.error(e);
    }
}

export default function*() {
    yield all([takeEvery(types.SET_LOCALE, saveLocaleToLocalStorage), retrieveLocaleFromLocaleStorage()]);
}
