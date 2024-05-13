import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { AWS_BUCKET_NAME } from "config";
import * as fs from "fs"
import { files_out } from "./types";

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
         Body: stream,
         ContentType: file.mimetype
        }
 
        const command = new PutObjectCommand(uploadParams);
        const result = await this.s3client.send(command)
        return result;
     }

     async getFiles(bucket_name: string): Promise<Array<string>>{
        const command = new ListObjectsV2Command({
            Bucket: bucket_name
        })
        const urls : Array<string> = []

        const response = await this.s3client.send(command);

        response.Contents.map((obj)=>{
            urls.push(`${process.env.AWS_URL_BUCKET}/${obj.Key}`);
        })

        return urls;
     }

     async getAllFilesInf(bucket_name: string) : Promise<Array<files_out>>{
        const command = new ListObjectsV2Command({
            Bucket: bucket_name
        });

        const response : Array<any> = (await this.s3client.send(command)).Contents;

        const newArray : Array<files_out> = [];

        response.map((rp)=>{
            newArray[newArray.length] = {
                Key: rp.Key,
                LastModified: rp.LastModified,
                size: rp.size,
                uri: `${process.env.AWS_URL_BUCKET}/${rp.Key}`
            };
        })
        
        return newArray;
     }
}