import { range } from './utils';
import { IRomFile } from './interfaces';
import Memory from './memory';
import Registers from './registers';

export default class Cpu {
    public registers: Registers;
    public memory: Memory;

    constructor(memory: Memory) {
        this.registers = new Registers();
    }

    public reset() {
        this.registers.reset();
    }

    public cycle() {
        // let instruction = 

        // fetch
        // decode
        // execute
    }
}