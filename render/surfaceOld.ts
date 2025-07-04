import { Entity } from "../ecs"
import { GraphicObject } from "../graphics"
import { IInitialize } from ".."
import { Color, Vector2D } from "../utils"

export class SurfaceOld implements IInitialize {
    resolution: Vector2D
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, resolution: Vector2D = new Vector2D(800, 600)) {
      this.resolution = resolution
      this._canvas = canvas
      this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    }
  
    public get canvas(): HTMLCanvasElement {
      return this._canvas
    }
  
    public get context(): CanvasRenderingContext2D {
      return this._ctx
    }
  
    public get width(): number {
      return this.resolution.x
    }
  
    public get height(): number {
      return this.resolution.y
  }
  
  public initialize(): SurfaceOld {
    this.canvas.width = this.resolution.x
    this.canvas.height = this.resolution.y
    this.context.imageSmoothingEnabled = false
    return this
  }
  
  public setResolution(resolution: Vector2D) {
    const { x: width, y: height } = resolution

    this.resolution = resolution
    
      this.canvas.width = width
      this.canvas.height = height
    return this
  }
  
  public clear() {
    this.context.clearRect(0, 0, this.width, this.height)
    return this
  }
  
  public drawRect(position: Vector2D, dimensions: Vector2D, color: Color = new Color(0, 0, 0)) {
    this.context.fillStyle = color.asString()
    this.context.fillRect(position.x, position.y, dimensions.x, dimensions.y)
    return this
  }

  public drawStrokeRect(position: Vector2D, size: Vector2D, color: Color) {
    this.context.strokeStyle = color.asString()
    this.context.strokeRect(position.x, position.y, size.x, size.y)
    return this
  }
  
  public draw(image: HTMLImageElement | HTMLCanvasElement, position: Vector2D) {
    this.context.drawImage(image, position.x, position.y)
  }
  
  public drawZoom(image: HTMLImageElement | HTMLCanvasElement, position: Vector2D, zoom: number) {
      this.context.drawImage(image, position.x, position.y, image.width * zoom, image.height * zoom)
  }
  
  public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
    this.context.save()
    this.context.globalAlpha = 1-alpha
    this.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
    this.context.restore()
  }
  
  public drawText(text: string, position: Vector2D, color: Color, size: number = 16) {
    this.context.fillStyle = color.asString()
    this.context.textBaseline = "top"
    this.context.textAlign = "left"
    this.context.font = `${size}px sans-serif`
    this.context.fillText(text, position.x, position.y) 
  }

  public fillCircle(position: Vector2D, radius: number, color: Color = new Color(0, 0, 0)) {
    this.context.beginPath()
    this.context.arc(position.x, position.y, radius, 0, 2 * Math.PI)
    this.context.fillStyle = color.asString()
    this.context.fill()
  }
}

class GraphicsLayer {
  public readonly surface: SurfaceOld 
  objects: Map<Entity, GraphicObject> = new Map()

  constructor(surface: SurfaceOld) {
    this.surface = surface
  }

  public draw() {
    this.surface.clear()
    this.objects.forEach((object) => {
       if (!object.sprite || !object.sprite.img) return
      this.surface.draw(object.sprite.img, object.position)
    })
  }

  public clear() {
    this.surface.clear()
  }
}
  
export class SurfaceLayer {
  private static _background: GraphicsLayer
  private static _foreground: GraphicsLayer
  private static _zoom: number = 1

  public static get zoom(): number {
    return this._zoom
  }

  private constructor() { }

  public static setZoom(zoom: number) {
    this._zoom = zoom
  }

  public static get background(): GraphicsLayer {
    if (!this._background) {
      this._background = new GraphicsLayer(SurfaceLayer.getSurface())
    }
    return this._background
  }

  public static get foreground(): GraphicsLayer {
    if (!this._foreground) {
        this._foreground = new GraphicsLayer(SurfaceLayer.getSurface())
    }
    return this._foreground
  }

  private static getSurface() {
    const surface = makeSurface(800, 600)
    return surface
  }
  
  public static clear() {
    SurfaceLayer.background.clear()
    SurfaceLayer.foreground.clear()
   }
}

export const makeSurface = (width: number, height: number): SurfaceOld => {
  const canvas = document.createElement("canvas")
  const resolution = new Vector2D(width, height)
  return new SurfaceOld(canvas, resolution).initialize()
}

