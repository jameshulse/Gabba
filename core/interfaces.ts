import Registers from './registers';

export interface IRomFile {
    name: string;
    data: Uint8Array;
}

export interface IOpCode {
    byte: number;
    opCode: number;
    x: number;
    z: number;
    y: number;
    q: number;
    p: number;
}

export interface ICpuState {
    memory: DataView;
    registers: Registers;
    ticks: number;
}