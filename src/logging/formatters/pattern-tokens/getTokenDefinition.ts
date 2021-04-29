import { KNOWN_TOKENS, TEXT_TOKEN } from "./TOKENS";
import { ITokenMatch } from "./ITokenMatch";
import { TokenDefinition } from "./TokenDefinition";

export function getTokenDefinition(token: ITokenMatch): TokenDefinition {

    var knownToken = KNOWN_TOKENS.find(it => token.tokenType == it.constructor.name);

    var definition = knownToken || new TEXT_TOKEN();
    return definition;
}
