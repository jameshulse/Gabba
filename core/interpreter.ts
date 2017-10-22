import { IRom } from './interfaces';
import { formatHex } from './utils';

export function decode(byte: number) {
    return {
        x: byte >>> 6,
        z: byte & 0x07,
        y: (byte & 0x38) >>> 3,
        p: (byte & 0x30) >>> 3,
        q: (byte & 0x8) >>> 3
    };
};

export function disassemble(data: DataView) {
    let instructions = [];

    for(let i = 0x100; i < data.byteLength; i++) {
        let byte = data.getUint8(i);
        let parts = decode(byte);

        instructions.push(formatHex(byte));
    }

    return instructions;
};
