import type { Vector2D } from "@engine/utils"
import { GraphicsLayer, IRenderable, Surface } from "./surface"

export class SurfaceLayers {
  private _uiLayer: GraphicsLayer | null = null
  private _entityLayer: GraphicsLayer | null = null
  private _tileLayer: GraphicsLayer | null = null

  constructor(private resolution: Vector2D) {}

  public get uiLayer(): GraphicsLayer {
    if (!this._uiLayer) {
      const surface = Surface.makeSurface(this.resolution.x, this.resolution.y)
      this._uiLayer = new GraphicsLayer(surface)
    }
    return this._uiLayer
  }

  public get tileLayer(): GraphicsLayer {
    if (!this._tileLayer) {
      const surface = Surface.makeSurface(this.resolution.x, this.resolution.y)
      this._tileLayer = new GraphicsLayer(surface)
    }
    return this._tileLayer
  }

  public get entityLayer(): GraphicsLayer {
    if (!this._entityLayer) {
      const surface = Surface.makeSurface(this.resolution.x, this.resolution.y)
      this._entityLayer = new GraphicsLayer(surface)
    }
    return this._entityLayer
  }

  render(surface: Surface) {
    this.tileLayer.render(surface)
    this.entityLayer.render(surface)
    this.uiLayer.render(surface)  
  }
  
  clear() {
    this.tileLayer.clear()
    this.entityLayer.clear()
    this.uiLayer.clear()
  }
}