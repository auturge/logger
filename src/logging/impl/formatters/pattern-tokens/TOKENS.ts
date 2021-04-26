import { DateToken } from "./DateToken";
import { LogLevelToken } from "./LogLevelToken";
import { MessageToken } from "./MessageToken";
import { PatternTextToken } from "./PatternTextToken";

export const KNOWN_TOKENS = [
    new DateToken(),
    new MessageToken(),
    new LogLevelToken()
]

export const TEXT_TOKEN = PatternTextToken;
