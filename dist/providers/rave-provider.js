/** @format */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Misc } from './misc-provider';
import { RavePayment } from './rave-payment-provider';
import { HttpClient } from '@angular/common/http';
var Rave = /** @class */ (function () {
    function Rave(misc, ravePayment, http) {
        this.misc = misc;
        this.ravePayment = ravePayment;
        this.http = http;
    }
    /**
     *
     * @param production
     * @param public_key
     */
    Rave.prototype.init = function (production, public_key) {
        var _this = this;
        if (production === void 0) { production = false; }
        return new Promise(function (resolve, reject) {
            if (public_key == undefined)
                reject('Please pass in a valid public key');
            if (production)
                _this.uri = _this.misc.live;
            else
                _this.uri = _this.misc.sandbox;
            _this.misc.PBFPubKey = public_key;
            resolve(true);
        });
    };
    /**
     * Returns a payment link that can be used to spin up the modal
     * @param paymentObject
     */
    Rave.prototype.preRender = function (paymentObject) {
        var _this = this;
        paymentObject['PBFPubKey'] = this.misc.PBFPubKey;
        var paymentObj = this.ravePayment.create(paymentObject);
        return new Promise(function (resolve, reject) {
            if (paymentObj['validated']) {
                return _this.http.post(_this.uri, paymentObj, { headers: { 'content-type': 'application/json' } }).subscribe(function (response) {
                    if (response['status'] == 'error')
                        reject(response['message']);
                    else
                        resolve(response['data']['link']);
                });
            }
            else
                reject(paymentObj);
        });
    };
    /**
     * Spins up the modal
     * @param paymentLink
     */
    Rave.prototype.render = function (paymentLink, iab, browser_options) {
        //@ts-ignore
        return iab.create(paymentLink.toString(), '_blank', browser_options);
    };
    Rave.prototype.paymentStatus = function (url) {
        var response = decodeURIComponent(url);
        response = response.slice(response.indexOf('=') + 1, response.length);
        response = JSON.parse(response);
        return response['status'];
    };
    Rave = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Misc, RavePayment, HttpClient])
    ], Rave);
    return Rave;
}());
export { Rave };
//# sourceMappingURL=rave-provider.js.map