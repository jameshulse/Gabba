import 'jest';
import * as utils from '../core/utils';

describe('Pad left', () => {
    test('Default pad with spaces', () => {
        expect(utils.padLeft('test', 8)).toEqual('    test');
    });

    test('Pad number', () => {
        expect(utils.padLeft(15, 4, '0')).toEqual('0015');
    });
});

describe('Format Hex', () => {
    test('Pads to length', () => {
        expect(utils.formatHex(15, 4)).toEqual('0x000F');
    });

    test('Doesn\'t pad when equal to length', () => {
        expect(utils.formatHex(43981, 4)).toEqual('0xABCD');
    });
});

describe('Binary subtract', () => {
    test('Correct result', () => {
        expect(utils.binarySubtract(56, 66)).toBe(246);
    });
});

describe('Random number', () => {
    test('Returns an integer', () => {
        let number = utils.randomInt(0, 100);

        expect(number).toBeGreaterThan(0);
        expect(number).toBeLessThan(100);
    })
});

describe('Range', () => {
    test('Minimum only', () => {
        expect(utils.range(10)).toHaveLength(10);
    });

    test('Minimum and maximum', () => {
        expect(utils.range(10, 30)).toHaveLength(20);
    });
});