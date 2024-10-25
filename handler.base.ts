import { Action} from "@/apps/boneTorch/modules/actors"
import { StandardGameInput } from "../input"

export abstract class InputHandler {
    abstract handleInput(input: StandardGameInput): Action | null
}