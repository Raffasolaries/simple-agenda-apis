import ApiBuilder = require('claudia-api-builder');
import moment from 'moment';
import 'moment/locale/it';
import getMeetingDetails from './apis/get-meeting-details';
import addMeeting from './apis/add-meeting';
import dropMeeting from './apis/delete-meeting';
import getWeek from './apis/get-meeting-week';
// import addMeeting from './apis/add-meeting';
 
const api = new ApiBuilder();

api.get('/api/1.0/meeting/{id-meeting}', async function (request: Object) {
 return await getMeetingDetails(request);
});

api.delete('/api/1.0/meeting/{id-meeting}', async function (request: Object) {
 return await dropMeeting(request);
});

api.get('/api/1.0/meeting-week/{from}', async function (request: Object) {
 return await getWeek(request);
});

api.post('/api/1.0/meeting', async function (request: Object) {
 return await addMeeting(request);
});
 
export = api;