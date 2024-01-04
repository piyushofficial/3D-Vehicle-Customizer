export class AppError {
    constructor(public msg?: string, public code?: string) {
    }
    static fromError(error: Error): AppError {
        return new AppError(error.message);
    }
}
