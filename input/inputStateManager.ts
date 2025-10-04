import { ActionMapping } from './types.d';
import { KeyboardManager, KeyboardTransformer } from "./keyboard";
import { InputState } from "./types";

export class InputStateManager {
    keyboard: KeyboardManager
    //mouse: MouseManager
    //joypad?: JoypadManager
    constructor() {
        this.keyboard = new KeyboardManager()
        //this.mouse = new MouseManager()
    }
    getInputs = (): InputState => {
        const keyboardState = this.keyboard.keyboardState

        return {
            keyboard: keyboardState
        }
    }
}

export class InputTransformer {
    keyboardTransform: KeyboardTransformer
    constructor() {
        this.keyboardTransform = new KeyboardTransformer()
    }

    transform(inputState: InputState, actionMappings: ActionMapping = {}) {
        return this.keyboardTransform.transform(inputState.keyboard, actionMappings)
    }
}