import 'jest';
import * as fs from 'fs';
import * as path from 'path';
import * as interpreter from '../core/interpreter';

describe('Parse', () => {
    test('Extract q', () => {
        expect(interpreter.parse(0xA8).q).toBe(1);
    });

    test('Extract x', () => {
        // expect(interpreter.decode(0x00).x).toBe(1); // TODO
    });

    test('Extract z', () => {
        expect(interpreter.parse(0xFD).z).toBe(5);
    });
});

describe('Dissassembly', () => {
    let romPath = path.join(__dirname, '../roms/Pokemon Red.gb');
    let fileBuffer = fs.readFileSync(romPath);
    let romData = new DataView(fileBuffer.buffer);

    test('Can decode', () => {
        let instructions = interpreter.disassemble(romData);
    
        expect(instructions).not.toHaveLength(0);
    });
})