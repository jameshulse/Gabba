const MEMORY_SIZE = 0x10000;

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

    public getUint8(offset: number) {
        return this.memory.getUint8(offset);
    }

    public getUint16(offset: number) {
        return this.memory.getUint16(offset);
    }

    public setUint8(offset: number, value: number) {
        this.memory.setUint8(offset, value);
    }

    public setUint16(offset: number, value: number) {
        this.memory.setUint16(offset, value);
    }
}