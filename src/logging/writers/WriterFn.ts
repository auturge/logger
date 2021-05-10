// TODO: Add class description comment
export type WriterFn = (...data: any[]) => void;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const nullWriterFn: WriterFn = (...data: any) => {
    // do nothing.
}
