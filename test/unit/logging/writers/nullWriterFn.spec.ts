
import { assert } from 'chai';

import * as WriterFn from '../../../../src/logging/writers/WriterFn';

describe('nullWriterFn', () => {

    it(`nullWriterFn - returns undefined, regardless of arguments`, () => {
        const args = [ 'chicken', 'noodle', 'soup' ];
        let result;

        assert.doesNotThrow(() => {
            result = WriterFn.nullWriterFn(...args);
        });

        assert.isUndefined(result);
    });
});
