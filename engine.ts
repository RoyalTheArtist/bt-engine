import { ViewportSimple as Viewport } from "./render";
import { BaseScreen } from "./screen.base";
import { IStart, IUpdate } from "./update.h";

import { KeyboardManager } from "./input";
import { type RenderSystem } from "./render/system";


export class Engine implements IUpdate, IStart {
   
    protected _lastUpdate: number = 0
    protected _render: RenderSystem

    protected _screen: BaseScreen | null = null
    protected pendingScreen: BaseScreen | null = null
  
    
    constructor(render: RenderSystem) {
        this._render = render
    }

    public get render(): RenderSystem {
        return this._render
    }

    public get screen(): BaseScreen | null {
        return this._screen
    }

    start() {
        new KeyboardManager()
        window.requestAnimationFrame(() => this.update(0))
    }

    setNextScreen(screen: BaseScreen) {
        this.pendingScreen = screen.initialize(this)
        this.pendingScreen.preload()
    }

    setScreen(screen: BaseScreen) {
        this._screen = screen
    }

    update(delta: number) {
        if (!this.pendingScreen) {
            const screen = this.screen?.update(delta)
            if (screen && !Object.is(screen, this.screen)) {
                this.setNextScreen(screen as BaseScreen)
            }
        }
        
        if (this.pendingScreen && this.pendingScreen.ready) {
            this.setScreen(this.pendingScreen)
            this.pendingScreen = null
        }

        this.render.render()

        window.requestAnimationFrame((timeStamp) => {
            const delta = timeStamp - this._lastUpdate
            this._lastUpdate = timeStamp
            this.update(delta)
        })
    }
}
