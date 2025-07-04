import { Sprite } from "./sprite"
import { Vector2D } from "@engine/utils"
import { IRenderable, Surface } from "../surface"

export class GraphicsObject implements IRenderable {
    private _position: Vector2D
    private _dimensions: Vector2D
    private surface: Surface | null = null
    private sprite: Sprite | null = null

    constructor(position: Vector2D, dimensions: Vector2D) {
        this._position = position
        this._dimensions = dimensions
    }

    get position() { return this._position }
    get dimensions() { return this._dimensions }
    get center() { return new Vector2D(this.position.x + this.dimensions.x / 2, this.position.y + this.dimensions.y / 2) }
    build() {
        if (!this.surface) this.surface = Surface.makeSurface(this.dimensions.x, this.dimensions.y)
    }
    render(surface: Surface) {
        if (!this.surface) {
            this.build();
            return
        }
        this.surface.clear()
        this.sprite?.render(this.surface)
        surface.draw(this.surface.canvas, this.position)
    }

    setSprite(sprite: Sprite) {
        this.sprite = sprite
    }
}