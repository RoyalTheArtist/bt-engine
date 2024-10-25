export interface IInitialize {
    initialize(...args: any): void
}
export interface IUpdate {
    update(delta: number): void
}

export interface IStart {
    start(): void
}