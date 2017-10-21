export default class Memory {
    public data: ArrayBuffer;

    constructor() {
        this.data = new ArrayBuffer(0xFFFF);
    }

    public reset() {

    }
}