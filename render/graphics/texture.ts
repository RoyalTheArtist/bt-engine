import { AssetManager } from "../../assets"


export class Texture {
    private _url: string
    private _image: HTMLImageElement
    private _loaded: boolean = false
    constructor(url: string) {
        const BASE_URL = AssetManager.baseUrl
        this._url = url
        this._image = new Image()
        this._image.src = BASE_URL + this._url
        this.load()
    }

    public get width() {
        return this._image.width
    }

    public get height() {
        return this._image.height
    }

    get url() {
        return this._url
    }

    get image() {
        if (!this._loaded) return null
        return this._image
    }

    get loaded() {
        return this._loaded
    }
    async load(): Promise<boolean> {
        return new Promise((resolve) => {
            this._image.onload = () => {
                this._loaded = true
                resolve(this._loaded)
            }
        })
    }
}
