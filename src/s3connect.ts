import AWS = require('aws-sdk');
import Response  from './interfaces/Response';
import Meeting from './interfaces/Meeting';
import { callbackify } from 'util';

const credentials = new AWS.SharedIniFileCredentials({profile: 'raffasolaries'});
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

const params = {
 Bucket: 'chiodiapaga-bucket',
 Key: 'data.json'
};

const res: Response = {
 state: 'KO',
 message: '',
 data: null
};

export async function getAgenda(): Promise<any> {
 console.log('getAgenda start', params);
 try {
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

