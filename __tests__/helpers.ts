import * as path from 'path';
import * as fs from 'fs';

export function loadRom(file) {
    let romPath = path.join(__dirname, file);
    let fileBuffer = fs.readFileSync(romPath);
    
    return new Uint8Array(fileBuffer.buffer);
}