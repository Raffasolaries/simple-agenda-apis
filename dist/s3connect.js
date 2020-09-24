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
exports.deleteMeeting = exports.putMeeting = exports.getAgenda = void 0;
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const credentials = new AWS.SharedIniFileCredentials({ profile: 'raffasolaries' });
AWS.config.credentials = credentials;
const s3 = new AWS.S3();
const res = {
    state: 'KO',
    message: '',
    data: null
};
function getAgenda() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const rawdata = yield s3.getObject(params).promise();
            const data = JSON.parse(rawdata.Body);
            res.state = 'OK';
            res.message = 'Object retrieved';
            res.data = data;
            return res;
        }
        catch (err) {
            console.error('An error occurred', err);
            res.message = 'getObject error';
            res.data = err;
            return res;
        }
    });
}
exports.getAgenda = getAgenda;
function putMeeting(meeting) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let rawagenda = yield getAgenda();
            for (let i = 0; i < rawagenda.data.length; i++) {
                rawagenda.data[i].id = uuid_1.v4();
            }
            meeting.id = uuid_1.v4();
            rawagenda.data.push(meeting);
            const newAgenda = Buffer.from(JSON.stringify(rawagenda.data), 'binary');
            const params = {
                Body: newAgenda,
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const putAgenda = yield s3.putObject(params).promise();
            res.state = 'OK',
                res.message = 'Agenda updated',
                res.data = putAgenda;
            return res;
        }
        catch (err) {
            console.error('An error occurred', err);
            res.message = 'putMeeting error';
            res.data = err;
            return res;
        }
    });
}
exports.putMeeting = putMeeting;
function deleteMeeting(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let found = -1;
            const rawagenda = yield getAgenda();
            for (let i = 0; i < rawagenda.data.length; i++) {
                if (id === rawagenda.data[i].id) {
                    found = i;
                    rawagenda.data.splice(i, 1);
                }
            }
            const newAgenda = Buffer.from(JSON.stringify(rawagenda.data), 'binary');
            const params = {
                Body: newAgenda,
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const putAgenda = yield s3.putObject(params).promise();
            if (found !== -1) {
                res.state = 'OK';
                res.message = 'Meeting deleted',
                    res.data = rawagenda.data[found];
                return res;
            }
            else {
                res.message = 'Meeting not found';
                return res;
            }
        }
        catch (err) {
            console.error('An error occurred', err);
            res.message = 'deleteMeeting error';
            res.data = err;
            return res;
        }
    });
}
exports.deleteMeeting = deleteMeeting;
