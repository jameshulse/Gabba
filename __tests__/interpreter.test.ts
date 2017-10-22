import 'jest';
import * as fs from 'fs';
import * as path from 'path';
import * as interpreter from '../core/interpreter';

describe('Decode', () => {
    test('Extract q', () => {
        expect(interpreter.decode(0xA8).q).toBe(1);
    });

    test('Extract x', () => {
        // expect(interpreter.decode(0x00).x).toBe(1); // TODO
    });

    test('Extract z', () => {
        expect(interpreter.decode(0xFD).z).toBe(5);
    });
});

describe('Dissambly', () => {
    let romPath = path.join(__dirname, '../roms/cpu_instrs/individual/01-special.gb');
    let fileBuffer = fs.readFileSync(romPath);
    let romData = new DataView(fileBuffer.buffer);

    test('Can decode', () => {
        let instructions = interpreter.disassemble(romData);
    
        expect(instructions).not.toHaveLength(0);
    });

})