import { all } from 'redux-saga/effects';

import intlProvider from './intlProvider';
import storageHandlers from './storageHandlers';

export { getIntl, createIntlContext } from './intlProvider';

export function* saga() {
    yield all([intlProvider(), storageHandlers()]);
}
