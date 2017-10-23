import 'jest';
import * as instructions from '../core/instructions';

describe('Timings', () => {
    let testTiming = (instr, expected) => {
        let cpu = { t: 0 };
        let instruction = instr(cpu);

        expect(cpu.t).toBe(expected);
    };

    test('NOP', () => testTiming(instructions.nop(), 1));
})