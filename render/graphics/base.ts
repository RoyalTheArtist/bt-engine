import { Sprite } from "./sprite"
import { Vector2D } from "@engine/utils"
import { IRenderable, Surface } from "../surface"

export class GraphicsObject {
    position: Vector2D = new Vector2D(0, 0)

    constructor(x: number, y: number) {
        this.position.x = x
        this.position.y = y
    }

    setPosition(x: number, y: number) {
        this.position.x = x
        this.position.y = y
    }

    render(surface: Surface) { }
}

export class GraphicsContainer extends GraphicsObject {
    objects: Set<GraphicsObject> = new Set()
    constructor(public surface: Surface) { super(0, 0) }
    addGraphic(graphic: GraphicsObject) { this.objects.add(graphic) }
    removeGraphic(graphic: GraphicsObject) { this.objects.delete(graphic) }

    render(surface: Surface) {
        for (const object of this.objects) {
            object.render(surface)
        }
    }
}