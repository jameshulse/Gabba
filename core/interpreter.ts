import { IRom, IOpCode } from './interfaces';
import { formatHex, readString } from './utils';
import * as instructions from './instructions';
import Rom from './rom';
import Header from './header';

const opMap = {
    0x00: (opCode: IOpCode) => {
        switch (opCode.y) {
            case 0:
                return [() => instructions.noop(), () => `NOP`];
            case 1:
                return [() => instructions.noop(), () => `EX AF, AF'`];
            case 2:
                return [() => instructions.noop(), () => `DJNZ d`]
        };
    }
};

export function parse(byte: number) : IOpCode {
    return {
        instruction: byte,
        x: byte >>> 6,
        z: byte & 0x07,
        xz: 0, // used for instruction mapping
        y: (byte & 0x38) >>> 3,
        p: (byte & 0x30) >>> 3,
        q: (byte & 0x8) >>> 3
    };
};

export function disassemble(romData: DataView) {
    let instructions = [];
    let header = new Header(romData);
    
    // Read entry bytes 0x100 - 0x103
    for (let i = 0x100; i < 0x104; i++) {
        let byte = romData.getUint8(i);
        let parts = parse(byte);
        
        instructions.push(formatHex(byte));
    }

    // Read remaining instructions
    // for (let i = 0x150; i < romData.byteLength; i++) {
    //     parseByte(i);
    // }

    return new Rom(instructions, header);
};
