import 'jest';
import Registers from '../core/registers';

describe('Flags', () => {
    describe('Carry', () => {
        test('Is 1 set 1', () => {
            let registers = new Registers();

            registers.f = 0b00001000;
            registers.carry = true;

            expect(registers.f).toBe(0b00001000);
        });

        test('Is 0 set 1', () => {
            let registers = new Registers();

            registers.f = 0b00000000;
            registers.carry = true;

            expect(registers.f).toBe(0b00001000);
        });

        test('Is 1 set 0', () => {
            let registers = new Registers();

            registers.f = 0b00001000;
            registers.carry = false;

            expect(registers.f).toBe(0b00000000);
        });

        test('Is 1 set 1', () => {
            let registers = new Registers();

            registers.f = 0b00001000;
            registers.carry = true;

            expect(registers.f).toBe(0b00001000);
        });
    });

    describe('Zero', () => {
        test('Is 1 set 1', () => {
            let registers = new Registers();

            registers.f = 0b01000000;
            registers.zero = true;

            expect(registers.f).toBe(0b01000000);
        });

        test('Is 0 set 1', () => {
            let registers = new Registers();

            registers.f = 0b00000000;
            registers.zero = true;

            expect(registers.f).toBe(0b01000000);
        });

        test('Is 1 set 0', () => {
            let registers = new Registers();

            registers.f = 0b01000000;
            registers.zero = false;

            expect(registers.f).toBe(0b00000000);
        });

        test('Is 1 set 1', () => {
            let registers = new Registers();

            registers.f = 0b01000000;
            registers.zero = true;

            expect(registers.f).toBe(0b01000000);
        });
    });
});