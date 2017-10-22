import { readString } from './utils';
import * as reference from './reference';

export default class Header {
    public title: string;
    public licensee: string;
    public cartridgeTypeCode: number;
    public cartridgeTypeName: string;
    public romSizeCode: number;
    public ramSizeCode: number;
    public destination: string;
    public version: number;

    constructor(romData: DataView) {
        this.title = readString(romData, 0x134, 16);
        this.licensee = this.getLicensee(romData);
        this.cartridgeTypeCode = romData.getUint8(0x147);
        this.cartridgeTypeName = reference.cartridgeType[this.cartridgeTypeCode];
        this.romSizeCode = romData.getUint8(0x148);
        this.ramSizeCode = romData.getUint8(0x149);
        this.destination = romData.getUint8(0x14A) === 0x00 ? 'Japanese' : 'Non-Japanese';
        this.version = romData.getUint8(0x14C);
    }

    private getLicensee(romData: DataView): string {
        return romData.getUint8(0x014B) === 0x33
            ? reference.newLicensees[readString(romData, 0x144, 2)]
            : reference.oldLicensees[romData.getUint8(0x14B)]
    }
}