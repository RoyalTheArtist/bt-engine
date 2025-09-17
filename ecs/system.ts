import { IInitialize, IUpdate } from "../update.h"
import { Component } from "./component.h"
import { Entity } from "./entity"

/**
 * Abstract class for all systems.
 * Systems are objects that can be added to the engine and that are updated every frame.
 * Systems can query entities and update them.
 */
export abstract class System implements IUpdate, IInitialize {
    /**
     * Set of components required by the system for it to work.
     */
    public abstract readonly componentsRequired: Set<Function>

    /**
     * Set of all components that the system currently knows about.
     */
    protected components: Set<Component> = new Set()

    /**
     * Queries all entities that the system should be aware of.
     * @param entities - Set of all entities in the engine.
     */
    public abstract query(entities: Set<Entity>): void

    /**
     * Updates all entities queried by the system.
     * @param _delta - Time since the last update.
     */
    public abstract update(_delta: number): void

    /**
     * Initializes the system.
     */
    public initialize(): void { }
}