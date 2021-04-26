// import { assert } from 'chai';
// import { channelMatches } from '@test/helpers';

// import { LogManager } from '@src/logging';
// import { ChannelBuilder } from '@src/logging/impl/ChannelBuilder';
// import { AnyRandom, CharacterSet } from '@auturge/testing';
// import { LogLevel } from '@src/logging/LogLevel';
// import { CONSOLE, NULL as NULL_TARGET } from '@src/logging/ITarget';
// import { PATTERN, NULL as NULL_FORMATTER } from '@src/logging/MessageFormatter';
// import { DEFAULT as DEFAULT_CHANNEL } from '@src/logging/impl/Channel';
// import { DEFAULT_CHANNEL as DEFAULT_CHANNEL_CONFIG } from '@src/logging/Defaults';

// describe('LogManager E2E', () => {
//     describe('initialize', () => {


//         describe('atLevel', () => {

//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined },
//             ].forEach(({ key, value }) => {
//                 it(`atLevel - throws when level is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.atLevel(arg);
//                     });
//                 });
//             });

//             [
//                 { value: LogLevel.OFF },
//                 { value: LogLevel.FATAL },
//                 { value: LogLevel.ERROR },
//                 { value: LogLevel.WARN },
//                 { value: LogLevel.INFO },
//                 { value: LogLevel.DEBUG },
//                 { value: LogLevel.TRACE },
//                 { value: LogLevel.ALL },
//             ].forEach(({ value }) => {
//                 it(`atLevel - [${ value.toString() }] - sets the channel level to the specified value`, () => {
//                     var expected = value;

//                     var result =
//                         LogManager.initialize.atLevel(expected);

//                     assert.equal(result.level, expected);
//                 });
//             });
//         });

//         describe('forTarget', () => {

//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined }
//             ].forEach(({ key, value }) => {
//                 it(`forTarget - throws when level is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.forTarget(arg);
//                     });
//                 });
//             });

//             [
//                 { key: 'console', value: CONSOLE },
//                 { key: 'null', value: NULL_TARGET }
//             ].forEach(({ key, value }) => {
//                 it(`forTarget - [${ key }] - sets the channel target to the specified value`, () => {
//                     var expected = value;

//                     var result =
//                         LogManager.initialize.forTarget(expected);

//                     assert.equal(result.target, expected);
//                 });
//             });
//         });

//         describe('fromConfig', () => {

//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined }
//             ].forEach(({ key, value }) => {
//                 it(`fromConfig - throws when config is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.fromConfig(arg);
//                     });
//                 });
//             });

//             [
//                 { key: 'default', value: DEFAULT_CHANNEL_CONFIG },
//                 { key: 'default', value: DEFAULT_CHANNEL },
//             ].forEach(({ key, value }) => {
//                 it(`fromConfig - [${ key }] - sets the channel target to the specified value`, () => {
//                     var expected = value;

//                     var result =
//                         LogManager.initialize.fromConfig(expected);

//                     channelMatches(expected, result.current);
//                 });
//             });
//         });

//         describe('newChannel', () => {

//             it('newChannel - creates a new channel with the default key', () => {
//                 var expected = ChannelBuilder.DEFAULT_CHANNEL_KEY;

//                 var result =
//                     LogManager.initialize.newChannel();

//                 assert.equal(result.key, expected);
//             });

//             it('newChannel - creates a new channel with the specified key', () => {
//                 var expected = AnyRandom.string(5, 8, CharacterSet.ALPHA);
//                 // console.log(`new channel name: ${ expected }`);

//                 var result =
//                     LogManager.initialize.newChannel(expected);

//                 assert.equal(result.key, expected);
//             });
//         });

//         describe('withFormatter', () => {
//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined }
//             ].forEach(({ key, value }) => {
//                 it(`withFormatter - throws when formatter is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.withFormatter(arg);
//                     });
//                 });
//             });

//             [
//                 { value: PATTERN },
//                 { value: NULL_FORMATTER }
//             ].forEach(({ value }) => {
//                 it(`withFormatter - [${ value.key }] - sets the channel formatter to the specified value`, () => {

//                     var result =
//                         LogManager.initialize.withFormatter(value);

//                     assert.equal(result.formatter, value);
//                 });
//             });
//         });

//         describe('withName', () => {

//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined },
//                 { key: 'empty string', value: "" }
//             ].forEach(({ key, value }) => {
//                 it(`withName - throws when key is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.withName(arg);
//                     });
//                 });
//             });


//             it(`withName - sets the channel key to the specified value`, () => {
//                 var expected = AnyRandom.string(5, 8, CharacterSet.ALPHA);

//                 var result =
//                     LogManager.initialize.withName(expected);

//                 assert.equal(result.key, expected);
//             });
//         });

//         describe('withPattern', () => {

//             [
//                 { key: 'null', value: null },
//                 { key: 'undefined', value: undefined },
//                 { key: 'empty string', value: "" }
//             ].forEach(({ key, value }) => {
//                 it(`withPattern - throws when pattern is ${ key }`, () => {
//                     var arg = <any>value;

//                     assert.throws(() => {
//                         LogManager.initialize.withPattern(arg);
//                     });
//                 });
//             });


//             it(`withPattern - sets the channel pattern to the specified value`, () => {
//                 var expected = AnyRandom.string(5, 8, CharacterSet.ALPHA);

//                 // var config = LogManager.initialize.current;
//                 // console.log(' ');
//                 // console.log('withPattern config');
//                 // console.log(config);

//                 var result =
//                     LogManager.initialize.withPattern(expected);

//                 assert.equal((<any>result.formatter).pattern, expected);
//             });
//         });

//         describe('andGetLogger', () => {
//             it(`andGetLogger - returns a logger targeting the current channel`, () => {
//                 var config = LogManager.initialize.current;

//                 // console.log(' ');
//                 // console.log('andGetLogger config');
//                 // console.log(config);

//                 var result = LogManager.initialize.andGetLogger();

//                 // console.log(' ');
//                 // console.log('andGetLogger result[channel]');
//                 // console.log(result[ 'channel' ]);
//                 channelMatches(config, result[ 'channel' ]);
//                 // assert.deepEqual(result[ 'channel' ], config);
//             });
//         });
//     });
// });
