import { ILogEntry } from "@src/logging/ILogEntry";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { ITokenArgument, TokenArgument } from "./TokenArgument";

const TOKEN_OPENER = '%{';
const TOKEN_CLOSER = '}';
const TOKEN_SPLITTER = '|';

// TODO: Add class description comment
export abstract class TokenDefinition {

    // TODO: Add public API comments

    protected abstract tokens: string[];

    public readonly abstract name: string;

    /** Returns the text that should replace the specified token.
     * @param match The token to get the text for.
     * @param entry The log entry.
     */
    abstract getValue(match: ITokenMatch, entry: ILogEntry): string;

    /** Finds all matches of this token within the pattern.
     * @param pattern The pattern to search.
     */
    public getMatches(pattern: string): TokenMatch[] {
        return this.collectMatches(pattern);
    }

    protected collectMatches(pattern: string): TokenMatch[] {
        let matches: TokenMatch[] = [];
        const toCheck = pattern.slice(0);
        this.tokens.forEach(tokenText => {
            const tokenMatches = this.getTokenMatches(toCheck, tokenText);
            matches = matches.concat(tokenMatches);
        });
        return matches;
    }

    private getTokenMatches(pattern: string, tokenText: string): TokenMatch[] {

        // A TOKEN is a portion of the pattern that starts with %{ and ends with the first subsequent }
        // This format allows us to include arguments with the token, not just its name

        let toCheck = pattern.slice(0);
        const matches: TokenMatch[] = [];
        let removedTokensLength = 0;
        let startIndex = -1;
        while ((startIndex = toCheck.indexOf(TOKEN_OPENER)) > -1) {
            const nextToken = this.getNextToken(toCheck);

            if (this.matchesName(nextToken, tokenText)) {
                const match = this.buildTokenMatch(nextToken, startIndex + removedTokensLength);
                matches.push(match);
            }

            removedTokensLength += nextToken.length;
            toCheck = toCheck.replace(nextToken, '');
        }
        return matches;
    }

    private getNextToken(pattern: string): string {
        let startIndex = -1;
        if ((startIndex = pattern.indexOf(TOKEN_OPENER)) > -1) {

            // find the next starter
            const toCheck = pattern.slice(startIndex + 1);
            const nextStart = toCheck.indexOf(TOKEN_OPENER);
            const endIndex = toCheck.indexOf(TOKEN_CLOSER);

            const lastTokenIsUnclosed = endIndex == -1;
            const thisTokenIsClosedAfterNext = nextStart != -1 && endIndex > nextStart;

            if (lastTokenIsUnclosed || thisTokenIsClosedAfterNext)
                throw new Error(`Unclosed token: [${ pattern.slice(startIndex) }]`);

            const length = endIndex + 2;
            const match = pattern.substr(startIndex, length);
            return match;
        }
        return "";
    }

    private matchesName(token: string, name: string): boolean {
        const toCheck = token.slice(TOKEN_OPENER.length);

        // identify the whole token name
        const lTrimmed = toCheck.trimStart();

        // find the first PIPE
        let index: number;

        const trimmedName = ((index = lTrimmed.indexOf('|')) != -1)
            ? lTrimmed.slice(0, index).trim()
            : lTrimmed.slice(0, -1).trim();

        return trimmedName == name;
    }

    private buildTokenMatch(token: string, startIndex: number): TokenMatch {

        const match = new TokenMatch(this, startIndex);
        match.endIndex = startIndex + token.length - 1;
        match.matched = token;
        match.arguments = this.getArguments(match);

        return match;
    }

    private getArguments(match: TokenMatch): ITokenArgument[] {
        // ARGUMENTS are anything after a pipe (|) within the token match
        const args = match.matched.split(TOKEN_SPLITTER).slice(1);

        if (!args.length)
            return [];

        // remove the final }
        const index = args.length - 1;
        args[ index ] = args[ index ].slice(0, -1);

        const result = args.map(TokenArgument.fromString);
        return result;
    }
}
