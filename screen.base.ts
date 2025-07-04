import { IInitialize, IUpdate } from "./update.h";
import { Engine } from "./engine";

export abstract class BaseScreen implements IUpdate, IInitialize {
    ready: boolean = false
    async preload(): Promise<BaseScreen> {
        this.ready = true
        return Promise.resolve(this)
    }
    abstract update(delta: number): BaseScreen
    abstract initialize(engine: Engine): BaseScreen
}