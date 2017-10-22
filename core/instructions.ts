export function nop() {
    return (cpu) => {
        cpu.t += 1;
    };
};

export function jump(nnn) {
    return (cpu) => {
        cpu.pc = nnn;
        cpu.t += 4;
    };
};

export function compare(n) {
    return (cpu) => {
        // TODO
    };
};
