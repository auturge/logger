import { IWriter } from "@src/logging/IWriter";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { IPatternWriterConfig } from "@src/logging/writers/IPatternWriterConfig";

/* eslint-disable @typescript-eslint/no-unused-vars */

export class NullWriter implements IWriter<IStatusEntry> {
    write(entry: IStatusEntry): void {
        // Do nothing
    }
    reconfigure(config: IPatternWriterConfig): IWriter<IStatusEntry> {
        return this;
    }
}

export const NULL = new NullWriter();
