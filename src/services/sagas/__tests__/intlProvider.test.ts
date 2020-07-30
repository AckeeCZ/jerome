import { all, setContext, put, takeEvery, delay } from 'redux-saga/effects';
import SagaTester from 'redux-saga-tester';

import types from '../../actionTypes';
import { setIntl } from '../../actions';

import intlProvider, { createIntlContext, getIntl } from '../intlProvider';

const TEST_ACTION = 'TEST_ACTION';

const testActionCreator = intl => ({
    type: TEST_ACTION,
    intl,
});

function* testGetIntl() {
    yield takeEvery(types.SET_INTL, function*() {
        const intl = yield getIntl();
        yield put(testActionCreator(intl));
    });
}

describe('intProvider', () => {
    it('return null if the context is not set properly', async () => {
        function* testerSaga() {
            yield all([intlProvider(), testGetIntl()]);
        }

        let sagaTester = new SagaTester();
        const mockIntl = {};

        sagaTester.start(testerSaga);

        sagaTester.dispatch(setIntl({ intl: mockIntl }));

        const testAction = await sagaTester.waitFor(TEST_ACTION);

        expect(testAction.intl).toEqual(null);
    });

    it('correctly stores the intl to the context', async () => {
        function* testerSaga() {
            yield setContext(createIntlContext());

            yield all([intlProvider(), testGetIntl()]);
        }

        let sagaTester = new SagaTester();
        const mockIntl = {};

        sagaTester.start(testerSaga);

        sagaTester.dispatch(setIntl({ intl: mockIntl }));

        const testAction = await sagaTester.waitFor(TEST_ACTION);

        expect(testAction.intl).toEqual(mockIntl);
    });
});
