import { Color, type Vector2D } from "../utils"

export interface IRenderable {
  render(surface: Surface): void
}

export class Surface {
  private _canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, public width: number, public height: number) {
     this._canvas = canvas
     this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx
  }

  public static makeSurface(width: number, height: number) {
    const canvas = document.createElement("canvas")
    return new Surface(canvas, width, height).initialize()
  }

  public initialize() {
    this.canvas.width = this.width
    this.canvas.height = this.height
    return this
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    return this
  }

  public draw(image: HTMLImageElement | HTMLCanvasElement, position: Vector2D) {
    this.ctx.drawImage(image, position.x, position.y)
    return this
  }

  public drawAlpha(image: HTMLImageElement | HTMLCanvasElement, position: Vector2D, zoom: number, alpha: number) {
    this.ctx.save()
    this.ctx.globalAlpha = alpha
    const x = position.x
    const y = position.y
    this.ctx.drawImage(image, x, y, image.width * zoom, image.height * zoom)
    this.ctx.restore()
    return this
  }

  public drawRect(position: Vector2D, dimensions: Vector2D, color: Color = new Color(0, 0, 0)) {
    this.ctx.fillStyle = color.asString()
    this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y)
    return this
  }

  public drawCircle(position: Vector2D, radius: number, color: Color = new Color(0, 0, 0)) {
    this.ctx.beginPath()
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = color.asString()
    this.ctx.fill()
    return this
  }

  public drawLine(start: Vector2D, end: Vector2D, color: Color = new Color(0, 0, 0)) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 1
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(end.x, end.y)
    this.ctx.strokeStyle = color.asString()
    this.ctx.stroke()
    return this
  }

  public drawText(text: string, position: Vector2D, color: Color, size: number = 16) {
    this.context.fillStyle = color.asString()
    this.context.textBaseline = "top"
    this.context.textAlign = "left"
    this.context.font = `${size}px sans-serif`
    this.context.fillText(text, position.x, position.y) 
  }

  public drawRotatedImage(center: Vector2D, image: HTMLImageElement | HTMLCanvasElement, angle: number) {
    this.ctx.save()
    this.ctx.translate(center.x, center.y)
    this.ctx.rotate(angle)
    this.ctx.drawImage(image, -image.width / 2, -image.height / 2)
    this.ctx.restore()
  }

  public drawPoint(position: Vector2D, color: Color) {
    this.ctx.fillStyle = color.asString()
    this.ctx.fillRect(position.x, position.y, 1, 1)
  }

  public drawPoints(points: Vector2D[], color: Color, lineWidth: number = 1, alphaIncrement: number = 0.001) {
    if (points.length < 2) return
    this.context.lineWidth = lineWidth
    
    this.context.beginPath()
    for (let i = 1; i < points.length; i++) {
      if (points[i].x > 0)  this.context.lineTo(points[i].x, points[i].y) 
      
    }

    const alphaValue = Math.floor(alphaIncrement * 100)
    if (alphaValue < 10) color.setAlpha(.5)
    else if (alphaValue >= 100) color.setAlpha(1)

    this.context.strokeStyle = color.asString()
    this.context.stroke()
  }
}

export class GraphicsLayer {
  public readonly surface: Surface
  public elements: Set<IRenderable> = new Set()
  //objects: Map<any, any> = new Map()

  constructor(surface: Surface) {
    this.surface = surface
  }

  render(surface: Surface) {
    this.elements.forEach((element) => element.render(surface))
  }

  clear() {
    this.elements.clear()
  }

  addElement(element: IRenderable) {
    this.elements.add(element)
  }
}