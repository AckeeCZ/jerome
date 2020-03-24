import { Locale, Action } from '../types';
import actionTypes from './actionTypes';

export function setLocale(locale: Locale): Action {
    return {
        locale,
        type: actionTypes.SET_LOCALE,
    };
}

export function getLocale(): Action {
    return {
        type: actionTypes.GET_LOCALE,
    };
}

export const setIntl = (payload = {}): Action => ({
    payload,
    type: actionTypes.SET_INTL,
});

export { actionTypes };
