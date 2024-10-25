import { IInitialize, IUpdate } from "./update.h";

export abstract class BaseScreen implements IUpdate, IInitialize {
    abstract update(delta: number): BaseScreen
    abstract initialize(): void
}