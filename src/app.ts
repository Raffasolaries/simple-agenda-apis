import ApiBuilder = require('claudia-api-builder');
import moment from 'moment';
import 'moment/locale/it';
 
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
 
export = api;