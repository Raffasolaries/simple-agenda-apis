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
const getMeetingDetails = function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = {
            state: 'KO',
            message: '',
            data: null
        };
        const meetingsData = yield s3connect_1.getAgenda();
        if (!request['pathParams']['id-meeting']) {
            res.message = 'Missing meeting id';
            return res;
        }
        if (Array.isArray(meetingsData.data)) {
            const result = meetingsData.data.filter(function (item) { return item.id === request['pathParams']['id-meeting']; });
            if (result.length === 0) {
                res.message = 'No Matched meeting';
            }
            else {
                res.state = 'OK',
                    res.message = 'Found meeting',
                    res.data = result[0];
            }
            return res;
        }
        else {
            return meetingsData;
        }
    });
};
module.exports = getMeetingDetails;
