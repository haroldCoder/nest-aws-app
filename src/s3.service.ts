import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { AWS_BUCKET_NAME } from "config";
import * as fs from "fs"

@Injectable()
export class S3Service{
    protected s3client;

    constructor(){
        console.log(AWS_BUCKET_NAME);
  
        this.s3client = new S3Client({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_PUBLIC_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        })
    }

    async uploadFile(file: Buffer | any, bucket_name: string): Promise<void>{
        const stream = fs.createReadStream(`${file.destination}/${file.filename}`);
        const uploadParams = {
         Bucket: bucket_name,
         Key: file.originalname,
         Body: stream
        }
 
        const command = new PutObjectCommand(uploadParams);
        const result = await this.s3client.send(command)
        return result;
     }

     async getFiles(bucket_name: string, key: string): Promise<string>{
        const command = new GetObjectCommand({
            Bucket: bucket_name,
            Key: key
        })

        const response = await getSignedUrl(this.s3client, command);
        return response
     }
}