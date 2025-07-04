export type Position = {
    x: number
    y: number
}

export type MouseState = {
    mousePos: Position
    leftMouse: boolean
    rightMouse: boolean
    middleMouse: boolean
    mouseAvailable: boolean
}

export class MouseHandler {
    private _mousePos: Position = { x: 0, y: 0 }
    private _mouseDown: boolean = false
    private _mouseAvailable: boolean = false
    private _buttons: number | null = null
    callbacks: Map<string, (mouseState: MouseState) => void> = new Map()
    
    constructor() {
   
    }

    public init(elem: HTMLElement) {
        elem.addEventListener('mousemove', (e) => {
            this._onMouseMove(e)
        })
        elem.addEventListener('mousedown', (e) => {
            this._onMouseDown(e)
        })
        elem.addEventListener('mouseup', () => {
            this._onMouseUp()
        })
        elem.addEventListener('mouseleave', () => {
            this._onMouseLeave()
        })
        elem.addEventListener('mouseenter', () => {
            this._onMouseEnter()
        })
    }

    public get mousePos(): Position {
        return this._mousePos
    }

    public get available(): boolean {
        return this._mouseAvailable
    }

    public get pressed(): boolean {
        return this._mouseDown
    }

    public get mouseState(): MouseState {
        return {
            mousePos: this._mousePos,
            leftMouse: this._buttons === 1,
            rightMouse: this._buttons === 2,
            middleMouse: this._buttons === 4,
            mouseAvailable: this._mouseAvailable
        }
    }

    public onMouseDown(fn: (_state: MouseState) => void) {
        this.callbacks.set('mousedown', fn)
        return this
    }

    public onMouseMove(fn: (_state: MouseState) => void) {
        this.callbacks.set('mousemove', fn)
    }

    private _onMouseMove(e: MouseEvent) {
        this._mousePos = {
            x: e.offsetX,
            y: e.offsetY
        }

        if (this.callbacks.has('mousemove')) {
            const callback = this.callbacks.get('mousemove')
            callback!(this.mouseState)
        }
    }

    private _onMouseDown(e: MouseEvent) {
        if (!this._mouseAvailable) return
        this._mouseDown = true

        this._buttons = e.buttons

        if (e.buttons === 2) {
            e.preventDefault()
        }

        if (this.callbacks.has('mousedown')) {
            const callback = this.callbacks.get('mousedown')

            callback!(this.mouseState)
        }
        
    }

    private _onMouseUp() {
        this._mouseDown = false
    }

    private _onMouseLeave() {
        this._mouseDown = false
        this._mouseAvailable = false
    }

    private _onMouseEnter() {
        this._mouseAvailable = true
    }
} 

let mouseHandler: MouseHandler

export const useMouseHandler = () => {
    if (!mouseHandler) {
        mouseHandler = new MouseHandler()
    }
    return mouseHandler
}