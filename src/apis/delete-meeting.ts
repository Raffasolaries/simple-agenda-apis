import Response from '../interfaces/Response';
//import * as rawdata from '../data.json';
import { deleteMeeting } from '../s3connect';

const dropMeeting = async function (request: any) {
 const res: Response = {
  state: 'KO',
  message: '',
  data: null
 };
 if (!request['pathParams']['id-meeting']) {
  res.message = 'Missing meeting id'
  return res;
 }
 const idMeeting = request['pathParams']['id-meeting'];
 const resAdded: Response = await deleteMeeting(idMeeting);
 return resAdded;
};

export = dropMeeting;