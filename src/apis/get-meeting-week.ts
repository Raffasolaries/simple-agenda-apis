import Response from '../interfaces/Response';
import Meeting from '../interfaces/Meeting';
//import * as rawdata from '../data.json';
import { getWeekAgenda } from '../s3connect';

const getWeek = async function (request: any) {
 const res: Response = {
  state: 'KO',
  message: '',
  data: null
 };
 if (!request['pathParams']['from']) {
  res.message = 'Missing start date'
  return res;
 }
 const weekData: Response = await getWeekAgenda(+request['pathParams']['from']);
 return weekData;
};

export = getWeek;