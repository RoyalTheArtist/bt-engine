import { Texture } from "./resources/texture"
import { Vector2D } from "bt-engine/utils"

export type SpriteAtlas = Map<string, [number, number]>
export type SpriteAtlasData = Record<string, [number, number]>

export interface ISpriteSheetData {
    "meta": {
        "resource": string,
        "tiles": {
            "size": [number, number]
        }
    },
    "atlas": SpriteAtlasData
}

export class Sprite {
    private _texture: Texture | null = null
    private _start: Vector2D
    private _dimensions: Vector2D

    private _img: HTMLImageElement | null = null
    private _working: boolean = false

    private offset: Vector2D = new Vector2D(0, 0)

    public get texture() {
        return this._texture
    }

    public get start() {
        return this._start
    }

    public get dimensions() {
        return this._dimensions
    }

    public get img() {
        if (!this._img) {
            this.build()
        }
        return this._img
    }

    public set img(img: HTMLImageElement | null) {
        this._img = img
    }

    
    constructor(texture: Texture | null, start: Vector2D, dimensions: Vector2D) {
        this._texture = texture

        this._start = start
        this._dimensions = dimensions
    }

    public build() {
        if (!this.texture ||!this.texture.loaded || this._working) return

        this._working = true
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = this.dimensions.x
        canvas.height = this.dimensions.y
        ctx.drawImage(
            this.texture.image as HTMLImageElement,
            this.start.x,
            this.start.y,
            this.dimensions.x,
            this.dimensions.y, 0, 0, this.dimensions.x, this.dimensions.y)

        this._img = new Image()
        this._img.src = canvas.toDataURL()

        this._working = false
    }

    public setOffsetX(x: number) {
        this.offset.x = x
        this.build()
    }
}

export class SpriteSheet {
    private _texture: Texture
    private _atlas: SpriteAtlas = new Map()
    private sprites: Map<string, Sprite> = new Map()
    private data: ISpriteSheetData
    private _meta: { tiles: { size: [number, number] } }

    public get meta() {
        return this._meta
    }

    constructor(texture: Texture, data: ISpriteSheetData) {
        this._texture = texture
        this.data = data
        this._meta = data.meta
        return this
    }

    public static from(data: ISpriteSheetData): SpriteSheet {
        const texture = new Texture(data.meta.resource)
        const spritesheet = new SpriteSheet(texture, data)
        spritesheet.setAtlas(data.atlas)
        return spritesheet
    }

    public build() {
        this.atlas.clear()
        for (const [key, value] of Object.entries(this.data.atlas)) {
            this.atlas.set(key, value)
        }
        return this
    }

    public get atlas() {
        return this._atlas
    }

    public get texture() {
        return this._texture
    }

    public setAtlas(atlasData: SpriteAtlasData) {
        this.atlas.clear()
        for (const [key, value] of Object.entries(atlasData)) {
            this.atlas.set(key, value)
        }
        return this
    }

    public getSprite(name: string): Sprite {
        if (this.sprites.has(name)) {
            return this.sprites.get(name)!
        } else {
            const [row, column] = this.atlas.get(name)!

            const sprite = new Sprite(
                this._texture,
                new Vector2D(row * this.meta.tiles.size[0], column * this.meta.tiles.size[1]),
                new Vector2D(this.meta.tiles.size[0], this.meta.tiles.size[1]),
            )
            sprite.build()
            this.sprites.set(name, sprite)
            return sprite
        }
    }
}

