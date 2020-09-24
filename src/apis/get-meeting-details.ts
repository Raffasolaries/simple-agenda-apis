import Response from '../interfaces/Response';
import Meeting from '../interfaces/Meeting';
//import * as rawdata from '../data.json';
import { getAgenda } from '../s3connect';

const getMeetingDetails = async function (request: any) {
 const res: Response = {
  state: 'KO',
  message: '',
  data: null
 };
 const meetingsData: Response = await getAgenda();
 if (!request['pathParams']['id-meeting']) {
  res.message = 'Missing meeting id'
  return res;
 }
 if (Array.isArray(meetingsData.data)) {
  const result = meetingsData.data.filter(function (item: Meeting) { return item.id === request['pathParams']['id-meeting']; });
  if (result.length === 0) {
   res.message = 'No Matched meeting';
  } else {
   res.state = 'OK',
   res.message = 'Found meeting',
   res.data = result[0];
  }
  return res;
 } else {
  return meetingsData;
 }
};

export = getMeetingDetails;