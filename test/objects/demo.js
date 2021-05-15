/* eslint-disable */

const logger = require('../../dist/logger');
const TERMINAL = logger.TERMINAL;
const CONSOLE = logger.CONSOLE;
const LogLevel = logger.LogLevel;

/** Default StatusLog Manager. */
const LogManager = logger.LogManager;

console.log(' ');
console.log(`Default 'Log' logger:`);
const Log = logger.Log;
Log.error('wacka wacka');


console.log(' ');
console.log(`'TERMINAL' logger:`);
TERMINAL.reconfigure({ pattern: '[%{s|color:white}]  %{m}' });
const term = LogManager.initialize
    .newChannel('m2', TERMINAL, LogLevel.TRACE)
    .andGetLogger();
term.mark('performance mark');


console.log(' ');
console.log(`'CONSOLE' logger:`);
const cons = LogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.TRACE)
    .andGetLogger();
cons.debug('what what!');

console.log(' ');
