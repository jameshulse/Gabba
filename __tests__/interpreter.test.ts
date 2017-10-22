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

    test('Extract xz', () => {
        expect(interpreter.parse(0xC3).xz).toBe(0x33);
    })
});

let loadRom = (path) => {
    let romPath = path.join(__dirname, path);
    let fileBuffer = fs.readFileSync(romPath);

    return new DataView(fileBuffer.buffer);
}

describe('Dissassembly', () => {
    let pokemon = loadRom('../roms/games/Pokemon Red.gb');

    test('Can decode headers', () => {
        let rom = interpreter.disassemble(pokemon);

        expect(rom.header.title).not.toHaveLength(0);
    });
})