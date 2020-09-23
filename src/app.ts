import ApiBuilder = require('claudia-api-builder');
 
const api = new ApiBuilder();
 
api.get('/hello', function () {
 return 'hello world';
});

api.get('/api/1.0/request', function (request: Object) {
 return request;
});
 
export = api;