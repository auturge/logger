import { IWriter } from "@src/logging/IWriter";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { IPatternWriterConfig } from "@src/logging/IWriter";


export class NullWriter implements IWriter<IStatusEntry, IPatternWriterConfig> {
    write(entry: IStatusEntry): void { }
    reconfigure(config: IPatternWriterConfig): void { }
}

export const NULL = new NullWriter();
