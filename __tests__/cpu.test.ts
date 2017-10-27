import 'jest';
import Memory from '../core/memory';
import Cpu from '../core/cpu';
import { loadRom } from './helpers';

test('Tetris bootstrap', () => {
    let memory = new Memory();
    let cpu = new Cpu(memory);
    let tetris = loadRom('../roms/games/Tetris.gb');

    memory.load(tetris);

    for (let i = 0; i < 100; i++) {
        cpu.cycle();
    }
});