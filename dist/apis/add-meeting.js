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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const moment_1 = __importDefault(require("moment"));
require("moment/locale/it");
//import * as rawdata from '../data.json';
const s3connect_1 = require("../s3connect");
const addMeeting = function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const res = {
            state: 'KO',
            message: '',
            data: null
        };
        if (!body.date || !body.title) {
            res.message = 'Missing required parameters';
            return res;
        }
        const now = moment_1.default().unix();
        if (!moment_1.default(body.date, 'X', true).isValid() || moment_1.default.unix(now).diff(moment_1.default.unix(body.date)) > 0) {
            res.message = 'Invalid date';
            return res;
        }
        const meeting = {
            date: body.date,
            title: body.title,
            description: body.description && typeof body.description === 'string' ? body.description : '',
            links: body.links && Array.isArray(body.links) ? body.links : [],
            notes: body.notes && typeof body.notes === 'string' ? body.notes : ''
        };
        const resAdded = yield s3connect_1.putMeeting(meeting);
        return resAdded;
    });
};
module.exports = addMeeting;
