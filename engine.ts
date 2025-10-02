import { AssetManager } from './assets/manager';
import { ViewportSimple as Viewport } from "./render";
import { BaseScreen } from "./screen.base";
import { IStart, IUpdate } from "./update.h";

import { KeyboardManager, InputManager } from "./input";
import { type RenderSystem } from "./render/system";
import { AnimationManager } from "./render/graphics/animations";


export class Engine implements IUpdate, IStart {
   
    protected _lastUpdate: number = 0
    protected _render: RenderSystem
    protected _input: InputManager
    protected _resource: AssetManager 

    protected _screen: BaseScreen | null = null
    protected pendingScreen: BaseScreen | null = null
  
    
    constructor(render: RenderSystem, input?: InputManager) {
        this._input = input || new InputManager()
        this._render = render
        this._resource = new AssetManager()
    }

    public get render(): RenderSystem { return this._render }
    public get input(): InputManager { return this._input }
    public get resource(): AssetManager { return this._resource }

    public get screen(): BaseScreen | null {
        return this._screen
    }

    start() {
        new KeyboardManager()
        window.requestAnimationFrame(() => this.update(0))
    }

    setNextScreen(screen: BaseScreen) {
        screen.preload()
        this.pendingScreen = screen.initialize(this)
        this.pendingScreen
    }

    setScreen(screen: BaseScreen) {
        screen.engine = this
        this._screen = screen
    }

    update(delta: number) {  
        if (this.pendingScreen && this.pendingScreen.ready) {
            this.setScreen(this.pendingScreen)
            this.pendingScreen = null
        }

        AnimationManager.update(delta)
        this.render.render()
        if (this.screen) {
            const screen = this.screen.update(delta)
             if (screen && !Object.is(screen, this.screen)) {
                this.setNextScreen(screen as BaseScreen)
            }
            this.screen.render()
        }

        window.requestAnimationFrame((timeStamp) => {
            const delta = timeStamp - this._lastUpdate
            this._lastUpdate = timeStamp
            this.update(delta)
        })
    }
}
