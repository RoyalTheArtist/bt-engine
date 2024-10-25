import { KeyboardManager } from "./keyboard";
import { InputState } from "./types";

export class InputStateManager {
    static getInputs = (): InputState => {
        
        const keyboardState = KeyboardManager.keyboardState

        return {
            keyboard: keyboardState
        }
    }
}
