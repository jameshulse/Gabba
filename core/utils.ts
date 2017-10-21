export function padLeft(str: string | number, len: number, char: string = ' '): string {
    str = str + '';

    if (str.length >= len) {
        return str;
    }

    return new Array(len - str.length + 1).join(char) + str;
}

export function hex(number: number): string {
    return number.toString(16).toUpperCase();
}

export function formatHex(number: number, len: number = 4): string {
    return `0x${padLeft(number.toString(16).toUpperCase(), len, '0')}`;
}

// Returns: left - right
export function binarySubtract(left: number, right: number): number {
    return left + (((~right) << 24) >>> 24) + 1;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

export function range(first: number, second?: number) {
    if (second === undefined) {
        return Array(first).fill(null).map((_, i) => i);
    } else {
        return Array(second - first).fill(null).map((_, i) => i + first);
    }
}