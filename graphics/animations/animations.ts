export class RenderAnimation {
    private _callback: Function | null = null
    public duration: number = 0
    
    public update(_delta: number) { }

    public initialize() {}

    public start() {
        
    }

    public end() {
        if (this._callback) {
            this._callback()
            this._callback = null
        }

        AnimationManager.removeAnimation(this)
    }

    public onEnd(fn: Function) {
        this._callback = fn
    }
}

export class AnimationManager {
    private static animations: Set<RenderAnimation> = new Set()

    public static triggerAnimation(animation: RenderAnimation) {
        animation.initialize()
        animation.start()
        this.animations.add(animation)
        return animation
    }

    public static removeAnimation(animation: RenderAnimation) {
        this.animations.delete(animation)
    }

    public static update(delta: number) {
        for (const animation of this.animations) {
            animation.update(delta)
        }
    }
}

