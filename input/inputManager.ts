import { InputStateManager } from "./inputStateManager";
import { KeyboardTransformer } from "./keyboard";
import { ActionMapping, StandardGameInput } from "./types";

export class InputManager {
    static getInputs = (actionMappings: ActionMapping): StandardGameInput => {
        const inputState = InputStateManager.getInputs();
        
        return KeyboardTransformer.transform(inputState.keyboard, actionMappings)
    }
}