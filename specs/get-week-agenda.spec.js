/* jshint esversion: 6 */
/* jshint node: true */
;(function () {
	'use strict';
 const underTest = require('../dist/app'),
  moment = require('moment');
	
	describe('Get week agenda', () => {
		var lambdaContextSpy, from = moment().subtract(1, 'days').format('X');
		beforeEach(() => {
			lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
  });
  
		it('returns the week agenda starting from yesterday', (done) => {
   underTest.proxyRouter({
    headers: {
     'Content-Type': 'text/plain'
    },
    requestContext: {
     resourcePath: '/api/1.0/meeting-week/{from}',
     httpMethod: 'GET',
    },
    stageVariables: {
     lambdaVersion: 'latest'
    },
    pathParameters: {
     from: from
    },
    body: null
   }, lambdaContextSpy).then(() => {
    let contextDone = lambdaContextSpy.done;
    let contextBody = lambdaContextSpy.done.calls[0].args[1].body;
    expect(contextDone).toHaveBeenCalledWith(null,
     jasmine.objectContaining({
      statusCode: 200
     }));
    console.log('get week agenda contextBody', contextBody);
    expect(contextBody).toContain('\"state\":\"OK\"');
    expect(contextBody).toContain('data');
   }).then(done, done.fail);
  });
}, 100000);
}());
