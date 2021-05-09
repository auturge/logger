import { throwIfNullOrUndefined } from "@src/functions/guards";
import { ILogEntry } from "@src/logging/ILogEntry";
import { getTokenDefinition, ITokenMatch, PatternTokenizer } from "./pattern-tokens";
import { IEntryFormatter } from "./IEntryFormatter";

/** A formatter that formats the entry using a specified pattern. */
export class PatternFormatter implements IEntryFormatter {

    constructor();
    constructor(pattern: string);
    constructor(pattern = "%{m}") {
        this.pattern = pattern;
    }

    public pattern: string;
    private _tokenizer: PatternTokenizer = new PatternTokenizer();

    public formatMessage(entry: ILogEntry): string {
        throwIfNullOrUndefined(entry, 'entry');

        const tokens = this._tokenizer.tokenize(this.pattern);
        const result = this.compileMessage(tokens, entry);
        return result;
    }

    public formatData(entry: ILogEntry): string | undefined {
        throwIfNullOrUndefined(entry, 'entry');
        if (entry.data === undefined || entry.data.obj === undefined)
            return undefined;

        const output = entry.data.prettyPrint
            ? JSON.stringify(entry.data.obj, null, 2)
            : JSON.stringify(entry.data.obj);
        return output;
    }

    private compileMessage(tokens: ITokenMatch[], logEntry: ILogEntry): string {
        if (!(tokens && tokens.length))
            return "";

        // ensure the tokens are sorted.
        tokens = tokens.sort((a, b) => a.startIndex - b.startIndex);

        let result = "";
        tokens.forEach(token => {
            const definition = getTokenDefinition(token);
            const tokenValue = definition.getValue(token, logEntry);
            result += tokenValue;
        });

        return result;
    }
}
