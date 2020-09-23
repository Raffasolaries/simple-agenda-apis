import Response from '../interfaces/Response';
import * as data from '../data.json';

const getMeetingDetails = function (request: any) {
 return new Promise(function(reject, resolve) {
  const res: Response = {
   state: 'KO',
   message: '',
   data: null
  };
  if (!request['pathParams']['id-meeting']) {
   res.message = 'Missing meeting id'
   return reject(res);
  }
  const result = data.filter(item => item.id === request['pathParams']['id-meeting']);
  if (result.length === 0) {
   res.message = 'No Matched meeting';
  } else {
   res.state = 'OK',
   res.message = 'Found meeting',
   res.data = result[0];
  }
  return resolve(res);
 });
};

export = getMeetingDetails;