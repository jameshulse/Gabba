import Header from './header';

export default class Rom {
    public header: Header;
    public instructions: any;

    constructor(instructions: any, header: Header) {
        this.header = header;
        this.instructions = instructions;
    }
}