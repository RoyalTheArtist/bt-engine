
import { ActionMapping, ButtonState, DirectionState, StandardGameInput } from "./types"

export type KeyboardState = {
    pressedKeys: Set<string>
    heldKeys: Set<string>
}


export const KeyboardNeutralState: KeyboardState = {
    pressedKeys: new Set(),
    heldKeys: new Set()
}

export class KeyboardManager {
    keyboardState: KeyboardState = KeyboardNeutralState

    private keyDown = (event: KeyboardEvent) => {
        if (this.keyboardState.pressedKeys.has(event.key)) {
            this.keyboardState.heldKeys.add(event.key)
        }
        this.keyboardState.pressedKeys.add(event.key)
    }

    private keyUp = (event: KeyboardEvent) => {
        this.keyboardState.pressedKeys.delete(event.key)
        this.keyboardState.heldKeys.delete(event.key)
    }

    constructor() {
        window.addEventListener("keydown", this.keyDown)
        window.addEventListener("keyup", this.keyUp)
    }
}

export class KeyboardTransformer {
    private getActionState(actions: Map<string, ButtonState>, actionName: string): ButtonState {
        if (actions.has(actionName)) {
            return actions.get(actionName) as ButtonState
        } else {
            return 'not-pressed'
        }
    }

    private resolveAxisState = (negativeDirection: ButtonState, positiveDirection: ButtonState): DirectionState => {
        if (negativeDirection === 'pressed' && positiveDirection === 'not-pressed') {
            return -1
        } else if (positiveDirection === 'pressed' && negativeDirection === 'not-pressed') {
            return 1
        } else {
            return 0
        }
    }

    transform = (keyboard: KeyboardState, actionMappings: ActionMapping): StandardGameInput => {
        const actions = new Map<string, ButtonState>()
        Object.keys(actionMappings).forEach((key) => {
            const action = actionMappings[key]
            for (let name of action) {
                actions.set(name, 'not-pressed')

                if (keyboard.pressedKeys.has(key)) {
                    actions.set(name, 'pressed')
                } 
            }
        })

        const upActive = this.getActionState(actions, "move_up")
        const downActive = this.getActionState(actions, "move_down")
        const leftActive = this.getActionState(actions, "move_left")
        const rightActive = this.getActionState(actions, "move_right")

        const x = this.resolveAxisState(leftActive, rightActive)
        const y = this.resolveAxisState(upActive, downActive)

        return {
            axis: {
                discrete: {
                    x: x,
                    y: y
                }
            },
            actions
        }
    }
}
