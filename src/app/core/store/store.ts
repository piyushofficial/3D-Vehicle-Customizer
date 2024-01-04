import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { InjectorResolver } from '../injector/injector.service';
import { AppError } from '../error/error.model';
import { AppLocalStorage } from 'src/app/utility/local-storage.util';
import { Session } from '../session/session.model';


// tslint:disable-next-line: no-namespace
export namespace Store {

    export type Path = (() => string) | string;

    export type APIConfig = {
        base?: Path;
        endpoint?: Path;
        defaultBase?: Path;
    };

    export type APIConfigGroup = { [key: string]: Store.APIConfig };

    export interface Config {
        api?: APIConfig;
    }

    export interface State {
        loading: boolean;
        error: AppError;
    }

    export abstract class AbstractState<T> implements State {
        data: null | T;
        loading: boolean;
        error: AppError;
        constructor(data?: T) {
            this.loading = false;
            this.error = null;
            this.data = data || null;
        }
    }

    export abstract class AbstractIdealState<T> extends AbstractState<T> {
        constructor(data?: T) {
            super(data);
        }
    }

    export abstract class AbstractErrorState<T> extends AbstractState<T> {
        constructor(error: AppError, data?: T) {
            super(data);
            this.error = error;
        }
    }
    export abstract class AbstractLoadingState<T> extends AbstractState<T> {
        constructor(data?: T) {
            super(data);
            this.loading = true;
            this.error = null;
        }
    }

    export interface Service {
        config: Config;
    }

    export abstract class AbstractService implements Service {

        config: Store.Config;
        protected controller: Store.Controller;
        protected logger: NGXLogger;

        constructor() {
            this.logger = InjectorResolver.get(NGXLogger);
            this.controller = new Store.Controller(this);
        }

    }

    export class Controller {
        private http: HttpClient;

        constructor(
            protected service: Store.Service
        ) {
            this.http = InjectorResolver.get(HttpClient);
        }

        public get<T>(path: Path, data?: any, base?: Path, options?: {}): Observable<T> {
            if (this.http) {

                if (options) {
                    options['params'] = data;
                    options = this.prepareOptions(options);
                }

                return this.http.get<T>(this.urlWithBase(path, base), options);
            }
            return new Subject<T>();
        }

        public put<T>(path: Path, data: any, base?: Path, options?: {}): Observable<T> {
            if (this.http) {
                if (options) {
                    options = this.prepareOptions(options);
                }
                return this.http.put<T>(this.urlWithBase(path, base), data, options);
            }
            return new Subject<T>();
        }

        public post<T>(path: Path, data?: any, base?: Path, options?: {}): Observable<T> {
            if (this.http) {
                if (options) {
                    options = this.prepareOptions(options);
                }
                return this.http.post<T>(this.urlWithBase(path, base), data, options);
            }
            return new Subject<T>();
        }

        public delete<T>(path: Path, base?: Path, options?: {}): Observable<T> {
            if (this.http) {
                if (options) {
                    options = this.prepareOptions(options);
                }
                return this.http.delete<T>(this.urlWithBase(path, base), options);
            }
            return new Subject<T>();
        }

        public urlWithBase(path: Path, base?: Path): string {
            return this.url(path, base);
        }

        public url(path: Path, base?: Path): string {
            const me = this;

            if (base) {
                base = me.resolvePath(base);
            } else if (me.service.config && me.service.config.api && me.service.config.api.base) {
                base = me.resolvePath(me.service.config.api.base);
            } else if (environment.api.core.base) {
                base = me.resolvePath(environment.api.core.base);
            }

            return base + me.sanitiesURL(me.resolvePath(path));
        }

        public getDefaultGetRequestHttpOptions() {
            return {
            };
        }

        public getDefaultPostRequestHttpOptions() {
            return {
            };
        }

        public replaceVariables(path: Path, variables: { [key: string]: string }): string {
            const me = this;
            let newPath: string;

            newPath = me.resolvePath(path);


            Object.keys(variables).forEach((variable: string) => {
                newPath = newPath.replace('{' + variable + '}', variables[variable]);
            });

            return newPath;
        }

        private resolvePath(path: Path): string {

            const me = this;

            if (!path) {
                return undefined;
            }

            if (typeof path === 'function') {
                path = path.call(me);
            }
            return path as string;
        }

        private sanitiesURL(url: string): string {
            return url.replace(/\/+/gi, '/');
        }

        private prepareOptions(options?: {}): {} {


            // Add Auth Header
            if (options['Authorization']) {
                // Loaded from AppLocal storage to avoid circular dependency on SessionService
                const session = AppLocalStorage.get('SESSION', 'SESSION') as Session;
                if (session && session.token) {
                    options['headers'] = options['headers'] || {} as HttpHeaders;
                    options['headers']['Authorization'] = 'Bearer ' + session.token;
                }
                delete options['Authorization'];
            }

            return options;
        }
    }
}
