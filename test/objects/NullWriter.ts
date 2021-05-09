import { IWriter } from "@src/logging/IWriter";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { IPatternWriterConfig } from "@src/logging/IWriter";

/* eslint-disable @typescript-eslint/no-unused-vars */

export class NullWriter implements IWriter<IStatusEntry, IPatternWriterConfig> {
    write(entry: IStatusEntry): void {
        // Do nothing
    }
    reconfigure(config: IPatternWriterConfig): void {
        // Do nothing
    }
}

export const NULL = new NullWriter();
