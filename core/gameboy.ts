import Cpu from './cpu';
import Memory from './memory';
import { IRom } from './interfaces';

export default class Gameboy {
    private memory: Memory;
    private cpu: Cpu;

    constructor(rom: IRom) {
        this.memory = new Memory();
        this.cpu = new Cpu(this.memory);
    }

    public loadRom(rom: IRom) {
        this.memory.load(rom.data);
        this.cpu.reset();
    }

    public run() {
        
    }
}
