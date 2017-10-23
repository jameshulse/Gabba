import { ICpuState } from './interfaces';

export function nop() {
    return (cpu) => {
        cpu.ticks += 1;
    };
};

export function jump(nnn) {
    return (cpu) => {
        cpu.pc = nnn;
        cpu.ticks += 4;
    };
};

export function compare(n) {
    return (cpu) => {
        // TODO
    };
};

export function loadAtoB() {
    return (cpu: ICpuState) => {
        cpu.registers.b = cpu.registers.a;
        cpu.ticks += 1;
    };
};

export function loadHLtoB() {
    return (cpu: ICpuState) => {
        cpu.registers.b = cpu.memory.getUint8(cpu.registers.hl);
        cpu.ticks += 2;
    };
};