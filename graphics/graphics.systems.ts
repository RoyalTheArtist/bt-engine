import { Component, Entity, System } from "@/engine/ecs";
import { AnimationManager } from "./animations";
import { Sprite } from "./graphics.spriteSheet";
import { Vector2D } from "../utils";
import { SurfaceLayer } from "@/render";

export class GraphicObject {
    constructor(public sprite: Sprite, public position: Vector2D, public layer: "foreground" | "background") { }
}

export class RenderComponent extends Component {

}

export class RenderSystem extends System {
    public componentsRequired = new Set([RenderComponent])
    public entities: Set<Entity> = new Set()
    public objects: Map<Entity, GraphicObject> = new Map()

    public update(delta: number): void { 
        AnimationManager.update(delta)
        for (let entity of this.entities) {
            const component = entity.getComponent(RenderComponent)
            component.update(delta)
        }
    }

    public query(entities: Set<Entity>) {
        for (let entity of entities) {
            if (entity.hasAll(this.componentsRequired)) {
                this.entities.add(entity)
            }
        }
    }

    public draw() {
        SurfaceLayer.foreground.draw()
                
    }
}

export const renderSystem = new RenderSystem()
