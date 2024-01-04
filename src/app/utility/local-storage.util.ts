import { environment } from 'src/environments/environment';

interface StorageValue {
    v: any;
    t: number;
    d: number;
}

type GroupStorageValue = { [key: string]: StorageValue };

class AppLocalStorageController {

    private value: { [key: string]: GroupStorageValue };

    constructor(
        private key: string,
        private defaultTTL: number // in milliseconds
    ) {
        this.read();
    }

    private write() {
        setTimeout(() => {
            localStorage.setItem(this.key, JSON.stringify(this.value));
        }, 100);
    }

    private getEmptyStorageValue(): StorageValue {
        return {
            v: null,
            t: null,
            d: null
        };
    }

    private read(): void {
        const value = localStorage.getItem(this.key);

        if (value) {
            try {
                this.value = JSON.parse(value);
            } catch (e) {
                console.error('Unable to parse value.', e);
            }
        } else {
            this.value = {};
        }
    }

    private prepareKey(key: string): string {
        if (key && key.length) {
            return key.toUpperCase();
        }
        return null;
    }

    private ensure(group?: string, key?: string) {
        group = group ? this.prepareKey(group) : null;
        key = group && key ? this.prepareKey(key) : null;

        if (!this.value) {
            this.value = {}
            if (!group) {
                this.write();
            }
        }

        if (group && !this.value[group]) {
            this.value[group] = {};
            if (!key) {
                this.write();
            }
        }

        if (group && key && !this.value[group][key]) {
            this.value[group][key] = this.getEmptyStorageValue();
            this.write();
        }
    }

    public clear(group?: string, key?: string): void {
        group = group ? this.prepareKey(group) : null;
        key = group && key ? this.prepareKey(key) : null;

        if (!group && !key && this.value) {
            this.value = {};
            this.write();
        }

        if (group && !key && this.value && this.value[group]) {
            delete this.value[group];
            this.write();
        }

        if (group && key && this.value && this.value[group] && this.value[group][key]) {
            delete this.value[group][key];
            this.write();
        }
    }

    public set(group: string, key: string, value: any, ttl?: number): boolean {
        group = group ? this.prepareKey(group) : null;
        key = group && key ? this.prepareKey(key) : null;

        ttl = ttl ? ttl : this.defaultTTL;

        this.ensure(group, key);

        if (group && key && value) {
            this.value[group][key] = { t: ttl, v: value, d: Date.now() };
            this.write();
            return true;
        }

        return false;
    }

    public get(group: string, key: string): any {
        group = group ? this.prepareKey(group) : null;
        key = group && key ? this.prepareKey(key) : null;

        if (this.has(group, key)) {
            return this.value[group][key].v;
        }

        return null;
    }

    private isValidValue(v: StorageValue): boolean {

        if (
            v.v &&
            v.d &&
            v.t &&
            (v.d + v.t) > Date.now() // Check if TTL is valid
        ) {
            return true;
        } else {
            return false;
        }
    }

    public has(group: string, key: string): boolean {
        group = group ? this.prepareKey(group) : null;
        key = group && key ? this.prepareKey(key) : null;

        if (
            group &&
            key &&
            this.value &&
            this.value[group] &&
            this.value[group][key] !== undefined &&
            this.isValidValue(this.value[group][key])
        ) {
            return true;
        }

        return false;
    }

}

export const AppLocalStorage = new AppLocalStorageController(
    environment.localstorage.key,
    4.32e+7 // Default 12 Hours in milliseconds
);
