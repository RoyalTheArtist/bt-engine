import { Entity } from "./entity";
import { IInitialize, IUpdate } from "bt-engine";
export abstract class Component implements IUpdate, IInitialize {
    parent: Entity | null

    update(_delta: number): void {}
    initialize(): void {}
}