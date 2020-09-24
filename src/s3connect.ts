import AWS = require('aws-sdk');
import Response  from './interfaces/Response';
import Meeting from './interfaces/Meeting';

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

export async function getData() {
 return s3.getObject(params, function (err: any, rawdata: any): Response {
  if (err) {
   res.message = 'getObject error';
   res.data = err
   return res;
  }
  const data: Meeting[] = JSON.parse(rawdata.Body); 
  //const file: any = data.Body;
  res.state = 'OK';
  res.message = 'Object retrieved';
  res.data = data;
  return res;
 });
}

