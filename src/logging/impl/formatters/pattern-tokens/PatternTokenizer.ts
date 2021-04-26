import { removeAll } from "@src/functions/removeAll";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { KNOWN_TOKENS, TEXT_TOKEN } from "./TOKENS";

export class PatternTokenizer {

    public constructor() { }

    public tokenize(pattern: string): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        // get the tokens that we recognize
        var knownTokens = this.getKnownTokens(pattern);

        // freak out for unrecognized tokens (errors)
        this.throwForUnparsedTokens(pattern, knownTokens);

        // Get the rest (text)
        var textTokens = this.getTextTokens(pattern, knownTokens);

        var tokens = knownTokens.concat(textTokens);

        // ensure they're sorted by startIndex
        tokens = tokens.sort((a, b) => a.startIndex - b.startIndex);
        return tokens;
    }

    private getKnownTokens(pattern: string): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        var result: TokenMatch[] = [];
        KNOWN_TOKENS.forEach(token => {
            var toCheck = pattern.slice(0);
            result = result.concat(token.getMatches(toCheck));
        });

        result = result.sort((a, b) => a.startIndex - b.startIndex);
        return result;
    }

    private throwForUnparsedTokens(pattern: string, knownTokens: ITokenMatch[]): void {
        if (!(pattern && pattern.length))
            return;

        if (!(knownTokens && knownTokens.length))
            knownTokens = [];

        var rebuilt = pattern;

        // remove the known tokens from the pattern
        knownTokens.forEach(token => {
            rebuilt = rebuilt.replace(token.value, "");
        });

        // if the rebuilt string contains an un-escaped percent sign, then throw
        rebuilt = removeAll(rebuilt, "%{");
        if (rebuilt.indexOf("%{") != -1) {
            throw new Error(`Unexpected token in pattern: [${ pattern }].`);
        }
    }

    private getTextTokens(pattern: string, tokens: ITokenMatch[]): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        return TEXT_TOKEN.getMatches(pattern, tokens);
    }
}
