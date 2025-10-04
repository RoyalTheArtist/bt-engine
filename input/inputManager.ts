import { InputStateManager, InputTransformer } from "./inputStateManager";
import { ActionMapping, StandardGameInput } from "./types";

export class InputManager {
    manager: InputStateManager
    transformer: InputTransformer
    actionMappings!: ActionMapping
    constructor() {
        this.manager = new InputStateManager()
        this.transformer = new InputTransformer()
    }
    getInputs = (): StandardGameInput => {
        const inputState = this.manager.getInputs();
        
        return this.transformer.transform(inputState, this.actionMappings || {})
    }

    registerMap(actionMappings: ActionMapping) {
        this.actionMappings = actionMappings
    }
}
