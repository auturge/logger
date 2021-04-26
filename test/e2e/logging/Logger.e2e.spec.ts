// import * as sinon from 'sinon';

// import { stub, unwrap } from "@test/helpers";
// import { TEST_CHANNEL } from '@test/objects';

// import { StatusLogger } from '@src/logging/impl/StatusLogger';

// describe('Logger E2E', () => {

//     var logger;

//     var info;
//     const date = new Date();

//     describe('trace', () => {

//         beforeEach(() => {
//             logger = StatusLogger.configure(TEST_CHANNEL);
//             logger.dateStamper = () => { return date; }
//             info = stub(console, 'info').callsFake((...data: any[]) => {
//                 // console.log(data);
//             });
//         });

//         afterEach(() => {
//             unwrap(info);
//         });

//         it('trace - outputs at the trace level', () => {
//             var message = "for great justice!";
//             // var expected = `\u001b[37m[${ date.toISOString() } ${ level }] ${ message }\n\u001b[39m`;

//             var expected1 = message;

//             logger.trace(message);

//             sinon.assert.calledOnceWithExactly(info, expected1);
//         });

//         it('trace - with object - outputs at the trace level', () => {
//             var level = "TRACE";
//             var message = "for great justice!";
//             var obj = { foo: "bar" };
//             // var expected1 = `\u001b[37m[${ date.toISOString() } ${ level }] ${ message }\n\u001b[39m`;
//             // var expected2 = `\u001b[37m{"foo":"bar"}\u001b[39m`;

//             var expected1 = message;
//             var expected2 = JSON.stringify(obj);

//             logger.trace(message, obj);

//             sinon.assert.calledTwice(info);
//             sinon.assert.callOrder(
//                 info.withArgs(expected1),
//                 info.withArgs(expected2)
//             );
//         });

//         it('trace - with object, pretty-print - outputs at the trace level', () => {
//             var level = "TRACE";
//             var message = "for great justice!";
//             var obj = { foo: "bar" };
//             // var expected1 = `\u001b[37m[${ date.toISOString() } ${ level }] ${ message }\n\u001b[39m`;
//             // var expected2 = `\u001b[37m{\n  "foo": "bar"\n}\u001b[39m`;

//             var expected1 = message;
//             var expected2 = JSON.stringify(obj, null, 2);

//             logger.trace(message, obj, true);

//             sinon.assert.calledTwice(info);
//             sinon.assert.callOrder(
//                 info.withArgs(expected1),
//                 info.withArgs(expected2)
//             );
//         });

//     });
// });
