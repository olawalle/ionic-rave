var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { Rave } from './providers/rave-provider';
import { RavePayment } from './providers/rave-payment-provider';
import { Misc } from './providers/misc-provider';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
var RaveModule = /** @class */ (function () {
    function RaveModule() {
    }
    RaveModule_1 = RaveModule;
    RaveModule.forRoot = function () {
        return {
            ngModule: RaveModule_1,
            providers: [Rave, RavePayment, Misc]
        };
    };
    var RaveModule_1;
    RaveModule = RaveModule_1 = __decorate([
        NgModule({
            imports: [
                // Only if you use elements like ion-content, ion-xyz...
                HttpClientModule,
                IonicModule
            ],
            declarations: [
            // declare all components that your module uses
            ],
            exports: [
            // export the component(s) that you want others to be able to use
            ]
        })
    ], RaveModule);
    return RaveModule;
}());
export { RaveModule };
//# sourceMappingURL=rave-module.js.map