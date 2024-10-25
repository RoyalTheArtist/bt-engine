import { IInitialize, IUpdate } from "../update.h"
import { Component } from "./component.h"
import { Entity } from "./entity"

export abstract class System implements IUpdate, IInitialize {
    public abstract componentsRequired: Set<Function>
    public components: Set<Component> = new Set()
    public abstract query(entities: Set<Entity>): void
    public abstract update(_delta: number): void
    public initialize(): void { }
    //public ecs: ECS | null = null
}
  