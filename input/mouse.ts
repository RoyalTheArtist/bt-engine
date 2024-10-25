export type Position = {
    x: number
    y: number
}

type MouseState = {
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
        elem.addEventListener('mouseup', (e) => {
            this._onMouseUp(e)
        })
        elem.addEventListener('mouseleave', (e) => {
            this._onMouseLeave(e)
        })
        elem.addEventListener('mouseenter', (e) => {
            this._onMouseEnter(e)
        })
    }

    public get mousePos(): Position {
        return this._mousePos
    }

    public get lockedPos(): Position {
        return {
            x: Math.floor((this.mousePos.x + 3) / 20),
            y: Math.floor((this.mousePos.y + 3) / 20)
        } 
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

    private _onMouseUp(e: MouseEvent) {
        this._mouseDown = false
    }

    private _onMouseLeave(e: MouseEvent) {
        this._mouseDown = false
        this._mouseAvailable = false
    }

    private _onMouseEnter(e: MouseEvent) {
        this._mouseAvailable = true
    }
} 