import { TokenDefinition } from "./TokenDefinition";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "@src/logging/ILogEntry";

/* eslint-disable @typescript-eslint/no-unused-vars */

// TODO: Add class description comment
export class PatternTextToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'PatternTextToken';
    protected tokens: string[] = [];
    private static _instance = new PatternTextToken();

    /** Returns the text from the pattern */
    getValue(match: ITokenMatch, entry: ILogEntry): string {
        if (match.arguments.length != 0) {
            throw new Error(`Token [${ match.tokenType }] does not support arguments.`);
        }
        return match.value;
    }

    /** Don't use this method. Use the static version instead. */
    getMatches(pattern: string): TokenMatch[] {
        throw new Error("Use the static getMatches method instead.");
    }

    /** Takes a pattern, and a list of already found tokens, and returns the rest as text tokens. */
    static getMatches(pattern: string, tokens: ITokenMatch[]): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        if (!(tokens && tokens.length)) {
            // everything is the same :(
            const match = new TokenMatch(new PatternTextToken(), 0);
            match.endIndex = pattern.length - 1;
            match.matched = pattern;
            match.value = match.matched;
            return [ match ];
        }

        // ensure they're sorted by startIndex
        tokens = tokens.sort((a, b) => a.startIndex - b.startIndex);

        // there's at least one token, so let's scan through the string
        const result: TokenMatch[] = [];

        // is there text BEFORE the first token?
        let token = tokens[ 0 ];
        if (token.startIndex > 0) {
            const match = new TokenMatch(this._instance, 0, token.startIndex - 1);
            match.matched = pattern.substr(0, match.length);
            match.value = match.matched;
            result.push(match);
        }

        // is there text between tokens?
        if (tokens.length > 1) {
            for (let index = 0; index < tokens.length - 1; index++) {
                token = tokens[ index ];
                const nextToken = tokens[ index + 1 ];

                const distance = nextToken.startIndex - token.endIndex;
                if (distance > 1) {
                    const match = new TokenMatch(this._instance, token.endIndex + 1, nextToken.startIndex - 1);
                    match.matched = pattern.substr(match.startIndex, match.length);
                    match.value = match.matched;
                    result.push(match);
                }
            }
        }

        // is there text AFTER the last token?
        token = tokens[ tokens.length - 1 ];

        if (pattern.length > token.endIndex + 1) {
            const match = new TokenMatch(this._instance, token.endIndex + 1, pattern.length - 1);
            match.matched = pattern.substr(match.startIndex, match.length);
            match.value = match.matched;
            result.push(match);
        }

        return result;
    }
}
