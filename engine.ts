import { Viewport } from "../render";
import { BaseScreen } from "./screen.base";
import { IStart, IUpdate } from "./update.h";

import { KeyboardManager } from "./input";

export class Engine implements IUpdate, IStart {
    protected _screen: BaseScreen | null = null
    protected _lastUpdate: number = 0
    private _viewport: Viewport
    
    constructor(viewport: Viewport) {
        this._viewport = viewport
    }

    public get viewport(): Viewport {
        return this._viewport
    }

    public get screen(): BaseScreen | null {
        return this._screen
    }

    start() {
        new KeyboardManager()
        window.requestAnimationFrame(() => this.update(0))
    }

    setScreen(screen: BaseScreen) {
        this._screen = screen
    }

    update(delta: number) {
        this.viewport.clear()
  
        const screen = this.screen?.update(delta)
        if (!Object.is(screen, this.screen)) {
            this.setScreen(screen as BaseScreen)
        }
        
        this.viewport.draw()

        window.requestAnimationFrame((timeStamp) => {
            const delta = timeStamp - this._lastUpdate
            this._lastUpdate = timeStamp
            this.update(delta)
        })
    }
}
