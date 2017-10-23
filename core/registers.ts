export default class Registers {
    public a; // TODO: accumulator - handle this specially?
    public b;
    public c;
    public d;
    public e;
    public f; // TODO: flags - handle this specially?
    public h;
    public l;
    public sp;

    /*
        AF    A    -    Accumulator & Flags
        BC    B    C    BC
        DE    D    E    DE
        HL    H    L    HL
        SP    -    -    Stack Pointer
        PC    -    -    Program Counter/Pointer
    */

    constructor() {
        this.reset();
    }

    reset() {
        this.af = 0x01B0;
        this.bc = 0x0013;
        this.de = 0x00D8;
        this.hl = 0x014D;
        this.sp = 0xFFFE; // Start of stack
    }

    public get af() {
        return (this.a << 8) & this.f;
    }

    public set af(value: number) {
        this.a = value >>> 8;
        this.f = value & 0x00FF;
    }

    public get bc() {
        return (this.b << 8) & this.c;
    }

    public set bc(value: number) {
        this.b = value >>> 8;
        this.c = value & 0x00FF;
    }

    public get de() {
        return (this.d << 8) & this.e;
    }

    public set de(value: number) {
        this.d = value >>> 8;
        this.e = value & 0x00FF;
    }

    public get hl() {
        return (this.h << 8) & this.l;
    }

    public set hl(value: number) {
        this.h = value >>> 8;
        this.l = value & 0x00FF;
    }
};
