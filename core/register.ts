export default class Register {
    public name: string;
    public updated: boolean;
    
    private _value: number;

    constructor(name) {
        this.name = name;

        this.reset();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        let prevValue = this._value;

        this._value = value;
        this.updated = value !== prevValue;
    }

    reset() {
        this._value = 0;
        this.updated = false;
    }
}