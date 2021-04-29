const logger = require('../../dist/index');
const CONSOLE = logger.CONSOLE;
const LogLevel = logger.LogLevel;

const Log = logger.Log;
Log.error('wacka wacka');
Log.mark('performance mark');

const LogManager = logger.LogManager;
var l2 = LogManager.initialize.newChannel('m2', CONSOLE, LogLevel.TRACE).andGetLogger();

l2.debug('what what!');
