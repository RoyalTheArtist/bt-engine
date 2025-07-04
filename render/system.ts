import { Vector2D } from "@engine/utils"
import { ViewportSimple as Viewport } from "./viewport"
import { SurfaceLayers } from "./surfaceLayers"
import { IRenderable } from "./surface"

interface RenderConfigData {
    resolution: {
        width: number,
        height: number
    }
}

export interface GraphicsConfigData extends RenderConfigData {
    type: "graphics"
    elem?: string | HTMLElement
}

export interface RenderSystem {
    type: string
    render(): void
    clear(): void
}

export class GraphicsRenderSystem implements RenderSystem {
    type = "graphics"
    constructor(private viewport: Viewport) {}

    public get resolution() { return this.viewport.resolution }

    render() {
        this.viewport.render()
    }

    clear() {
        this.viewport.layers.clear()
    }

    public addToTileLayer(element: IRenderable) {
        this.viewport.layers.tileLayer.addElement(element)
    }

    public addToUILayer(element: IRenderable) {
        this.viewport.layers.uiLayer.addElement(element)
    }

    public addToEntityLayer(element: IRenderable) {
        this.viewport.layers.entityLayer.addElement(element)
    }
}


// maybe i'll experiment with new systems later
export const useRenderSystem = (renderData: GraphicsConfigData) => {
    if (renderData.type === "graphics") {
        return useGraphicsRenderSystem(renderData)
    }
}

export const useGraphicsRenderSystem = (renderData: GraphicsConfigData) => {
    const resolution = new Vector2D(renderData.resolution.width, renderData.resolution.height)
    const viewport = new Viewport(resolution, new SurfaceLayers(resolution))
    viewport.initialize()
    viewport.attachTo(renderData.elem || "app")
    return new GraphicsRenderSystem(viewport)
}