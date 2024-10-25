
import { ISpriteSheetData, SpriteSheet } from "@/engine/graphics";

async function fetchJson<T>(resource: string): Promise<T> { 
    try {
        const result = await fetch(resource)
        if (!result.ok) throw new Error('Resource not found')
        const data = await result.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

type SpriteSheetManifest = Record<string, ISpriteSheetData>

export class AssetManager {
    private static spritesheets: Map<string, SpriteSheet> = new Map()
    public static _baseUrl = 'src/'

    public static get baseUrl() {
        return this._baseUrl
    }

    public static set baseUrl(url: string) {
        this._baseUrl = url
    }

    public static async loadSpritesheet(resource: string) {
        const spriteJSON = await fetchJson<ISpriteSheetData>(this.baseUrl + resource)
        if (!spriteJSON) throw new Error('Resource not found')
        
        const spritesheet = SpriteSheet.from(spriteJSON)
        this.spritesheets.set(resource, spritesheet)
        return spritesheet
    }

    public static async loadSpritesheetManifest(resource: string) {
        const manifest = await fetchJson<SpriteSheetManifest>(this.baseUrl + resource)
        if (!manifest) throw new Error('Resource not found')
        for (const [key, data] of Object.entries(manifest)) {
            const spritesheet = SpriteSheet.from(data)
            this.spritesheets.set(key, spritesheet)
        }
    }

    public static getSpriteSheet(resource: string) { 
        return this.spritesheets.get(resource)
    }


}