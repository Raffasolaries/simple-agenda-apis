/* jshint esversion: 6 */
/* jshint node: true */
;(function () {
	'use strict';
 const underTest = require('../dist/app');
	
	describe('Get Meetings Details', () => {
		var lambdaContextSpy, idMeeting = '1234';
		beforeEach(() => {
			lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
  });
  
		it('returns state OK with object data', (done) => {
   underTest.proxyRouter({
    headers: {
     'Content-Type': 'text/plain'
    },
    requestContext: {
     resourcePath: '/api/1.0/meeting/{id-meeting}',
     httpMethod: 'GET',
    },
    stageVariables: {
     lambdaVersion: 'latest'
    },
    pathParameters: {
     ['id-meeting']: idMeeting
    },
    body: null
   }, lambdaContextSpy).then(() => {
    let contextDone = lambdaContextSpy.done;
    let contextBody = lambdaContextSpy.done.calls[0].args[1].body;
    expect(contextDone).toHaveBeenCalledWith(null,
     jasmine.objectContaining({
      statusCode: 200
     }));
    //console.log('contextBody', JSON.stringify(contextBody));
    expect(contextBody).toContain('\"state\":\"OK\"');
    expect(contextBody).toContain('data');
   }).then(done, done.fail);
  });
}, 100000);
}());
