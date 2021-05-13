import { PatternFormatter } from "./PatternFormatter";
import { isUndefined } from "@src/functions/types";
import { ILogEntry } from "@src/logging/ILogEntry";
import { EntryColorizer } from "./EntryColorizer";

/** A formatter that formats the entry using a specified pattern. */
export class ColorPatternFormatter extends PatternFormatter {

    constructor();
    constructor(pattern: string);
    constructor(pattern = "%{m}") {
        super(pattern);
    }

    public formatMessage(entry: ILogEntry): string {
        const baseMessage = super.formatMessage(entry);
        return this.colorMessage(baseMessage, entry);
    }

    public formatData(entry: ILogEntry): string | undefined {
        const baseMessage = super.formatData(entry);
        if (isUndefined(baseMessage))
            return;

        return this.colorMessage(baseMessage, entry);
    }

    private colorMessage(message: string, entry: ILogEntry): string {
        const color = EntryColorizer.getColor(entry);
        return color(message);
    }
}
