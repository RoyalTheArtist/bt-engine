import { Entity } from "./entity";
import { IInitialize, IUpdate } from "../update.h";
export abstract class Component implements IUpdate, IInitialize {
    parent: Entity | null = null

    update(_delta: number): void {}
    initialize(): void {}
}