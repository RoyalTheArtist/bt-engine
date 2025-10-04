import { Color, Vector2D } from "@engine/utils"
import { Texture } from "./texture"

import { Surface } from "@engine/render/surface"
import { GraphicsObject } from "./base"

export interface BaseSprite {
  position: Vector2D

  render(surface: Surface): void
}

export class RectGraphic extends GraphicsObject {
    centered: boolean = true
    dimensions: Vector2D

    get width(): number { return this.dimensions.x }
    get height(): number { return this.dimensions.y }
    constructor(width: number, height: number) {
        super(0, 0) 
        this.dimensions = new Vector2D(width, height)
    }
    render(surface: Surface) { 
        surface.context.translate(this.position.x, this.position.y)
        const x = this.centered ? this.width / 2 : 0
        const y = this.centered ? this.height / 2 : 0
        surface.drawRect(new Vector2D(x, y), new Vector2D(this.width, this.height), new Color(255, 0, 0))
    }
}

export class Sprite extends RectGraphic {
    start: Vector2D
    offset: Vector2D = new Vector2D(0, 0)
    _texture: Texture

    constructor(texture: Texture, start: Vector2D, dimensions: Vector2D, position: Vector2D = new Vector2D(0, 0)) {
        super(dimensions.x, dimensions.y)
        this._texture = texture
        this.start = start

        this.position.x = position.x
        this.position.y = position.y
    }

    render(surface: Surface): void {
        if (!this._texture.loaded) return
        surface.context.drawImage(
        this._texture.image as HTMLImageElement,
        this.start.x,
        this.start.y,
        this.dimensions.x,
            this.dimensions.y,
            this.position.x + this.offset.x,
            this.position.y + this.offset.y,
            this.dimensions.x,
            this.dimensions.y
        )
    }
}

