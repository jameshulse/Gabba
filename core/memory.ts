const MEMORY_SIZE = 0xFFFF;

export default class Memory {
    public memory: DataView;
    
    public load(rom: Uint8Array) {
        let data = new Uint8Array(MEMORY_SIZE);

        data.set(rom /* TODO: what is the ROM offset? */);

        this.memory = new DataView(data.buffer);
    }

    public reset() {
        if (!this.memory) {
            return;
        }

        for (let i = 0; i < this.memory.byteLength; i++) {
            this.memory.setUint8(i, 0);
        }
    }
}