"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const data = __importStar(require("../data.json"));
const getMeetingDetails = function (request) {
    return new Promise(function (reject, resolve) {
        const res = {
            state: 'KO',
            message: '',
            data: null
        };
        if (!request['pathParams']['id-meeting']) {
            res.message = 'Missing meeting id';
            return reject(res);
        }
        const result = data.filter(item => item.id === request['pathParams']['id-meeting']);
        if (result.length === 0) {
            res.message = 'No Matched meeting';
        }
        else {
            res.state = 'OK',
                res.message = 'Found meeting',
                res.data = result[0];
        }
        return resolve(res);
    });
};
module.exports = getMeetingDetails;
