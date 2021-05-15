import { assert } from 'chai';

import { TokenArgument } from '@src/logging/formatters/pattern-tokens/TokenArgument';

describe('TokenArgument', () => {

    describe('fromString', () => {

        it(`fromString - given no value, creates a basic TokenArgument with no value`, () => {
            const key = "color"
            const arg = key;

            const result = TokenArgument.fromString(arg);

            assert.equal(result.key, key);
            assert.isUndefined(result[ 'value' ]);
        });

        it(`fromString - given a string value, creates a basic TokenArgument with no value`, () => {
            const key = "color";
            const value = "REd";
            const arg = key + ":" + value;

            const result = TokenArgument.fromString(arg);

            assert.equal(result.key, key);
            assert.equal(result[ 'value' ], value);
            assert.typeOf(result[ 'value' ], 'string');
        });

        it(`fromString - given a numeric value, creates a basic TokenArgument with no value`, () => {
            const key = "length";
            const value = 42;
            const arg = key + ":" + value;

            const result = TokenArgument.fromString(arg);

            assert.equal(result.key, key);
            assert.equal(result[ 'value' ], value);
            assert.typeOf(result[ 'value' ], 'number');
        });
    });
})
