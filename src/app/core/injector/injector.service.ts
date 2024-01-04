import { Injector, Type, InjectionToken, AbstractType, InjectFlags, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class InjectorResolver {

    private static i: Injector;

    static get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T {
        if (InjectorResolver.i) {
            return InjectorResolver.i.get(token, notFoundValue, flags);
        } else {
            console.error('InjectorResolver not initiated');
            return notFoundValue;
        }
    }

    constructor(i: Injector) {
        InjectorResolver.i = i;
    }

}
