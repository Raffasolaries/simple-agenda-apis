import ApiBuilder = require('claudia-api-builder');
import moment from 'moment';
import 'moment/locale/it';
import getMeetingDetails from './apis/get-meeting-details';
// import addMeeting from './apis/add-meeting';
 
const api = new ApiBuilder();
 
api.get('/hello', function () {
 return 'hello world';
});

api.get('/api/1.0/tomorrow', function (request: Object) {
 return {
  request: request,
  tomorrow: moment().add(1, 'days').format('X')
 };
});

api.get('/api/1.0/meeting/{id-meeting}', async function (request: Object) {
 return await getMeetingDetails(request);
});

api.get('/api/1.0/meeting-week', async function (request: Object) {
 return await getMeetingDetails(request);
});

api.put('/api/1.0/meeting', async function (request: Object) {
 return await getMeetingDetails(request);
});
 
export = api;