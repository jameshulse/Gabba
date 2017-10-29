import { ICpuState } from './interfaces';

export function nop() {
    return (cpu: ICpuState) => {
        cpu.ticks += 1;
    };
};

export function jump(nn) {
    return (cpu: ICpuState) => {
        cpu.registers.pc = nn;
        cpu.ticks += 4;
    };
};

export function jumpIfZeroFlagNotSet(nn) {
    return (cpu: ICpuState) => {
        if (!cpu.registers.zero) {
            cpu.registers.pc = nn;
            cpu.ticks += 4; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function jumpIfZeroFlagSet(nn) {
    return (cpu: ICpuState) => {
        if (cpu.registers.zero) {
            cpu.registers.pc = nn;
            cpu.ticks += 4; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function jumpNIfCarryFlagNotSet(n) {
    return (cpu: ICpuState) => {
        if (!cpu.registers.carry) {
            cpu.registers.pc += n;
            cpu.ticks += 4; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function jumpNIfCarryFlagSet(n) {
    return (cpu: ICpuState) => {
        if (cpu.registers.carry) {
            cpu.registers.pc += n;
            cpu.ticks += 4; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function jumpNIfZeroFlagSet(n) {
    return (cpu: ICpuState) => {
        if (cpu.registers.zero) {
            cpu.registers.pc += n;
            cpu.ticks += 3;
        } else {
            cpu.ticks += 2;
        }
    };
};

export function jumpNIfZeroFlagNotSet(n) {
    return (cpu: ICpuState) => {
        if (!cpu.registers.zero) {
            cpu.registers.pc += n;
            cpu.ticks += 3;
        } else {
            cpu.ticks += 2;
        }
    };
};

export function jumpNN(nn) {
    return (cpu: ICpuState) => {
        cpu.registers.pc += nn;
        cpu.ticks += 3;
    };
};

export function callIfZeroFlagNotSet(nn) {
    return (cpu : ICpuState) => {
        if (!cpu.registers.zero) {
            cpu.pushStack(cpu.registers.pc);
            cpu.registers.pc = nn;
            cpu.ticks += 6; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function callIfZeroFlagSet(nn) {
    return (cpu: ICpuState) => {
        if (cpu.registers.zero) {
            cpu.pushStack(cpu.registers.pc);
            cpu.registers.pc = nn;
            cpu.ticks += 6; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function callIfCarryFlagNotSet(nn) {
    return (cpu: ICpuState) => {
        if (!cpu.registers.carry) {
            cpu.pushStack(cpu.registers.pc);
            cpu.registers.pc = nn;
            cpu.ticks += 6; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function callIfCarryFlagSet(nn) {
    return (cpu: ICpuState) => {
        if (cpu.registers.carry) {
            cpu.pushStack(cpu.registers.pc);
            cpu.registers.pc = nn;
            cpu.ticks += 6; // TODO: Check
        } else {
            cpu.ticks += 3;
        }
    };
};

export function compare(n) {
    return (cpu: ICpuState) => {
        // TODO
    };
};

// Load

export function loadRegisterToRegister(from: string, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.registers[from];
        cpu.ticks += 1;
    };
};

export function loadHLFromMemoryToRegister(to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.memory.getUint8(cpu.registers.hl);
        cpu.ticks += 2;
    };
};

export function loadNNtoRegister(nn: number, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = nn;
        cpu.ticks += 3;
    };
};

export function loadNtoRegister(n: number, to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = n;
        cpu.ticks += 2;
    };
};

export function saveRegisterToLocationFromRegister(from: string, toLocation: string) {
    return (cpu: ICpuState) => {
        let value = cpu.registers[from];
        let location = cpu.registers[toLocation];

        cpu.memory.setUint8(location, value);
        cpu.ticks += 2;
    }
};

export function loadRegisterFromRegisterLocation(to: string, fromLocation: string) {
    return (cpu: ICpuState) => {
        let location = cpu.registers[fromLocation];
        let value = cpu.memory.getUint8(location);

        cpu.registers[to] = value;
        cpu.ticks += 2;
    };
};

export function saveToMemoryAndIncrement(from: string) {
    return (cpu: ICpuState) => {
        cpu.memory.setUint8(cpu.registers.hl, cpu.registers[from]);
        cpu.registers.hl += 1;
        cpu.ticks += 2;
    };
};

export function saveToMemoryAndDecrement(from: string) {
    return (cpu: ICpuState) => {
        cpu.memory.setUint8(cpu.registers.hl, cpu.registers[from]);
        cpu.registers.hl -= 1;
        cpu.ticks += 2;
    };
};

export function loadFromMemoryAndIncrement(to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.memory.getUint8(cpu.registers.hl);
        cpu.registers.hl += 1;
        cpu.ticks += 2;
    };
};

export function saveStackPointerToMemory(location: number) {
    return (cpu: ICpuState) => {
        cpu.memory.setUint16(location, cpu.registers.sp);
        cpu.ticks += 5;
    };
};

// Arithmetic

export function decrementRegister(r: string) {
    let ticks = r.length; // 2 for BC 1 for B etc

    return (cpu: ICpuState) => {
        cpu.registers[r] -= 1;

        if (cpu.registers[r] === 0) {
            cpu.registers.zero = true;
        }

        cpu.ticks += 1;
    };
};

export function incrementRegister(r: string) {
    let ticks = r.length; // 2 for BC 1 for B etc

    return (cpu: ICpuState) => {
        cpu.registers[r] += 1;
        cpu.ticks += ticks;
    };
};

export function addRegisters(left: string, right: string) {
    return (cpu: ICpuState) => {
        cpu.registers[left] = cpu.registers[left] + cpu.registers[right]; // TODO: Set carry flag
        cpu.ticks += 1;
    };
};

export function addValueFromMemory(to: string) {
    return (cpu: ICpuState) => {
        cpu.registers[to] = cpu.memory.getUint8(cpu.registers.hl);
        cpu.ticks += 2;
    };
};

export function xor(r: string) {
    return (cpu: ICpuState) => {
        cpu.registers.a ^= cpu.registers[r];
        cpu.ticks += 1;
    };
};

export function and(r: string) {
    return (cpu: ICpuState) => {
        cpu.registers.a &= cpu.registers[r];
        cpu.ticks += 1;
    };
};

export function or(r: string) {
    return (cpu: ICpuState) => {
        cpu.registers.a |= cpu.registers[r];
        cpu.ticks += 1;
    };
};

export function subtractRegisterFromA(r: string) {
    return (cpu: ICpuState) => {
        cpu.registers.a -= cpu.registers[r];
        cpu.ticks += 1;
    };
};

// Rotates and Shifts

export function rotateAccuLeftCarry() {
    return (cpu: ICpuState) => {
        cpu.registers.carry = (cpu.registers.a & 0x8) === 1;
        cpu.registers.a <<= 1;
        cpu.ticks += 1;
    };
};