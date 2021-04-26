import { throwIfNullOrEmpty } from "@src/functions/guards";

/** Defines the default set of logging status codes. */
export class LogStatus {

    // #region instance members

    readonly name: string;
    readonly displayName: string;

    /**
     * Constructor
     * @param {number} level The value for this level.  Higher values represent more severe levels.
     * @param {string} name The name of this level.
     */
    public constructor(name: string);

    /**
     * Constructor
     * @param {number} level The value for this level.  Higher values represent more severe levels.
     * @param {string} name The name of this level.
     * @param displayName The display name for this level. This may be localized or otherwise different from the name.
     */
    public constructor(name: string, displayName: string);
    public constructor(name: string, displayName: string = name) {
        throwIfNullOrEmpty(name, 'name');

        this.name = Object.freeze(name.toUpperCase());
        this.displayName = Object.freeze(displayName);
    }

    public toString(): string {
        return this.displayName;
    }

    // #endregion instance members

    // #region static members

    /** A log status used when some process has failed. */
    public static FAILURE: LogStatus = Object.freeze(new LogStatus("FAILURE"));

    /** A log level used when an event happened, the event is purely informative and can be ignored during normal operations. */
    public static INFO: LogStatus = Object.freeze(new LogStatus("INFO"));

    /** A log level used for events considered to be useful during software debugging when more granular information is needed. */
    public static MARK: LogStatus = Object.freeze(new LogStatus("MARK"));

    /** A log level describing events showing step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions. */
    public static SUCCESS: LogStatus = Object.freeze(new LogStatus("SUCCESS"));

    // #endregion
}

export const LOG_STATUSES = [ LogStatus.FAILURE, LogStatus.INFO, LogStatus.MARK, LogStatus.SUCCESS ];
