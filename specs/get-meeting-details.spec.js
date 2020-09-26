/* jshint esversion: 6 */
/* jshint node: true */
;(function () {
	'use strict';
 const underTest = require('../dist/app');
	
	describe('Gets meeting details', () => {
		var lambdaContextSpy, idMeeting = '449774a3-0cbe-49b2-89f5-2df57e648d22';
		beforeEach(() => {
			lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
  });
  
		it('returns a meeting detail with object data', (done) => {
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
    console.log('get meeting contextBody', contextBody);
    expect(contextBody).toContain('\"state\":\"OK\"');
    expect(contextBody).toContain('data');
   }).then(done, done.fail);
  });
}, 100000);
}());
