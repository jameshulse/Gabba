import { range } from './utils';
import { IRom } from './interfaces';
import Memory from './memory';
import Register from './register';

export default class Cpu {
    public registers: any;
    public memory: Memory;

    constructor(memory: Memory) {
        this.registers = {
            pc: new Register('PC'),
            sp: new Register('SP'),
            af: new Register('AF'),
            bc: new Register('BC'),
            de: new Register('DE'),
            hl: new Register('HL'),
            flags: new Register('F')
        };
    }

    public reset() {
        for (let name in this.registers) {
            this.registers[name].value = 0;
            this.registers[name].updated = false;
        }
        
        this.registers.sp.value = 0xFFFE;
        this.registers.pc.value = 0x100;
    }

    public cycle() {
        // let instruction = 

        // fetch
        // decode
        // execute
    }
}