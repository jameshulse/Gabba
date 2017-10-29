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
            return { text: 'ld (bc), a', execute: instructions.saveRegisterToLocationFromRegister('a', 'bc') }
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
            return { text: 'rlca', execute: instructions.rotateAccuLeftCarry() };
        case 0x08: {
            let nn = next() | (next() << 8);

            return { text: `ld (${formatHex(nn)}), sp`, execute: instructions.saveStackPointerToMemory(nn) }
        }
        case 0x09: {
            return { text: 'add hl, bc', execute: instructions.addRegisters('hl', 'bc') }
        }
        case 0x0A:
            return { text: 'ld a, (bc)', execute: instructions.loadRegisterFromRegisterLocation('a', 'bc') };
        case 0x0B:
            return { text: 'dec bc', execute: instructions.decrementRegister('bc') };
        case 0x0C:
            return { text: 'inc c', execute: instructions.incrementRegister('c') };
        case 0x0D:
            return { text: 'dec c', execute: instructions.decrementRegister('c') }
        case 0x0E: {
            let n = next();

            return { text: `ld c, ${n}`, execute: instructions.loadNtoRegister(n, 'c') };
        }
        case 0x11: {
            let nn = next() | (next() << 8);

            return { text: `ld de, ${formatHex(nn)}`, execute: instructions.loadNNtoRegister(nn, 'de') };
        }
        case 0x12: {
            return { text: 'ld (de), a', execute: instructions.saveRegisterToLocationFromRegister('a', 'de') };
        }
        case 0x13:
            return { text: 'inc de', execute: instructions.incrementRegister('de') };
        case 0x14:
            return { text: 'inc d', execute: instructions.incrementRegister('d') };
        case 0x15:
            return { text: 'dec d', execute: instructions.decrementRegister('d') };
        case 0x16: {
            let n = next();

            return { text: `ld d, ${formatHex(n, 2)}`, execute: instructions.loadNtoRegister(n, 'd') };
        }
        case 0x18: {
            let nn = next() | (next() << 8);

            return { text: `jr ${formatHex(nn)}`, execute: instructions.jumpNN(nn) };
        }
        case 0x19:
            return { text: 'add hl, de', execute: instructions.addRegisters('hl', 'de') };
        case 0x1A:
            return { text: 'ld a, (de)', execute: instructions.loadRegisterFromRegisterLocation('a', 'de') };
        case 0x1B:
            return { text: 'dec de', execute: instructions.decrementRegister('de') };
        case 0x1C:
            return { text: 'inc e', execute: instructions.incrementRegister('e') };
        case 0x1D:
            return { text: 'dec e', execute: instructions.decrementRegister('e') };
        case 0x1E: {
            let n = next();

            return { text: `ld e, ${formatHex(n, 2)}`, execute: instructions.loadNtoRegister(n, 'e') };
        }
        case 0x20: {
            let n = next();

            return { text: `jr nz, ${formatHex(n)}`, execute: instructions.jumpNIfZeroFlagNotSet(n) };
        }
        case 0x21: {
            let nn = next() | (next() << 8);

            return { text: `ld hl, ${formatHex(nn)}`, execute: instructions.loadNNtoRegister(nn, 'hl') };
        }
        case 0x22:
            return { text: 'ldi (hl), a', execute: instructions.saveToMemoryAndIncrement('a')};
        case 0x23:
            return { text: 'inc hl', execute: instructions.incrementRegister('hl') };
        case 0x24:
            return { text: 'inc h', execute: instructions.incrementRegister('h') };
        case 0x25:
            return { text: 'dec h', execute: instructions.decrementRegister('h') };
        case 0x26: {
            let n = next();

            return { text: `ld h, ${formatHex(n, 2)}`, execute: instructions.loadNtoRegister(n, 'h') };
        }
        case 0x28: {
            let n = next();

            return { text: `jr z, ${formatHex(n, 2)}`, execute: instructions.jumpNIfZeroFlagSet(n) };
        }
        case 0x29:
            return { text: 'add hl, hl', execute: instructions.addRegisters('hl', 'hl') };
        case 0x2A:
            return { text: 'ldi a, (hl)', execute: instructions.loadFromMemoryAndIncrement('a') };
        case 0x2B:
            return { text: 'dec hl', execute: instructions.decrementRegister('hl') };
        case 0x2C:
            return { text: 'inc l', execute: instructions.incrementRegister('l') };
        case 0x2D:
            return { text: 'dec l', execute: instructions.decrementRegister('l') };
        case 0x2E: {
            let n = next();

            return { text: `ld l, ${formatHex(n, 2)}`, execute: instructions.loadNtoRegister(n, 'l') };
        }
        case 0x30: {
            let n = next();

            return { text: `jr nc, ${formatHex(n, 2)}`, execute: instructions.jumpNIfCarryFlagNotSet(n) };
        }
        case 0x32: {
            let n = next();

            return { text: 'ldd (hl), a', execute: instructions.saveToMemoryAndDecrement('a') };
        }
        case 0x3E: {
            let n = next();

            return { text: `ld a, ${n}`, execute: instructions.loadNtoRegister(n, 'a') };
        }
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
        case 0x49:
            return { text: 'ld c, c', execute: instructions.loadRegisterToRegister('c', 'c') };
        case 0x4A:
            return { text: 'ld c, d', execute: instructions.loadRegisterToRegister('d', 'c') };
        case 0x4B:
            return { text: 'ld c, e', execute: instructions.loadRegisterToRegister('e', 'c') };
        case 0x4C:
            return { text: 'ld c, h', execute: instructions.loadRegisterToRegister('h', 'c') };
        case 0x4D:
            return { text: 'ld c, l', execute: instructions.loadRegisterToRegister('l', 'c') };
        case 0x4E:
            return { text: 'ld c, (hl)', execute: instructions.loadHLFromMemoryToRegister('c') };
        case 0x4F:
            return { text: 'ld c, a', execute: instructions.loadRegisterToRegister('a', 'c') };
        case 0x50:
            return { text: 'ld d, b', execute: instructions.loadRegisterToRegister('b', 'd') };
        case 0x51:
            return { text: 'ld d, c', execute: instructions.loadRegisterToRegister('c', 'd') };
        case 0x52:
            return { text: 'ld d, d', execute: instructions.loadRegisterToRegister('d', 'd') };
        case 0x53:
            return { text: 'ld d, e', execute: instructions.loadRegisterToRegister('e', 'd') };
        case 0x54:
            return { text: 'ld d, h', execute: instructions.loadRegisterToRegister('h', 'd') };
        case 0x55:
            return { text: 'ld d, l', execute: instructions.loadRegisterToRegister('l', 'd') };
        case 0x56:
            return { text: 'ld d, (hl)', execute: instructions.loadHLFromMemoryToRegister('d') };
        case 0x57:
            return { text: 'ld d, a', execute: instructions.loadRegisterToRegister('a', 'd') };
        case 0x58:
            return { text: 'ld e, b', execute: instructions.loadRegisterToRegister('b', 'e') };
        case 0x59:
            return { text: 'ld e, c', execute: instructions.loadRegisterToRegister('c', 'e') };
        case 0x5A:
            return { text: 'ld e, d', execute: instructions.loadRegisterToRegister('d', 'e') };
        case 0x5B:
            return { text: 'ld e, e', execute: instructions.loadRegisterToRegister('e', 'e') };
        case 0x5C:
            return { text: 'ld e, h', execute: instructions.loadRegisterToRegister('h', 'e') };
        case 0x5D:
            return { text: 'ld e, l', execute: instructions.loadRegisterToRegister('l', 'e') };
        case 0x5E:
            return { text: 'ld e, (hl)', execute: instructions.loadHLFromMemoryToRegister('e') };
        case 0x5F:
            return { text: 'ld e, a', execute: instructions.loadRegisterToRegister('a', 'e') };
        case 0x60:
            return { text: 'ld h, b', execute: instructions.loadRegisterToRegister('b', 'h') };
        case 0x61:
            return { text: 'ld h, c', execute: instructions.loadRegisterToRegister('c', 'h') };
        case 0x62:
            return { text: 'ld h, d', execute: instructions.loadRegisterToRegister('d', 'h') };
        case 0x63:
            return { text: 'ld h, e', execute: instructions.loadRegisterToRegister('e', 'h') };
        case 0x64:
            return { text: 'ld h, h', execute: instructions.loadRegisterToRegister('h', 'h') };
        case 0x65:
            return { text: 'ld h, l', execute: instructions.loadRegisterToRegister('l', 'h') };
        case 0x66:
            return { text: 'ld h, (hl)', execute: instructions.loadHLFromMemoryToRegister('h') };
        case 0x67:
            return { text: 'ld h, a', execute: instructions.loadRegisterToRegister('a', 'h') };
        case 0x68:
            return { text: 'ld l, b', execute: instructions.loadRegisterToRegister('b', 'l') };
        case 0x69:
            return { text: 'ld l, c', execute: instructions.loadRegisterToRegister('c', 'l') };
        case 0x6A:
            return { text: 'ld l, d', execute: instructions.loadRegisterToRegister('d', 'l') };
        case 0x6B:
            return { text: 'ld l, e', execute: instructions.loadRegisterToRegister('e', 'l') };
        case 0x6C:
            return { text: 'ld l, h', execute: instructions.loadRegisterToRegister('h', 'l') };
        case 0x6D:
            return { text: 'ld l, l', execute: instructions.loadRegisterToRegister('l', 'l') };
        case 0x6E:
            return { text: 'ld l, (hl)', execute: instructions.loadHLFromMemoryToRegister('l') };
        case 0x6F:
            return { text: 'ld l, a', execute: instructions.loadRegisterToRegister('a', 'l') };
        case 0x70:
            return { text: 'ld (hl), b', execute: instructions.saveRegisterToLocationFromRegister('b', 'hl') };
        case 0x71:
            return { text: 'ld (hl), c', execute: instructions.saveRegisterToLocationFromRegister('c', 'hl') };
        case 0x72:
            return { text: 'ld (hl), d', execute: instructions.saveRegisterToLocationFromRegister('d', 'hl') };
        case 0x73:
            return { text: 'ld (hl), e', execute: instructions.saveRegisterToLocationFromRegister('e', 'hl') };
        case 0x74:
            return { text: 'ld (hl), h', execute: instructions.saveRegisterToLocationFromRegister('h', 'hl') };
        case 0x75:
            return { text: 'ld (hl), l', execute: instructions.saveRegisterToLocationFromRegister('l', 'hl') };
        case 0x77:
            return { text: 'ld (hl), a', execute: instructions.saveRegisterToLocationFromRegister('a', 'hl') };
        case 0x78:
            return { text: 'ld a, b', execute: instructions.loadRegisterToRegister('b', 'a') };
        case 0x79:
            return { text: 'ld a, c', execute: instructions.loadRegisterToRegister('c', 'a') };
        case 0x7A:
            return { text: 'ld a, d', execute: instructions.loadRegisterToRegister('d', 'a') };
        case 0x7B:
            return { text: 'ld a, e', execute: instructions.loadRegisterToRegister('e', 'a') };
        case 0x7C:
            return { text: 'ld a, h', execute: instructions.loadRegisterToRegister('h', 'a') };
        case 0x7D:
            return { text: 'ld a, l', execute: instructions.loadRegisterToRegister('l', 'a') };
        case 0x7E:
            return { text: 'ld a, (hl)', execute: instructions.loadHLFromMemoryToRegister('a') };
        case 0x7F:
            return { text: 'ld a, a', execute: instructions.loadRegisterToRegister('a', 'a') };
        case 0x80:
            return { text: 'add a, b', execute: instructions.addRegisters('a', 'b') };
        case 0x81:
            return { text: 'add a, c', execute: instructions.addRegisters('a', 'c') };
        case 0x82:
            return { text: 'add a, d', execute: instructions.addRegisters('a', 'd') };
        case 0x83:
            return { text: 'add a, e', execute: instructions.addRegisters('a', 'e') };
        case 0x84:
            return { text: 'add a, h', execute: instructions.addRegisters('a', 'h') };
        case 0x85:
            return { text: 'add a, l', execute: instructions.addRegisters('a', 'l') };
        case 0x86:
            return { text: 'add a, (hl)', execute: instructions.addValueFromMemory('a') };
        case 0x87:
            return { text: 'add a, a', execute: instructions.addRegisters('a', 'a') };
        case 0x90:
            return { text: 'sub b', execute: instructions.subtractRegisterFromA('b') };
        case 0x91:
            return { text: 'sub c', execute: instructions.subtractRegisterFromA('c') };
        case 0x92:
            return { text: 'sub d', execute: instructions.subtractRegisterFromA('d') };
        case 0x93:
            return { text: 'sub e', execute: instructions.subtractRegisterFromA('e') };
        case 0x94:
            return { text: 'sub h', execute: instructions.subtractRegisterFromA('h') };
        case 0x95:
            return { text: 'sub l', execute: instructions.subtractRegisterFromA('l') };
        case 0xAF:
            return { text: 'xor a', execute: instructions.xor('a') }
        case 0xC2: {
            let nn = next() | (next() << 8);

            return { text: `jp nz, ${nn}`, execute: instructions.jumpIfZeroFlagNotSet(nn) }
        }
        case 0xC3: {
            let nn = next() | (next() << 8);
    
            return { text: `jp ${formatHex(nn)}`, execute: instructions.jump(nn) };
        }
        case 0xC4: {
            let nn = next() | (next() << 8);

            return { text: `call nz, ${nn}`, execute: instructions.callIfZeroFlagNotSet(nn) };
        }
        case 0xCA: {
            let nn = next() | (next() << 8);

            return { text: `jp z, ${nn}`, execute: instructions.jumpIfZeroFlagSet(nn) }
        }
        case 0xCC: {
            let nn = next() | (next() << 8);

            return { text: `call z, ${nn}`, execute: instructions.callIfZeroFlagSet(nn) };
        }
        case 0xD4: {
            let nn = next() | (next() << 8);

            return { text: `call nc, ${nn}`, execute: instructions.callIfCarryFlagNotSet(nn) };
        }
        case 0xDC: {
            let nn = next() | (next() << 8);

            return { text: `call c, ${nn}`, execute: instructions.callIfCarryFlagSet(nn) };
        }
        default:
            debugger;
    }
};

export function parse(byte: number) : IOpCode {
    return {
        opCode: byte,
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
