import { removeAll } from "@src/functions/removeAll";
import { ILogEntry } from "@src/logging/ILogEntry";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";

export abstract class TokenDefinition {

    private static readonly TOKEN_OPENER: string = '%{';
    private static readonly TOKEN_CLOSER: string = '}';

    /** Returns the text that should replace the specified token.
     * @param match The token to get the text for.
     * @param entry The log entry.
     */
    abstract getValue(match: ITokenMatch, entry: ILogEntry): string;

    /** Finds all matches of this token within the pattern.
     * @param pattern The pattern to search.
     */
    abstract getMatches(pattern: string): TokenMatch[];

    protected collectMatches(pattern: string, ...tokens: string[]): TokenMatch[] {
        var matches: TokenMatch[] = [];
        var toCheck = pattern.slice(0);
        tokens.forEach(tokenText => {
            var tokenMatches = this.getTokenMatches(toCheck, tokenText);
            matches = matches.concat(tokenMatches);
        });
        return matches;
    }

    private removeMatches(pattern: string, matches: TokenMatch[]): string {
        matches.forEach(match => {
            pattern = removeAll(pattern, match.matched);
        })
        return pattern;
    }

    private getTokenMatches(pattern: string, tokenText: string): TokenMatch[] {

        // A TOKEN is a portion of the pattern that starts with %{ and ends with the first subsequent }
        // This format allows us to include arguments with the token, not just its name
        var toCheck = pattern.slice(0);
        const matches: TokenMatch[] = [];
        var removedTokensLength: number = 0;
        var startIndex: number;
        while ((startIndex = toCheck.indexOf(TokenDefinition.TOKEN_OPENER)) > -1) {
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
        var startIndex: number;
        if ((startIndex = pattern.indexOf(TokenDefinition.TOKEN_OPENER)) > -1) {
            const endIndex = pattern.indexOf(TokenDefinition.TOKEN_CLOSER);
            if (endIndex == -1)
                throw new Error(`Unclosed token: [${ pattern.slice(startIndex) }]`);

            const length = endIndex - startIndex + 1;

            const match = pattern.substr(startIndex, length);
            return match;
        }
        return "";
    }

    private matchesName(token: string, name: string): boolean {
        const toCheck = token.slice(TokenDefinition.TOKEN_OPENER.length);

        // identify the whole token name
        const lTrimmed = toCheck.trimStart();

        // find the first PIPE
        var index: number;

        var trimmedName = ((index = lTrimmed.indexOf('|')) != -1)
            ? lTrimmed.slice(0, index - 1).trim()
            : trimmedName = lTrimmed.slice(0, -1).trim();

        return trimmedName == name;
    }

    private buildTokenMatch(token: string, startIndex: number): TokenMatch {

        const match = new TokenMatch(this, startIndex);
        match.endIndex = startIndex + token.length - 1;
        match.matched = token;
        match.arguments = this.getArguments(match);

        return match;
    }

    private getArguments(match: TokenMatch): string[] {
        // ARGUMENTS are anything after a pipe (|) within the token match
        const args = match.matched.split('|').slice(1);

        // remove the final }
        if (args && args.length) {
            var index = args.length - 1;
            args[ index ] = args[ index ].slice(0, -1);
            args[ index ] = args[ index ].trim();
        }

        return args;
    }
}
