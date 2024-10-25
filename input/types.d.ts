import { Vector2D } from "bt-engine/utils"

export type ActionMapping = Record<string, string[]>

export type ButtonState = 'pressed' | 'not-pressed' | 'held'

export type PlayerInput = {
    keyboardMapping: GameKeyboardMapping
}

export type GameInputs = {
    player: PlayerInput
}

export type DirectionState = -1 | 0 | 1


export type InputState = {
    keyboard: KeyboardState
}

export type StandardGameInput = {
    axis: {
        discrete: {
            x: DirectionState,
            y: DirectionState
        }
    },
    actions: Map<string, ButtonState>
}

export type StandardGameInputs = {
    player: StandardGameInput
}