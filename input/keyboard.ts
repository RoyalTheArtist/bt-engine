
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
    static keyboardState: KeyboardState = KeyboardNeutralState

    private static keyDown = (event: KeyboardEvent) => {
        if (KeyboardManager.keyboardState.pressedKeys.has(event.key)) {
            KeyboardManager.keyboardState.heldKeys.add(event.key)
        }
        KeyboardManager.keyboardState.pressedKeys.add(event.key)
    }

    private static keyUp = (event: KeyboardEvent) => {
        KeyboardManager.keyboardState.pressedKeys.delete(event.key)
        KeyboardManager.keyboardState.heldKeys.delete(event.key)
    }

    constructor() {
        window.addEventListener("keydown", KeyboardManager.keyDown)
        window.addEventListener("keyup", KeyboardManager.keyUp)
    }
}

export class KeyboardTransformer {
    private static getActionState(actions: Map<string, ButtonState>, actionName: string): ButtonState {
        if (actions.has(actionName)) {
            return actions.get(actionName) as ButtonState
        } else {
            return 'not-pressed'
        }
    }

    private static resolveAxisState = (negativeDirection: ButtonState, positiveDirection: ButtonState): DirectionState => {
        if (negativeDirection === 'pressed' && positiveDirection === 'not-pressed') {
            return -1
        } else if (positiveDirection === 'pressed' && negativeDirection === 'not-pressed') {
            return 1
        } else {
            return 0
        }
    }

    static transform = (keyboard: KeyboardState, actionMappings: ActionMapping): StandardGameInput => {
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

        const upActive = KeyboardTransformer.getActionState(actions, "move_up")
        const downActive = KeyboardTransformer.getActionState(actions, "move_down")
        const leftActive = KeyboardTransformer.getActionState(actions, "move_left")
        const rightActive = KeyboardTransformer.getActionState(actions, "move_right")

        const x = KeyboardTransformer.resolveAxisState(leftActive, rightActive)
        const y = KeyboardTransformer.resolveAxisState(upActive, downActive)

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
