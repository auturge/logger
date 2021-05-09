export type WriterFn = (...data: any[]) => void;

export const nullWriterFn: WriterFn = (...data: any) => { }
