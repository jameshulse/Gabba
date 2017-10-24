import { IOpCode } from './interfaces';
import { formatHex, readString } from './utils';
import * as instructions from './instructions';
import Rom from './rom';
import Header from './header';

export const opMap = (parts: IOpCode, next: () => number) => {
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

            return {
                text: `ld bc, ${formatHex(nn)}`,
                execute: instructions.loadNNtoRegister(nn, 'bc')
            };
        }
        case 0x02:
            return { text: 'ld (bc), a', execute: instructions.loadRegisterToLocationFromRegister('a', 'bc') }
        case 0x03:
            return { text: 'inc bc', execute: instructions.incrementRegister('bc') };
        case 0x04:
            return { text: 'inc b', execute: instructions.incrementRegister('b') }
        case 0x05:
            return { text: 'dec b', execute: instructions.decrementRegister('b') }
        case 0x06: {
            let n = next();

            return { text: `ld b, ${formatHex(n, 2)}`, execute: instructions.loadNtoRegister(n, 'b') }
        }
        case 0x07:
            return { text: 'rlca', execute: instructions.rotateAccuLeftCarry() }
        case 0x40:
            return { text: 'ld b, b', execute: instructions.loadRegisterToRegister('b', 'b') };
        case 0x41:
            return { text: 'ld b, c', execute: instructions.loadRegisterToRegister('c', 'b') };
        case 0x42:
            return { text: 'ld b, d', execute: instructions.loadRegisterToRegister('d', 'b') };
        case 0x43:
            return { text: 'ld b, e', execute: instructions.loadRegisterToRegister('e', 'b') };
        case 0x44:
            return { text: 'ld b, h', execute: instructions.loadRegisterToRegister('h', 'b') };
        case 0x45:
            return { text: 'ld b, l', execute: instructions.loadRegisterToRegister('l', 'b') };
        case 0x46:
            return { text: 'ld b, (hl)', execute: instructions.loadHLFromMemoryToRegister('b') };
        case 0x47:
            return { text: 'ld b, a', execute: instructions.loadRegisterToRegister('a', 'b') };
        case 0x48:
            return { text: 'ld c, b', execute: instructions.loadRegisterToRegister('b', 'c') };
        case 0x48:
            return { text: 'ld c, c', execute: instructions.loadRegisterToRegister('c', 'c') };
        case 0x67:
            return { text: 'ld h, a', execute: instructions.loadRegisterToRegister('a', 'h') };
        case 0x87:
            return { text: 'add a, a', execute: instructions.addRegisters('a', 'a') }
        case 0xC3: {
            let nn = next() | (next() << 8);
    
            return { text: `jp ${formatHex(nn)}`, execute: instructions.jump(nn) };
            }
        case 0xC7: {
            
        }
        default:
            debugger;
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
