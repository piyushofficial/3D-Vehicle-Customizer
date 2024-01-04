

// tslint:disable-next-line: no-namespace
export namespace ObjectUtility {
    export function duplicate<T>(obj: T): T {
        try {
            if (hasValue(obj)) {
                return JSON.parse(JSON.stringify(obj)) as T;
            }
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    export function hasValue(value: any): boolean {
        return (value !== undefined && value !== null);
    }

}
