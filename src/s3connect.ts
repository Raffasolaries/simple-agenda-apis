import AWS = require('aws-sdk');
import { v4 as uuid } from 'uuid';
import Response  from './interfaces/Response';
import Meeting from './interfaces/Meeting';


const credentials = new AWS.SharedIniFileCredentials({profile: 'raffasolaries'});
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

const res: Response = {
 state: 'KO',
 message: '',
 data: null
};

export async function getAgenda(): Promise<any> {
 try {
  const params = {
   Bucket: 'chiodiapaga-bucket',
   Key: 'data.json'
  };
  const rawdata: any = await s3.getObject(params).promise();
  const data: Meeting[] = JSON.parse(rawdata.Body);
  res.state = 'OK';
  res.message = 'Object retrieved';
  res.data = data;
  return res;
 } catch (err) {
  console.error('An error occurred', err);
  res.message = 'getObject error';
  res.data = err
  return res;
 }
}

export async function putMeeting(meeting: Meeting): Promise<any> {
 try {
  let rawagenda = await getAgenda();
  for (let i=0;i<rawagenda.data.length;i++) {
   rawagenda.data[i].id = uuid();
  }
  meeting.id = uuid();
  rawagenda.data.push(meeting);
  const newAgenda: Buffer = Buffer.from(JSON.stringify(rawagenda.data), 'binary');
  const params = {
   Body: newAgenda,
   Bucket: 'chiodiapaga-bucket',
   Key: 'data.json'
  };
  const putAgenda = await s3.putObject(params).promise();
  res.state = 'OK',
  res.message = 'Agenda updated',
  res.data = putAgenda;
  return res;
 } catch (err) {
  console.error('An error occurred', err);
  res.message = 'putMeeting error';
  res.data = err
  return res;
 }
}

export async function deleteMeeting(id: string): Promise<any> {
 try {
  let found: number = -1;
  const rawagenda = await getAgenda();
  for (let i=0;i<rawagenda.data.length;i++) {
   if (id === rawagenda.data[i].id) {
    found = i;
    rawagenda.data.splice(i,1);
   }
  }
  const newAgenda: Buffer = Buffer.from(JSON.stringify(rawagenda.data), 'binary');
  const params = {
   Body: newAgenda,
   Bucket: 'chiodiapaga-bucket',
   Key: 'data.json'
  };
  const putAgenda = await s3.putObject(params).promise();
  if (found !== -1) {
   res.state = 'OK';
   res.message = 'Meeting deleted',
   res.data = rawagenda.data[found];
   return res;
  } else {
   res.message = 'Meeting not found';
   return res;
  }
 } catch (err) {
  console.error('An error occurred', err);
  res.message = 'deleteMeeting error';
  res.data = err
  return res;
 }
}

