import { range } from './utils';
import Register from './register';

const ROM_ENTRY_POINT = 0x100;

export default class Cpu {
    public pc: Register;

    constructor() {
        this.reset();

        this.pc = new Register('PC');
    }

    public reset() {
        this.pc.value = ROM_ENTRY_POINT;
    }

    public cycle() {
        // fetch
        // decode
        // execute
    }
}