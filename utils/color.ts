

export class Color { 
    public readonly R: number = 0
    public readonly G: number = 0
    public readonly B: number = 0
    public readonly A: number = 1

    public static isValidChannel(v: number, isAlpha: boolean = false): boolean {
        const max = isAlpha ? 1 : 255
        if (v < 0 || v > max) {
            return false
        }

        if(!isAlpha && v % 1 !== 0) {
            return false
        }
        return true
    }

    /**
     * Returns a color from a string. Recognizes the following string values:
     * - 'red'
     * - 'green'
     * - 'blue'
     * - 'black'
     * - 'white'
     * - 'rgb(r, g, b)'
     * - 'rgba(r, g, b, a)'
     * @param str The string to parse
     * @throws {Error} If the string is not recognized
     * @returns {Color} The parsed color
     */
    public static fromString(str: string) {
        const color = RGB_ATLAS.get(str)
        if (color) {
            return color
        }

        const arr = str.replace(new RegExp(/\(|\)|[A-Za-z]/g), '').split(',')

        const r = Number(arr[0])
        const g = Number(arr[1])
        const b = Number(arr[2])
        const a = Number(arr[3])
        
        if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
            throw new Error("Invalid color string")
        }

        return new Color(r, g, b, a)
    }
    
    constructor(
        r: number, 
        g: number, 
        b: number,
        a: number = 1
    ) { 
        if (
            !Color.isValidChannel(r)
            || !Color.isValidChannel(g)
            || !Color.isValidChannel(b)
            || !Color.isValidChannel(a, true)) {
            throw new Error("Invalid color channel")
        }

        this.R = r
        this.G = g
        this.B = b
        this.A = a
    }

    public asString(): string {
        return `rgb(${this.R},${this.G},${this.B})`
    }

    public asHexString(): string {
        return `#${this.R.toString(16)}${this.G.toString(16)}${this.B.toString(16)}`
    }
}
 
function hslToRgb(h: number, s: number, l: number) {
    const r = l
    const g = l
    const b = l 
    return [r, g, b]
}

const RGB_ATLAS = new Map<string | number, Color>([
    ["red", new Color(255, 0, 0)],
    ["green", new Color(0, 255, 0)],
    ["blue", new Color(0, 0, 255)],
    ["black", new Color(0, 0, 0)],
    ["white", new Color(255, 255, 255)],
    ['yellow', new Color(255, 255, 0)],
]) 