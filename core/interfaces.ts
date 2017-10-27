import Memory from './memory';
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
    memory: Memory;
    registers: Registers;
    ticks: number;
    pushStack: (value: number) => void;
    popStack: () => number;
}