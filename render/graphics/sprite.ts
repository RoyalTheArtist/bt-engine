import { Vector2D } from "@engine/utils"
import { Texture } from "./texture"
import { IInitialize } from "@engine/update.h"
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
    _img: HTMLImageElement | undefined

    constructor(texture: Texture, start: Vector2D, dimensions: Vector2D, position: Vector2D = new Vector2D(0, 0)) {
        this._texture = texture
        this.start = start
        this.dimensions = dimensions
        this.position = position
    }

    public build() {
        if (!this._texture.loaded) return this

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = this.dimensions.x
        canvas.height = this.dimensions.y
        
        ctx.drawImage(
        this._texture.image as HTMLImageElement,
        this.start.x,
        this.start.y,
        this.dimensions.x,
            this.dimensions.y,
            0,
            0,
            this.dimensions.x,
            this.dimensions.y
        )
        
        this._img = new Image()
        this._img.src = canvas.toDataURL()
        
        return this
    }

    public get img(): HTMLImageElement | undefined {
        if (!this._img) {
            this.build()
        }
        return this._img
    }

    render(surface: Surface): void {
        if (!this.img) {
            this.build();
            return
        }
        surface.draw(this.img, this.position)
    }
}

