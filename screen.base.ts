import { IInitialize, IUpdate } from "./update.h";
import { Engine } from "./engine";
import { IRenderable } from "./render/surface";

export abstract class BaseScreen implements IUpdate, IInitialize, IRenderable {
    engine: Engine | undefined
    ready: boolean = false
    async preload(): Promise<this> {
        this.ready = true
        return Promise.resolve(this)
    }
    abstract update(delta: number): this
    abstract initialize(engine: Engine): this
    abstract render(): void
}