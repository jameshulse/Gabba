import { IOpCode } from './interfaces';
import { formatHex, readString } from './utils';
import * as instructions from './instructions';
import Rom from './rom';
import Header from './header';

const opMap = (parts: IOpCode, next: () => number) => {
    // See: http://www.z80.info/decoding.htm
    //      http://www.z80.info/z80gboy.txt
    //      http://clrhome.org/table
    //      http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
    //      http://z80-heaven.wikidot.com/opcode-reference-chart
    switch (parts.opCode) {
        case 0x00:
            return { text: 'NOP', execute: instructions.nop() };
        case 0x01: {
            let nn = next() | (next() << 8);

            return { text: 'ld bc, **', execute: null /* todo */ };
        }
        case 0xC3: {
            let nn = next() | (next() << 8);

            return { text: `jp ${formatHex(nn)}`, execute: instructions.jump(nn) };
        }
        case 0x43: {
            return { text: '' };
        }
        case 0x46:
            return { text: 'ld b, (hl)', execute: instructions.loadHLFromMemorytoB() };
        case 0x47:
            return { text: 'ld b, a', execute: instructions.loadAtoB() };
        case 0xC6:
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
                case 0x7: {
                    let n = next();

                    return { text: `CP ${formatHex(n, 2)}`, execute: instructions.compare(n) };
                }
            }
    }
};

export function parse(byte: number) : IOpCode {
    return {
        byte,
        opCode: byte & 0xC7,
        x: byte >>> 6,
        z: byte & 0x07,
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

    // Read remaining instructions after header
    for (let offset = 0x150; offset < romData.byteLength; offset++) {
        offset = parseByte(offset);
    }

    return new Rom(instructions, header);
};
