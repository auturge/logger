import { throwIfNullOrEmpty } from "@src/functions/guards";

/** Defines the default set of entry status codes. */
export class LogStatus {

    // #region instance members

    readonly name: string;
    readonly displayName: string;

    /**
     * Constructor
     * @param {string} name The name of this level.
     */
    public constructor(name: string);

    /**
     * Constructor
     * @param {string} name The name of this level.
     * @param {string} displayName The display name for this level. This may be localized or otherwise different from the name.
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

    /** An entry status used to describe some significant operational failure _that is tied to **user action**_. Failure messages represent **user errors**, not exceptional code failures.
     *
     * Examples:
     *  - 'Failed to log in!' (due to an HTTP 401 error, not a 500)
     *  - 'Passwords must include at least 12 letters (both upper- and lowercase), at least 1 number, and at least 1 symbol.'
     */
    public static FAILURE: LogStatus = Object.freeze(new LogStatus("FAILURE"));

    /** An entry status used when an event happened, the event is purely informative and can be ignored during normal operations. */
    public static INFO: LogStatus = Object.freeze(new LogStatus("INFO"));

    /** An entry status used for marking code-execution conditions, timestamps, or other metrics. */
    public static MARK: LogStatus = Object.freeze(new LogStatus("MARK"));

    /** An entry status that describes some significant operational success
     *
     * Examples:
     *  - "successfully logged in!"
     *  - "all done!"
     */
    public static SUCCESS: LogStatus = Object.freeze(new LogStatus("SUCCESS"));

    // #endregion
}

export const LOG_STATUSES = [ LogStatus.FAILURE, LogStatus.INFO, LogStatus.MARK, LogStatus.SUCCESS ];
