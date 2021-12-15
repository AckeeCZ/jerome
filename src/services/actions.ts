import type { IntlShape } from 'react-intl';
import type { Locale } from '../types';
import actionTypes from './actionTypes';

export function setLocale(locale: Locale) {
    return {
        locale,
        type: actionTypes.SET_LOCALE,
    };
}

export function getLocale() {
    return {
        type: actionTypes.GET_LOCALE,
    };
}

export const setIntl = (payload: { intl: IntlShape }) => ({
    payload,
    type: actionTypes.SET_INTL,
});

export { actionTypes };
