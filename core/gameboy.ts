import Cpu from './cpu';
import Memory from './memory';

interface IRom {
    name: string;
    data: ArrayBuffer;
}

export default class Gameboy {
    private cpu: Cpu;
    private memory: Memory;

    constructor(rom: IRom) {
        this.cpu = new Cpu();
        this.memory = new Memory();
    }

    public run() {
        
    }
}
