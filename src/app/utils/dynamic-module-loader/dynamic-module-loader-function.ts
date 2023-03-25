import { Compiler, Injector, NgModuleFactory, NgModuleRef } from '@angular/core';

export class DynamicModuleLoader {
    public compiler!: Compiler;

    constructor(public injector: Injector) {
        this.compiler = this.injector.get(Compiler);
    }

    public loadModule(m: any): Promise<NgModuleRef<any>> {
        return m
            .then((elementModuleOrFactory: any) => {
                if (elementModuleOrFactory instanceof NgModuleFactory) {
                    // if ViewEngine
                    return elementModuleOrFactory;
                } else {
                    // if Ivy
                    return this.compiler.compileModuleAsync(elementModuleOrFactory);
                }
            })
            .then((moduleFactory: any) => moduleFactory.create(this.injector));
    }
}
