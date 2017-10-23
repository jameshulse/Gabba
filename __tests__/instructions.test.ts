import 'jest';
import Registers from '../core/registers';
import * as instructions from '../core/instructions';

let createState = () => {
    return {
        registers: new Registers(),
        ticks: 0,
        memory: new DataView(new ArrayBuffer(10))
    };
}

describe('Timings', () => {
    let testTiming = (instr, expected) => {
        let cpu = createState();
        let instruction = instr(cpu);

        expect(cpu.ticks).toBe(expected);
    };

    test('NOP', () => testTiming(instructions.nop(), 1));
    test('ld r, r', () => testTiming(instructions.nop(), 1));
});

test('loadRegisterToRegister', () => {
    let execute = instructions.loadRegisterToRegister('a', 'b');
    let state = createState();

    state.registers.b = 10;
    state.registers.a = 5;

    execute(state);

    expect(state.registers.b).toBe(5);
});