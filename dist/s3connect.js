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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeeting = exports.putMeeting = exports.getWeekAgenda = exports.getAgenda = void 0;
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/it");
// Add credentials if you want to test locally
// const credentials = new AWS.SharedIniFileCredentials({profile: 'raffasolaries'});
// AWS.config.credentials = credentials;
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
            res.message = 'KO';
            res.message = 'getObject error';
            res.data = err;
            return res;
        }
    });
}
exports.getAgenda = getAgenda;
function getWeekAgenda(from) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const rawdata = yield s3.getObject(params).promise();
            const data = JSON.parse(rawdata.Body);
            let weekAgenda = [];
            for (let i = 0; i < data.length; i++) {
                if (moment_1.default.unix(data[i].date).isBetween(moment_1.default.unix(from), moment_1.default.unix(from).add(1, 'week'))) {
                    weekAgenda.push(data[i]);
                }
            }
            if (weekAgenda.length === 0) {
                res.message = 'Your week plan is empty';
                return res;
            }
            res.state = 'OK';
            res.message = 'Object retrieved';
            res.data = weekAgenda;
            return res;
        }
        catch (err) {
            console.error('An error occurred', err);
            res.message = 'KO';
            res.message = 'getWeekAgenda error';
            res.data = err;
            return res;
        }
    });
}
exports.getWeekAgenda = getWeekAgenda;
function putMeeting(meeting) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rawagenda = yield getAgenda();
            const meetingData = {
                id: uuid_1.v4(),
                date: meeting.date,
                title: meeting.title,
                description: meeting.description,
                links: meeting.links,
                notes: meeting.notes
            };
            rawagenda.data.push(meetingData);
            const newAgenda = Buffer.from(JSON.stringify(rawagenda.data), 'binary');
            const params = {
                Body: newAgenda,
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const putAgenda = yield s3.putObject(params).promise();
            res.state = 'OK',
                res.message = 'Agenda updated',
                res.data = {
                    res: putAgenda,
                    meeting: meetingData
                };
            return res;
        }
        catch (err) {
            console.error('An error occurred', err);
            res.state = 'KO';
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
            let deleted = {
                id: '',
                date: 0,
                title: '',
                description: '',
                links: [],
                notes: '',
            };
            const rawagenda = yield getAgenda();
            let agenda = rawagenda.data;
            for (let i = 0; i < agenda.length; i++) {
                if (id === agenda[i].id) {
                    found = i;
                    deleted = agenda[i];
                    agenda.splice(i, 1);
                }
            }
            const newAgenda = Buffer.from(JSON.stringify(agenda), 'binary');
            const params = {
                Body: newAgenda,
                Bucket: 'chiodiapaga-bucket',
                Key: 'data.json'
            };
            const putAgenda = yield s3.putObject(params).promise();
            if (found !== -1) {
                res.state = 'OK';
                res.message = 'Meeting deleted',
                    res.data = deleted;
                return res;
            }
            else {
                res.state = 'KO';
                res.message = 'Meeting not found';
                res.data = null;
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
