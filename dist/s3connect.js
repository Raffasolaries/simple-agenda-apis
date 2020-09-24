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
exports.getAgenda = void 0;
const AWS = require("aws-sdk");
const credentials = new AWS.SharedIniFileCredentials({ profile: 'raffasolaries' });
AWS.config.credentials = credentials;
const s3 = new AWS.S3();
const params = {
    Bucket: 'chiodiapaga-bucket',
    Key: 'data.json'
};
const res = {
    state: 'KO',
    message: '',
    data: null
};
function getAgenda() {
    return __awaiter(this, void 0, void 0, function* () {
        return s3.getObject(params, function (err, rawdata) {
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
exports.getAgenda = getAgenda;
