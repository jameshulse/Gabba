export default class Registers {
    private _a: number;
    private _b: number;
    private _c: number;
    private _d: number;
    private _e: number;
    private _f: number;
    private _h: number;
    private _l: number;
    
    public sp: number;
    public pc: number;

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
        this.pc = 0x100; // After BIOS
    }

    public get a() { return this._a; };
    public get b() { return this._b; };
    public get c() { return this._c; };
    public get d() { return this._d; };
    public get e() { return this._e; };
    public get f() { return this._f; };
    public get h() { return this._h; };
    public get l() { return this._l; };

    public set a(value: number) { this._a = value & 0xFF; }
    public set b(value: number) { this._b = value & 0xFF; }
    public set c(value: number) { this._c = value & 0xFF; }
    public set d(value: number) { this._d = value & 0xFF; }
    public set e(value: number) { this._e = value & 0xFF; }
    public set f(value: number) { this._f = value & 0xFF; }
    public set h(value: number) { this._h = value & 0xFF; }
    public set l(value: number) { this._l = value & 0xFF; }

    public get af() {
        return (this._a << 8) | this._f;
    }

    public set af(value: number) {
        this._a = value >>> 8;
        this._f = value & 0x00FF;
    }

    public get bc() {
        return (this._b << 8) | this._c;
    }

    public set bc(value: number) {
        this._b = value >>> 8;
        this._c = value & 0x00FF;
    }

    public get de() {
        return (this._d << 8) | this._e;
    }

    public set de(value: number) {
        this._d = value >>> 8;
        this._e = value & 0x00FF;
    }

    public get hl() {
        return (this._h << 8) | this._l;
    }

    public set hl(value: number) {
        this._h = value >>> 8;
        this._l = value & 0x00FF;
    }

    /*
        7    zf    Z   NZ   Zero Flag
        6    n     -   -    Add/Sub-Flag (BCD)
        5    h     -   -    Half Carry Flag (BCD)
        4    cy    C   NC   Carry Flag
        3-0  -     -   -    Not used (always zero)
    */

    public get carry() {
        return (this._f & 0x4) === 0x4
    }

    public set carry(value: boolean) {
        this._f = value ? (this._f | 0x08) : (this._f & 0xF7);
    }

    public get zero() {
        return (this._f & 0x7) === 0x7
    }

    public set zero(value: boolean) {
        this._f = value ? (this._f | 0x40) : (this._f & 0xBF);
    }
};
