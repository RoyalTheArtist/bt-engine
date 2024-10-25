export class ImpossibleException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ImpossibleException.prototype);
    }
}