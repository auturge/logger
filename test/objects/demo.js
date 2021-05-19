/* eslint-disable */

const logger = require('../../dist/logger');
const DateFormat = logger.DateFormat;
const TERMINAL = logger.TERMINAL;
const CONSOLE = logger.CONSOLE;
const LogLevel = logger.LogLevel;

const timestamp = new Date(2021, 2, 4, 5, 6, 7, 8);
const result = {
    product: 30 * 5,
    sum: 30 + 5,
    quotient: 30 / 5,
    difference: 30 - 5
};

/** Default StatusLog Manager. */
const LogManager = logger.LogManager;

console.log(' ');
console.log(`Default 'Log' logger:`);
const Log = logger.Log;
Log.error('wacka wacka');
Log.info('result:', result);
Log.info('result:', result, true);

console.log(' ');
console.log(`'TERMINAL' logger:`);
TERMINAL.reconfigure({ pattern: '[%{s|color:white}]  %{m}' });
const term = LogManager.initialize
    .newChannel('m2', TERMINAL, LogLevel.TRACE)
    .andGetLogger();
term[ '_dateStamper' ] = () => { return timestamp };


term.mark('performance mark');

TERMINAL.reconfigure({ pattern: `[%{d|f:${ DateFormat.DEFAULT }}]  %{m}` });
term.mark('DEFAULT');

TERMINAL.reconfigure({ pattern: `[%{d|f:${ DateFormat.ISO }}]  %{m}` });
term.mark('ISO');

TERMINAL.reconfigure({ pattern: `[%{d|f:${ DateFormat.UTC }}]  %{m}` });
term.mark('UTC');

TERMINAL.reconfigure({ pattern: `[%{d|f:${ DateFormat.LONG }}]  %{m}` });
term.mark('LONG');


console.log(' ');
console.log(`'CONSOLE' logger:`);
const cons = LogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.TRACE)
    .andGetLogger();
cons.debug('what what!');

console.log(' ');
