import { throwIfNullOrEmpty, throwIfNullOrGreaterThan, throwIfNullOrLessThan } from "@src/functions/guards";

/** Defines the default set of logging severity levels. */
export class LogLevel {

    // #region instance members

    readonly level: number;
    readonly name: string;
    readonly displayName: string;

    /**
     * Constructor
     * @param {number} level The value for this level.  Higher values represent more severe levels.
     * @param {string} name The name of this level.
     */
    public constructor(level: number, name: string);

    /**
     *
     * @param {number} level The value for this level.  Higher values represent more severe levels.
     * @param {string} name The name of this level.
     * @param displayName The display name for this level. This may be localized or otherwise different from the name.
     */
    public constructor(level: number, name: string, displayName: string);
    public constructor(level: number, name: string, displayName: string = name) {
        throwIfNullOrLessThan(level, 'level', 0);
        throwIfNullOrGreaterThan(level, 'level', LogLevel.MAX_VALUE);
        throwIfNullOrEmpty(name, 'name');

        this.level = Object.freeze(level);
        this.name = Object.freeze(name.toUpperCase());
        this.displayName = Object.freeze(displayName);
    }

    public valueOf(): number {
        return this.level;
    }

    public toString(): string {
        return this.displayName;
    }

    // #endregion instance members

    // #region static members

    private static readonly MAX_VALUE: number = 10000;

    /** A log level used in the rare event that all output should be suppressed, as in unit testing. */
    public static readonly OFF: LogLevel = Object.freeze(new LogLevel(LogLevel.MAX_VALUE, "OFF"));

    /** A log level used when one or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities. */
    public static readonly FATAL: LogLevel = Object.freeze(new LogLevel(6000, "FATAL"));

    /** A log level used when one or more functionalities are not working, preventing some functionalities from working correctly. */
    public static readonly ERROR: LogLevel = Object.freeze(new LogLevel(5000, "ERROR"));

    /** A log level used when unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected. */
    public static readonly WARN: LogLevel = Object.freeze(new LogLevel(4000, "WARN"));

    /** A log level used when an event happened, the event is purely informative and can be ignored during normal operations. */
    public static readonly INFO: LogLevel = Object.freeze(new LogLevel(3000, "INFO"));

    /** A log level used for events considered to be useful during software debugging when more granular information is needed. */
    public static readonly DEBUG: LogLevel = Object.freeze(new LogLevel(2000, "DEBUG"));

    /** A log level describing events showing step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions. */
    public static readonly TRACE: LogLevel = Object.freeze(new LogLevel(1000, "TRACE"));

    /** A log level describing the lowest level possible. */
    public static readonly ALL: LogLevel = Object.freeze(new LogLevel(0, "ALL"));

    // #endregion

}

export const LOG_LEVELS = [
    LogLevel.OFF, LogLevel.FATAL, LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG, LogLevel.TRACE, LogLevel.ALL
];
