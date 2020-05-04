import 'babel-polyfill';

import translatableFactory from '../../lib/HOC/translatableFactory'
import translatableWithAntdFactory from '../../lib/HOC/translatableWithAntdFactory'

import * as standardJeromeImport from '../../../ackee-jerome';
import * as antdJeromeImport from '../../../ackee-jerome/antd';

describe('Imports', () => {
    it('HOC factory available from default import is the one without antd', () => {
        expect(standardJeromeImport.translatableFactory).toBe(translatableFactory);
    });

    it('HOC factory available from antd specific import is the one with antd', () => {
        expect(antdJeromeImport.translatableFactory).toBe(translatableWithAntdFactory);
    });
});
