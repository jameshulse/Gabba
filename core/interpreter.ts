import { IRom, IOpCode } from './interfaces';
import { formatHex, readString } from './utils';
import * as instructions from './instructions';
import Rom from './rom';
import Header from './header';

const opMap = (parts: IOpCode, next: () => number) => {
    // See: http://www.z80.info/decoding.htm
    //      http://www.z80.info/z80gboy.txt
    switch (parts.xz) {
        case 0x00:
            switch (parts.y) {
                case 0x0:
                    return { text: 'nop', execute: instructions.nop() };
                case 0x1:
                    return { text: 'EX AF, AF', execute: instructions.nop() };
                case 0x2: {
                    let d = next();

                    return { text: 'DJNZ d', execute: instructions.nop() };
                }
                case 0x3: {
                    let d = next();

                    return { text: 'JR d', execute: instructions.nop() };
                }
                case 0x4:
                case 0x5:
                case 0x6:
                case 0x7: {
                    let d = next();

                    return { text: `JR cc[${parts.y - 4}], d`, execute: instructions.nop() };
                }
            }
        case 0x33:
            let nn = next() | (next() << 8);

            return { text: `JP ${formatHex(nn)}`, execute: instructions.jump(nn) };
        case 0x36:
            switch (parts.y) {
                case 0x0:
                    return;
                case 0x1:
                    return;
                case 0x2:
                    return;
                case 0x3:
                    return;
                case 0x4:
                    return;
                case 0x5:
                    return;
                case 0x6:
                    return;
                case 0x7:
                    let n = next();

                    return { text: `CP ${formatHex(n, 2)}`, execute: instructions.compare(n) };
            }
    }
};

export function parse(byte: number) : IOpCode {
    let x = byte >>> 6;
    let z = byte & 0x07;

    return {
        instruction: byte,
        opCode: byte & 0xC7,
        x,
        z,
        xz: (x << 4) | z, // used for instruction mapping
        y: (byte & 0x38) >>> 3,
        p: (byte & 0x30) >>> 3,
        q: (byte & 0x8) >>> 3
    };
};

export function disassemble(romData: DataView) {
    let instructions = {};
    let header = new Header(romData);

    let parseByte = (offset) => {
        let byte = romData.getUint8(offset);
        let parts = parse(byte);

        instructions[offset] = opMap(parts, () => romData.getUint8(++offset));

        return offset;
    };

    // Read entry bytes 0x100 - 0x103
    for (let offset = 0x100; offset < 0x104; offset++) {
        offset = parseByte(offset);
    }

    // Read remaining instructions
    for (let offset = 0x150; offset < romData.byteLength; offset++) {
        offset = parseByte(offset);
    }

    return new Rom(instructions, header);
};
