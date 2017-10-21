export function padLeft(str: string, len: number, char: string = ' ') {
    str = str + '';

    if (str.length >= len) {
        return str;
    }

    return new Array(len - str.length + 1).join(char) + str;
}

export function hex(number: number) {
    return number.toString(16).toUpperCase();
}

export function formatHex(number: number, len: number = 4) {
    return `0x${padLeft(number.toString(16).toUpperCase(), len, '0')}`;
}

// Returns: left - right
export function binarySubtract(left: number, right: number) {
    return left + (((~right) << 24) >>> 24) + 1;
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}