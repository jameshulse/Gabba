export interface IRom {
    name: string;
    data: Uint8Array;
}

export interface IOpCode {
    instruction: number;
    opCode: number;
    x: number;
    z: number;
    xz: number;
    y: number;
    q: number;
    p: number;
}