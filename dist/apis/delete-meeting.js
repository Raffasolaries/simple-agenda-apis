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
//import * as rawdata from '../data.json';
const s3connect_1 = require("../s3connect");
const dropMeeting = function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = {
            state: 'KO',
            message: '',
            data: null
        };
        if (!request['pathParams']['id-meeting']) {
            res.message = 'Missing meeting id';
            return res;
        }
        const idMeeting = request['pathParams']['id-meeting'];
        const resAdded = yield s3connect_1.deleteMeeting(idMeeting);
        return resAdded;
    });
};
module.exports = dropMeeting;
