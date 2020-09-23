import ApiBuilder = require('claudia-api-builder');
import moment from 'moment';
import 'moment/locale/it';
import getMeetingDetails from './apis/get-meeting-details';
 
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

api.get('/api/1.0/meeting/{id-meeting}', function (request: Object) {
 return getMeetingDetails(request).then(res => res);
});
 
export = api;