/* jshint esversion: 6 */
/* jshint node: true */
;(function () {
	'use strict';
 const underTest = require('../dist/app'),
  moment = require('moment');
	
	describe('Creates new meeting & deletes it', () => {
		var lambdaContextSpy, idMeeting = '', meeting = {
   date: moment().add(1, 'days').format('X'),
   title: 'Test Meeting',
   description: 'Jasmine Unit test sending data',
   links: ['https://jasmine.github.io'],
   notes: 'the meeting starts tomorrow at the same hour'
  };
		beforeEach(() => {
			lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
  });
  
		it('Creates the meeting returns state OK with object data', (done) => {
   underTest.proxyRouter({
    headers: {
     'Content-Type': 'application/json'
    },
    requestContext: {
     resourcePath: '/api/1.0/meeting',
     httpMethod: 'POST',
    },
    stageVariables: {
     lambdaVersion: 'latest'
    },
    pathParameters: null,
    body: meeting
   }, lambdaContextSpy).then(() => {
    let contextDone = lambdaContextSpy.done;
    let contextBody = lambdaContextSpy.done.calls[0].args[1].body;
    expect(contextDone).toHaveBeenCalledWith(null,
     jasmine.objectContaining({
      statusCode: 200
     }));
    console.log('create meeting contextBody', contextBody);
    idMeeting = JSON.parse(contextBody).data.meeting.id;
    expect(contextBody).toContain('\"state\":\"OK\"');
    expect(contextBody).toContain('data');
   }).then(done, done.fail);
  });

  it('Deletes the previously created meeting & returns OK with the deleted meeting data', (done) => {
   underTest.proxyRouter({
    headers: {
     'Content-Type': 'text/plain'
    },
    requestContext: {
     resourcePath: '/api/1.0/meeting/{id-meeting}',
     httpMethod: 'DELETE',
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
    console.log('delete meeting contextBody', contextBody);
    expect(contextBody).toContain('\"state\":\"OK\"');
    expect(contextBody).toContain('data');
   }).then(done, done.fail);
  });
}, 100000);
}());
