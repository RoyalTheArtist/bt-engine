export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) { }
}

export class Rect {
    x: number
    y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}