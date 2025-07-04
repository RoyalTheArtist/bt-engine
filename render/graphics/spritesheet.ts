import { Sprite } from "./sprite"
import { Vector2D } from "@engine/utils"
import { Texture } from "./texture"

interface BaseSpriteSheet {
    getSprite(start: Vector2D, dimensions: Vector2D): Sprite
}

const loadedSpritesheets = new Map<string, SpriteSheet>()

export class SpriteSheet implements BaseSpriteSheet {
    private _texture: Texture
    private generatedSprites: Map<string, Sprite> = new Map()

    constructor(texture: Texture) {
        this._texture = texture
    }

    public get texture() {
        return this._texture
    }

    public getSprite(start: Vector2D, dimensions: Vector2D): Sprite {
        const key = `${start.x},${start.y},${dimensions.x},${dimensions.y}`
        if (this.generatedSprites.has(key)) {
            return this.generatedSprites.get(key) as Sprite
        }
        const sprite = new Sprite(this._texture, start, dimensions)
        sprite.build()
        this.generatedSprites.set(key, sprite)
        return sprite
    }

    static loadFrom(resource: string): SpriteSheet {
        if (loadedSpritesheets.has(resource)) return loadedSpritesheets.get(resource) as SpriteSheet
        const texture = Texture.from(resource)
        const spritesheet = new SpriteSheet(texture)
        loadedSpritesheets.set(resource, spritesheet)
        return spritesheet
    }
}
