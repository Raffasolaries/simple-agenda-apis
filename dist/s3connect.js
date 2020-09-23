"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.S3Connect = void 0;
const S3 = require("aws-sdk/clients/s3");
class S3Connect {
    constructor() {
        this.s3 = new S3({
            accessKeyId: 'AKIAW7WMUAANVPOWRFWJ',
            secretAccessKey: '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',
            region: 'eu-west-3'
        });
        this.params = {
            Bucket: 'chiodiapaga-bucket',
            Key: 'data.json'
        };
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.s3.getObject(this.params, function (err, rawdata) {
                const res = {
                    state: 'KO',
                    message: '',
                    data: null
                };
                if (err) {
                    res.message = 'getObject error';
                    res.data = err;
                    return res;
                }
                const data = JSON.parse(rawdata.Body);
                //const file: any = data.Body;
                res.state = 'OK';
                res.message = 'Object retrieved';
                res.data = data;
                return res;
            });
        });
    }
}
exports.S3Connect = S3Connect;
