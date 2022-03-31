import { all, setContext, put, takeEvery } from 'redux-saga/effects';
import SagaTester from 'redux-saga-tester';

import types from '../../actionTypes';
import { setIntl } from '../../actions';

import intlProvider, { createIntlContext, getIntl } from '../intlProvider';
import { IntlShape } from 'react-intl';

const TEST_ACTION = 'TEST_ACTION';

const testActionCreator = (intl: IntlShape) => ({
    intl,
    type: TEST_ACTION,
});

function* testGetIntl() {
    yield takeEvery(types.SET_INTL, function* () {
        const intl = yield getIntl();
        yield put(testActionCreator(intl));
    });
}

describe('intProvider', () => {
    it('waits for SET_INTL action if the context is not set properly', async () => {
        function* testerSaga() {
            yield all([intlProvider(), testGetIntl()]);
        }

        const sagaTester = new SagaTester();
        const mockIntl = {} as IntlShape;

        sagaTester.start(testerSaga);

        sagaTester.dispatch(setIntl({ intl: mockIntl }));

        expect(sagaTester.wasCalled(TEST_ACTION)).toBeFalsy();
    });

    it('correctly stores the intl to the context', async () => {
        function* testerSaga() {
            yield setContext(createIntlContext());

            yield all([intlProvider(), testGetIntl()]);
        }

        const sagaTester = new SagaTester();
        const mockIntl = {} as IntlShape;

        sagaTester.start(testerSaga);

        sagaTester.dispatch(setIntl({ intl: mockIntl }));

        const testAction = await sagaTester.waitFor(TEST_ACTION);

        expect(testAction.intl).toEqual(mockIntl);
    });
});
