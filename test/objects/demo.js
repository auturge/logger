const logger = require('../../dist/index');
const CONSOLE = logger.CONSOLE;
const LogLevel = logger.LogLevel;

const LogManager = logger.StatusLogManager;

const Log = logger.Log;
Log.error('wacka wacka');
Log.mark('performance mark');


var l2 = LogManager.initialize
    .newChannel('m2', CONSOLE, LogLevel.TRACE)
    .andGetLogger();

const l3 = LogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.INFO)
    .andGetLogger();

l3.info('what what!');
