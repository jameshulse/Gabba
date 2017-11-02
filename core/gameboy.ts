import Cpu from './cpu';
import Memory from './memory';
import { IRomFile } from './interfaces';

export default class Gameboy {
    private memory: Memory;
    private cpu: Cpu;

    constructor() {
        this.memory = new Memory();
        this.cpu = new Cpu(this.memory);
    }

    public loadRom(rom: IRomFile) {
        this.cpu.reset();
        this.memory.reset();
        this.memory.load(rom.data);
    }

    public run() {
        let frame = () => {
            this.cpu.cycle();

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    }

    public step() {
        return this.cpu.cycle();
    }
}
