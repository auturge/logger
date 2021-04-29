
import { IStatusEntry } from "./IStatusEntry";
import { LogBuilder } from "../LogBuilder";
import { IStatusLog, StatusLog } from "./StatusLog";
import { throwIfNullOrEmpty } from "@src/functions/guards";

export class StatusLogBuilder extends LogBuilder<IStatusEntry, IStatusLog>{

    andGetLogger(): IStatusLog {
        this.validate();
        return new StatusLog(this._name, this._channels);
    }

    private validate(): void {
        throwIfNullOrEmpty(this._name, "logger name");
        throwIfNullOrEmpty(this._channels, "channels");
    }
}
