import { makeSurface, SurfaceOld, SurfaceLayer } from "./surfaceOld"
import { IInitialize } from ".."
import { Color, Vector2D } from "../utils"
import { SurfaceLayers } from "./surfaceLayers"
import { Surface } from "./surface"

export class Viewport implements IInitialize {
    private _surface: SurfaceOld

    constructor(surface: SurfaceOld) {
      this._surface = surface
    }

    public get surface(): SurfaceOld {
      return this._surface
    }
  
  public initialize(elem: string = "app") {
    const el = document.getElementById(elem)
    if (el) {
      el.innerHTML = ""
      el.appendChild(this._surface.canvas)
    } else {
      document.body.appendChild(this._surface.canvas)
    }
      
    }
  
    public draw() {
      this.drawBackground()
      this.surface.drawZoom(SurfaceLayer.background.surface.canvas, new Vector2D(0, 0), SurfaceLayer.zoom)
      this.surface.drawZoom(SurfaceLayer.foreground.surface.canvas, new Vector2D(0, 0), SurfaceLayer.zoom)
    }
  
  public clear() {
      this.surface.clear()
      SurfaceLayer.background.clear()
      SurfaceLayer.foreground.clear()
    }

    public setResolution(width: number, height: number) {
      this._surface.setResolution(new Vector2D(width, height))
    }

    public drawAlpha(img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, zoom: number, alpha: number) {
      this.surface.context.save()
      this.surface.context.globalAlpha = 1-alpha
      this.surface.context.drawImage(img, x, y, img.width * zoom, img.height * zoom)
      this.surface.context.restore()
    }
  
  public drawBackground(color: Color = new Color(0, 0, 0)) {
      this.surface.clear()
      this.surface.drawRect(new Vector2D(0, 0), new Vector2D(this.surface.width, this.surface.height), color)
    }
  }

  export function makeViewport(width: number, height: number): ViewportSimple {
    const resolution = new Vector2D(width, height)
    const surface = Surface.makeSurface(width, height)
    const viewport = new ViewportSimple(resolution, new SurfaceLayers(resolution), surface)
    viewport.initialize()
    return viewport
}
  

function provideElem(attachTo: string | HTMLElement) {
  if (typeof attachTo === "string") {
    const elem = document.getElementById(attachTo)
    if (elem !== null) return elem
    return document.body
  }
  return attachTo
}

export abstract class BaseViewport {
  abstract surface: Surface
  resolution: Vector2D
  container: HTMLElement | null = null

  constructor(resolution: Vector2D) {
      this.resolution = resolution
  }

  public attachTo(elem: string | HTMLElement) {
    if (typeof elem === "string") {
      const container = document.getElementById(elem) 
      if (container !== null) this.container = container
      
    } else if (elem instanceof HTMLElement) {
      this.container = elem
    } 

    if (!this.container) {
      this.container = document.body
    }
    
    this.container.appendChild(this.surface.canvas)
    return this
  }
}

export class ViewportSimple extends BaseViewport {
  surface: Surface
  resolution: Vector2D

  constructor(resolution: Vector2D, private _layers: SurfaceLayers, surface: Surface) {
    super(resolution)
    this.surface = surface
    this.resolution = resolution
  }

  public get layers(): SurfaceLayers {
    return this._layers
  }

  public initialize() {
    const surface = Surface.makeSurface(this.resolution.x, this.resolution.y)
    this.surface = surface
    
  }

  public drawBackground(color: Color = new Color(0, 0, 0)) {
    if (!this.surface) return
    this.surface.clear()
    this.surface.drawRect(new Vector2D(0, 0), new Vector2D(this.surface.width, this.surface.height), color)
  }

  public render() {
    if (!this.surface) return
    this.drawBackground()

    this._layers.render(this.surface)
  }

  public static createViewport(dimensions: Vector2D) {
    const surface = Surface.makeSurface(dimensions.x, dimensions.y)
    const viewport = new ViewportSimple(dimensions, new SurfaceLayers(dimensions), surface)
    viewport.initialize()
    return viewport
  }
}

export class CanvasViewport extends BaseViewport {
  surface: Surface
  container: HTMLElement | null = null
  constructor(public width: number, public height: number, surface: Surface) { 
    super(new Vector2D(width, height))
    this.surface = surface
  }

  public init() {
    this.surface.changeDimensions(this.width, this.height)
  }

  public attachTo(elem: string | HTMLElement) {
    if (typeof elem === "string") {
      const container = document.getElementById(elem) 
      if (container !== null) this.container = container
      
    } else if (elem instanceof HTMLElement) {
      this.container = elem
    } 

    if (!this.container) {
      this.container = document.body
    }
    
    this.container.appendChild(this.surface.canvas)
    return this
  }

  public static createViewport(width: number, height: number, elem?: string | HTMLElement) {
    const surface = Surface.makeSurface(width, height)
    const viewport = new CanvasViewport(width, height, surface)
    viewport.init()
    if (elem) viewport.attachTo(elem)
    return viewport
  }

  public render() {
    if (!this.surface) return
    this.drawBackground()
  }

  public drawBackground(color: Color = new Color(0, 0, 0)) {
    if (!this.surface) return
    this.surface.clear()
    this.surface.drawRect(new Vector2D(0, 0), new Vector2D(this.surface.width, this.surface.height), color)
  }
}