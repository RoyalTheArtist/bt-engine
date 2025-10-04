import { Vector2D } from "../utils"
import { BaseViewport, CanvasViewport, ViewportSimple as Viewport } from "./viewport"
import { IRenderable } from "./surface"

interface RenderConfigData {
    type: RenderOptions
    resolution: {
        width: number,
        height: number
    }
}

type RenderOptions = "graphics" | "canvasgraphics"

export interface GraphicsConfigData extends RenderConfigData {
    type: "graphics"
    elem?: string |
    HTMLElement
}

export interface CanvasGraphicsConfigData extends RenderConfigData {
    type: "canvasgraphics"
    elem?: string |
    HTMLElement
}

export interface RenderSystem {
    type: RenderOptions
    readonly viewport: BaseViewport
    render(): void
    clear(): void
}

export class GraphicsRenderSystem implements RenderSystem {
    type = "graphics" as RenderOptions
    constructor(private _viewport: Viewport) {}

    public get resolution() { return this.viewport.resolution }
    public get viewport() { return this._viewport }

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

export class CanvasGraphicsRenderSystem implements RenderSystem {
    type = "canvasgraphics" as RenderOptions

    constructor(private _viewport: CanvasViewport) {}

    public get resolution() { return this.viewport.resolution }
    public get viewport() { return this._viewport }

    render() {
        this.viewport.render()
    }

    clear() {}
}


// maybe i'll experiment with new systems later
export const useRenderSystem = (renderData: RenderConfigData): { render: RenderSystem, viewport: BaseViewport } => {
    if (renderData.type === "graphics") {
        return useGraphicsRenderSystem(renderData as GraphicsConfigData)
    } else if (renderData.type === "canvasgraphics") {
        return useCanvasGraphicsSystem(renderData as CanvasGraphicsConfigData)
    }
    throw new Error("Unknown render system")
}

export const useGraphicsRenderSystem = (renderData: GraphicsConfigData) => {
    const resolution = new Vector2D(renderData.resolution.width, renderData.resolution.height)
    const viewport = Viewport.createViewport(resolution)

    const render = new GraphicsRenderSystem(viewport)
    return { render, viewport }
}

export const useCanvasGraphicsSystem = (renderData: CanvasGraphicsConfigData) => {
    const viewport = CanvasViewport.createViewport(renderData.resolution.width, renderData.resolution.height, renderData.elem || "app")
    const render = new CanvasGraphicsRenderSystem(viewport)
    return { render, viewport }
}