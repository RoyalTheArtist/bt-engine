import { Component } from "./component.h"
import { IInitialize, IUpdate } from ".."
import { Vector2D } from "../utils"

type constr<T extends Component> = { new(...args: any[]): T } 

export class Rectangle {
    constructor(public start: Vector2D, public end: Vector2D) { }
}


export abstract class Entity implements IUpdate, IInitialize { 
    protected _components: Set<Component> = new Set()
    public name: string = 'unnamed entity'

    public get components() {
        return this._components
    }

    public addComponent(component: Component) {
        component.parent = this
        component.initialize()
        this.components.add(component)
    }

    public hasComponent(c: Function): boolean {
        for (const component of this._components) {
            if (component instanceof c) {
                return true
            }
        }
        return false
    }

    public hasAll(componentClasses: Iterable<Function>): boolean {
        for (let componentClass of componentClasses) {
            if (!this.hasComponent(componentClass)) {
                return false
            }
        }
        return true
    }

    public getComponent<T extends Component>(c: constr<T>): T {
        for (const component of this.components) {
            if (component instanceof c) {
                return component as T
            }
        }
        throw new Error(`Component not found: ${c.name} `)
    }

    public removeComponent<C extends Component>(c: constr<C>) {
        for (const component of this._components.keys()) {
            if (component instanceof c) {
                this._components.delete(component)
                break;
            }
        }
    }

    public update(delta: number): void {
        for (const component of this._components.values()) {
            component.update(delta)
        }
    }

    public initialize() {
        for (const component of this._components.values()) {
            component.initialize()
        }
    }
}