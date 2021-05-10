/* eslint-disable */

const logger = require('../../dist/logger');
const CONSOLE = logger.CONSOLE;
const LogLevel = logger.LogLevel;

/** Default StatusLog Manager. */
const LogManager = logger.LogManager;

const Log = logger.Log;
Log.error('wacka wacka');
Log.mark('performance mark');

const l2 = LogManager.initialize
    .newChannel('m2', CONSOLE, LogLevel.TRACE)
    .andGetLogger();

const l3 = LogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.INFO)
    .andGetLogger();

l3.info('what what!');
