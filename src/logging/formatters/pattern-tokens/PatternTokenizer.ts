import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { KNOWN_TOKENS, TEXT_TOKEN } from "./TOKENS";

export class PatternTokenizer {

    public tokenize(pattern: string): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        // get the tokens that we recognize
        const knownTokens = this.getKnownTokens(pattern);

        // freak out for unrecognized tokens (errors)
        this.throwForUnparsedTokens(pattern, knownTokens);

        // Get the rest (text)
        const textTokens = this.getTextTokens(pattern, knownTokens);

        let tokens = knownTokens.concat(textTokens);

        // ensure they're sorted by startIndex
        tokens = tokens.sort((a, b) => a.startIndex - b.startIndex);
        return tokens;
    }

    private getKnownTokens(pattern: string): TokenMatch[] {
        if (!(pattern && pattern.length))
            return [];

        let result: TokenMatch[] = [];
        KNOWN_TOKENS.forEach(token => {
            const toCheck = pattern.slice(0);
            result = result.concat(token.getMatches(toCheck));
        });

        result = result.sort((a, b) => a.startIndex - b.startIndex);
        return result;
    }

    private throwForUnparsedTokens(pattern: string, knownTokens: ITokenMatch[]): void {
        if (!(pattern && pattern.length))
            return;

        if (knownTokens == null)
            knownTokens = [];

        let rebuilt = pattern.slice(0);

        // remove the known tokens from the pattern
        knownTokens.forEach(token => {
            rebuilt = rebuilt.replace(token.matched, "");
        });

        // if the rebuilt string contains an un-escaped percent sign, then throw
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
