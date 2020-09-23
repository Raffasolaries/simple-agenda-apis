import S3 = require('aws-sdk/clients/s3');
import Response  from './interfaces/Response';
import Meeting from './interfaces/Meeting';

export class S3Connect {
 private s3 = new S3({
  accessKeyId: 'AKIAW7WMUAANVPOWRFWJ',
  secretAccessKey: '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',
  region: 'eu-west-3'
 });

 private params = {
  Bucket: 'chiodiapaga-bucket',
  Key: 'data.json'
 };

 constructor() {}

 async getData() {
  return this.s3.getObject(this.params, function (err: any, rawdata: any): Response {
   const res: Response = {
    state: 'KO',
    message: '',
    data: null
   };
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
}


export {
 getData
}


