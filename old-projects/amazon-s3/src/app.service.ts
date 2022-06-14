import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { AmazonSecret } from './enums/amazon.secret';

@Injectable()
export class AppService {

  async upload(file) {
    console.log(file)
    const { originalname } = file;
    const bucketS3 = AmazonSecret.AWS_BUCKET;
    const response = await this.uploadS3(file.buffer, bucketS3, originalname);
    return response
  }

  async getUrl(fileName : string){
    const s3 = this.getS3();
    
    var presignedPUTURL = s3.getSignedUrl('putObject', {
      Bucket: AmazonSecret.AWS_BUCKET,
      Key: 'image/profileeee.jpeg', //filename
      Expires: 10 //time to expire in seconds
    });

    return presignedPUTURL;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    console.log(s3)
    const params = {
        Bucket: bucket,
        Key: `test/${randomUUID()}-${String(name)}`,
        Body: file,
      }
    
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: AmazonSecret.AWS_ACCESS_KEY_ID,
      secretAccessKey: AmazonSecret.AWS_SECRET_ACCESS_KEY,
      region : AmazonSecret.AWS_REGION
    });
  }
}
