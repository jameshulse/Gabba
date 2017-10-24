import { ICpuState } from './interfaces';

export function nop() {
    return (cpu) => {
        cpu.ticks += 1;
        cpu.registers.pc += 1;
    };
};

export function jump(nnn) {
    return (cpu) => {
        cpu.registers.pc = nnn;
        cpu.ticks += 4;
    };
};

export function compare(n) {
    return (cpu) => {
        // TODO
        cpu.registers.pc += 1;
    };
};

// Load

export function loadRegisterToRegister(from: string, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.registers[from];
        cpu.ticks += 1;
        cpu.registers.pc += 1;
    };
};

export function loadHLFromMemoryToRegister(to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.memory.getUint8(cpu.registers.hl);
        cpu.ticks += 2;
        cpu.registers.pc += 1;
    };
};

export function loadNNtoRegister(nn: number, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = nn;
        cpu.ticks += 3;
        cpu.registers.pc += 1;
    };
};

export function loadNtoRegister(n: number, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = n;
        cpu.ticks += 2;
        cpu.registers.pc += 1;
    };
};

export function loadRegisterToLocationFromRegister(from: string, toLocation: string) {
    return (cpu: ICpuState) => {
        let value = cpu.registers[from];
        let location = cpu.registers[toLocation];

        cpu.memory.setUint8(location, value);
        cpu.ticks += 2;
        cpu.registers.pc += 1;
    }
}

// Arithmetic

export function decrementRegister(r: string) {
    let ticks = r.length; // 2 for BC 1 for B etc

    return (cpu: ICpuState) => {
        cpu.registers[r] -= 1;
        cpu.ticks += 1;
        cpu.registers.pc += 1;
    };
};

export function incrementRegister(r: string) {
    let ticks = r.length; // 2 for BC 1 for B etc

    return (cpu: ICpuState) => {
        cpu.registers[r] += 1;
        cpu.ticks += ticks;
        cpu.registers.pc += 1;
    };
}

export function addRegisters(left: string, right: string) {
    return (cpu: ICpuState) => {
        cpu.registers[left] = cpu.registers[left] + cpu.registers[right]; // TODO: Set carry flag
        cpu.ticks += 1;
        cpu.registers.pc += 1;
    };
};

// Rotates and Shifts

export function rotateAccuLeftCarry() {
    return (cpu: ICpuState) => {
        cpu.registers.carry = (cpu.registers.a & 0x8) === 1;
        cpu.registers.a <<= 1;
        cpu.ticks += 1;
        cpu.registers.pc += 1;
    };
};
