import { DateToken } from "./DateToken";
import { LogLevelToken } from "./LogLevelToken";
import { MessageToken } from "./MessageToken";
import { PatternTextToken } from "./PatternTextToken";
import { SourceToken } from "./SourceToken";

export const KNOWN_TOKENS = [
    new DateToken(),
    new MessageToken(),
    new LogLevelToken(),
    new SourceToken()
]

export const TEXT_TOKEN = PatternTextToken;
