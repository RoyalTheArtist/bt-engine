import { Entity } from "./entity";
import { IInitialize, IUpdate } from "../update.h";

/**
 * Abstract class for all components.
 * Components are objects that can be attached to entities and that define certain behaviors or properties of the entity.
 * Components can be initialized and updated.
 */
export abstract class Component implements IUpdate, IInitialize {
    parent: Entity | null = null

    update(_delta: number): void {}
    initialize(): void {}
}