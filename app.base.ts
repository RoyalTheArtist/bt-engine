import { IInitialize, IStart } from "./update.h";

export abstract class App implements IInitialize, IStart { 
    initialize(): void {}
    start(): void {}
}