import Cpu from './cpu';
import Memory from './memory';
import { IRomFile } from './interfaces';

export default class Gameboy {
    private memory: Memory;
    private cpu: Cpu;

    constructor(rom: IRomFile) {
        this.memory = new Memory();
        this.cpu = new Cpu(this.memory);
    }

    public loadRom(rom: IRomFile) {
        this.memory.load(rom.data);
        this.cpu.reset();
    }

    public run() {
        
    }

    public step() {
        return this.cpu.cycle();
    }
}
