"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ApiBuilder = require("claudia-api-builder");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/it");
const get_meeting_details_1 = __importDefault(require("./apis/get-meeting-details"));
const api = new ApiBuilder();
api.get('/hello', function () {
    return 'hello world';
});
api.get('/api/1.0/tomorrow', function (request) {
    return {
        request: request,
        tomorrow: moment_1.default().add(1, 'days').format('X')
    };
});
api.get('/api/1.0/meeting/{id-meeting}', function (request) {
    return get_meeting_details_1.default(request).then(res => res);
});
module.exports = api;
