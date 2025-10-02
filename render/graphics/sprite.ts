import { Vector2D } from "@engine/utils"
import { Texture } from "./texture"

import { Surface } from "@engine/render/surface"

export interface BaseSprite {
  position: Vector2D

  render(surface: Surface): void
}

export class Sprite implements BaseSprite {
    position: Vector2D
    start: Vector2D
    dimensions: Vector2D
    _texture: Texture

    constructor(texture: Texture, start: Vector2D, dimensions: Vector2D, position: Vector2D = new Vector2D(0, 0)) {
        this._texture = texture
        this.start = start
        this.dimensions = dimensions
        this.position = position
    }

    render(surface: Surface): void {
        if (!this._texture.loaded) return
        surface.context.drawImage(
        this._texture.image as HTMLImageElement,
        this.start.x,
        this.start.y,
        this.dimensions.x,
            this.dimensions.y,
            this.position.x,
            this.position.y,
            this.dimensions.x,
            this.dimensions.y
        )
    }
}

