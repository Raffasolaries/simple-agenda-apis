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
const ApiBuilder = require("claudia-api-builder");
require("moment/locale/it");
const get_meeting_details_1 = __importDefault(require("./apis/get-meeting-details"));
const add_meeting_1 = __importDefault(require("./apis/add-meeting"));
const delete_meeting_1 = __importDefault(require("./apis/delete-meeting"));
const get_meeting_week_1 = __importDefault(require("./apis/get-meeting-week"));
// import addMeeting from './apis/add-meeting';
const api = new ApiBuilder();
api.get('/api/1.0/meeting/{id-meeting}', function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield get_meeting_details_1.default(request);
    });
});
api.delete('/api/1.0/meeting/{id-meeting}', function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield delete_meeting_1.default(request);
    });
});
api.get('/api/1.0/meeting-week/{from}', function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield get_meeting_week_1.default(request);
    });
});
api.post('/api/1.0/meeting', function (request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield add_meeting_1.default(request);
    });
});
module.exports = api;
