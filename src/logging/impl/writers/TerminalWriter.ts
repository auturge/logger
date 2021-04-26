import { IWriter } from "../../IWriter";
import { ColorPatternFormatter } from "../formatters/ColorPatternFormatter";
import { ConsoleWriter } from "./ConsoleWriter";

export class TerminalWriter extends ConsoleWriter implements IWriter {

    constructor();
    constructor(pattern: string);
    constructor(pattern: string = "%{m}") {
        super(pattern);
        this.formatter = new ColorPatternFormatter(pattern);
    }
}
