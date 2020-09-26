import moment from 'moment';
import 'moment/locale/it';
import Response from '../interfaces/Response';
import Meeting from '../interfaces/Meeting';
//import * as rawdata from '../data.json';
import { putMeeting } from '../s3connect';

const addMeeting = async function (request: any) {
 const body = request.body;
 const res: Response = {
  state: 'KO',
  message: '',
  data: null
 };
 if (!body.date || !body.title) {
  res.message = 'Missing required parameters';
  return res;
 }
 const now = moment().unix();
 if (!moment(body.date,'X',true).isValid() || moment.unix(now).diff(moment.unix(body.date)) > 0) {
  res.message = 'Invalid date';
  return res;
 }
 const meeting: Meeting = {
  date: body.date,
  title: body.title,
  description: body.description && typeof body.description === 'string' ? body.description : '',
  links: body.links && Array.isArray(body.links) ? body.links : [],
  notes: body.notes && typeof body.notes === 'string' ? body.notes : ''
 };
 const resAdded: Response = await putMeeting(meeting);
 return resAdded;
};

export = addMeeting;