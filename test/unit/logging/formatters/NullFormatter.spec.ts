// import { assert } from 'chai';
// import { AnyRandom, CharacterSet } from '@auturge/testing';

// // import { NullFormatter } from "@src/logging/formatters/NullFormatter";
// import { ILogEntry } from '@src/logging/ILogEntry';
// import { LOG_LEVELS } from '@src/logging/LogLevel';
// import { LOG_STATUSES } from '@src/logging/LogStatus';
// import { IStatusEntry } from '@src/logging/impl/IStatusEntry';

// describe('NullFormatter', () => {

//     var formatter: NullFormatter;

//     describe('formatMessage', () => {

//         beforeEach(() => {
//             formatter = new NullFormatter();
//         });

//         [
//             { key: 'an empty string', value: "" },
//             { key: 'an non-empty string', value: AnyRandom.string(5, 8, CharacterSet.ALPHA) },
//         ].forEach(({ key, value }) => {
//             it(`formatMessage - returns an empty string when message is ${ key }`, () => {
//                 var entry: IStatusEntry = {
//                     data: { status: AnyRandom.oneOf(LOG_STATUSES) },
//                     message: value,
//                     level: AnyRandom.oneOf(LOG_LEVELS),
//                     source: AnyRandom.string(5, 8, CharacterSet.ALPHA),
//                     timestamp: new Date()
//                 }

//                 var result = formatter.formatMessage(entry);

//                 assert.equal(result, "");
//             });
//         });

//         it(`formatData - returns an empty string when data is undeclared`, () => {
//             var entry: IStatusEntry = {
//                 message: AnyRandom.string(5, 8, CharacterSet.ALPHA),
//                 level: AnyRandom.oneOf(LOG_LEVELS),
//                 data: { status: AnyRandom.oneOf(LOG_STATUSES) },
//                 source: AnyRandom.string(5, 8, CharacterSet.ALPHA),
//                 timestamp: new Date()
//             }

//             var result = formatter.formatData(entry, true);

//             assert.equal(result, "");
//         });

//         [
//             { key: 'null', value: null },
//             { key: 'undefined', value: undefined },
//             { key: 'an empty string', value: "" },
//             { key: 'an non-empty string', value: AnyRandom.string(5, 8, CharacterSet.ALPHA) },
//         ].forEach(({ key, value }) => {
//             it(`formatData - returns an empty string when data is ${ key }`, () => {
//                 var entry: ILogEntry = {
//                     message: AnyRandom.string(5, 8, CharacterSet.ALPHA),
//                     data: { status: AnyRandom.oneOf(LOG_STATUSES), obj: value },
//                     level: AnyRandom.oneOf(LOG_LEVELS),
//                     source: AnyRandom.string(5, 8, CharacterSet.ALPHA),
//                     timestamp: new Date()
//                 }

//                 var result = formatter.formatData(entry, true);

//                 assert.equal(result, "");
//             });
//         });
//     });
// });
