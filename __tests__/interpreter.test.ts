import 'jest';
import * as fs from 'fs';
import * as path from 'path';
import * as interpreter from '../core/interpreter';

describe('Parse', () => {
    test('Extract q', () => {
        expect(interpreter.parse(0xA8).q).toBe(1);
    });

    test('Extract p', () => {
        // expect(interpreter.parse(0xA8).q).toBe(1); // TODO
    });

    test('Extract x', () => {
        // expect(interpreter.decode(0x00).x).toBe(1); // TODO
    });

    test('Extract y', () => {
        // expect(interpreter.decode(0x00).x).toBe(1); // TODO
    });

    test('Extract z', () => {
        expect(interpreter.parse(0xFD).z).toBe(0x05);
    });
});

let loadRom = (file) => {
    let romPath = path.join(__dirname, file);
    let fileBuffer = fs.readFileSync(romPath);

    return new DataView(fileBuffer.buffer);
}

describe('Dissassemble', () => {
    let pokemon = loadRom('../roms/games/Pokemon Red.gb');
    let tetris = loadRom('../roms/games/Tetris.gb');

    // test('Can decode headers', () => {
    //     let rom = interpreter.disassemble(pokemon);

    //     expect(rom.header.title).not.toHaveLength(0);
    // });

    test('Decode instructions', () => {
        let rom = interpreter.disassemble(tetris);

        expect(Object.getOwnPropertyNames(rom.instructions)).not.toHaveLength(0);
    });
});