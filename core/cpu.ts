import { range } from './utils';
import { IRomFile } from './interfaces';
import { parse, opMap } from './interpreter';
import Memory from './memory';
import Registers from './registers';

export default class Cpu {
    public memory: Memory;
    public registers: Registers;
    public ticks: number;

    constructor(memory: Memory) {
        this.memory = memory;
        this.registers = new Registers();

        this.reset();
    }

    public reset() {
        this.memory.reset();
        this.registers.reset();
        this.ticks = 0;
    }

    public cycle() {
        let byte = this.fetch();
        let params = parse(byte);
        let operation = opMap(params, () => {
            this.registers.pc += 1;

            return this.fetch();
        });

        operation.execute(this);

        return operation.text;
    }

    private fetch(): number {
        return this.memory.getUint8(this.registers.pc);
    }

    public pushStack(value) {
        this.registers.sp -= 2;
        this.memory.setUint16(this.registers.sp, value);
    }

    public popStack() {
        let value = this.memory.getUint16(this.registers.sp);

        this.registers.sp += 2;

        return value;
    }
}
