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
  res.message = 'KO';
  res.message = 'getObject error';
  res.data = err
  return res;
 }
}

export async function putMeeting(meeting: Meeting): Promise<any> {
 try {
  const rawagenda = await getAgenda();
  const meetingData: Meeting = {
   id: uuid(),
   date: meeting.date,
   title: meeting.title,
   description: meeting.description,
   links: meeting.links,
   notes: meeting.notes
  };
  rawagenda.data.push(meetingData);
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
  res.state = 'KO';
  res.message = 'putMeeting error';
  res.data = err
  return res;
 }
}

export async function deleteMeeting(id: string): Promise<any> {
 try {
  let found: number = -1;
  let deleted: Meeting = {
   id: '',
   date: '',
   title: '',
   description: '',
   links: [],
   notes: '',
  };
  const rawagenda = await getAgenda();
  let agenda = rawagenda.data;
  for (let i=0;i<agenda.length;i++) {
   if (id === agenda[i].id) {
    found = i;
    deleted = agenda[i];
    agenda.splice(i,1);
   }
  }
  const newAgenda: Buffer = Buffer.from(JSON.stringify(agenda), 'binary');
  const params = {
   Body: newAgenda,
   Bucket: 'chiodiapaga-bucket',
   Key: 'data.json'
  };
  const putAgenda = await s3.putObject(params).promise();
  if (found !== -1) {
   res.state = 'OK';
   res.message = 'Meeting deleted',
   res.data = deleted;
   return res;
  } else {
   res.state = 'KO';
   res.message = 'Meeting not found';
   res.data = null;
   return res;
  }
 } catch (err) {
  console.error('An error occurred', err);
  res.message = 'deleteMeeting error';
  res.data = err
  return res;
 }
}

