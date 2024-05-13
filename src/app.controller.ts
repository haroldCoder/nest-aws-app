import { Bind, Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { extname } from 'path';
import { S3Service } from './s3.service';
import { AWS_BUCKET_NAME } from 'config';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly s3service: S3Service) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/get/number")
  @Bind(Res())
  getNumber(res, @Query("num") num: number): void {
    if (num == 2) {
      res.status(HttpStatus.OK).json({ "msg": this.appService.getNumberUser(), status: HttpStatus.OK, key: process.env.AWS_BUCKET_NAME })
    }
    else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    })
  }))
  @Bind(Res(), UploadedFile())
  async uploadFiles3(res, file): Promise<void> {
    try {
      const result = await this.s3service.uploadFile(file, process.env.AWS_BUCKET_NAME);
      res.status(HttpStatus.OK).json(result)
    }
    catch(err){
      console.log(err)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: "Internal error with s3 bucket"})
    }
  }

  @Get("/files")
  @Bind(Res())
  async getFiles(res): Promise<void>{
    try{
      const result = await this.s3service.getFiles(process.env.AWS_BUCKET_NAME);
      res.status(HttpStatus.OK).send(result);
    }
    catch(err){
      console.log(err);
      
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: "Internal error with s3 bucket"})
    }
  }

  @Get("/files/extra-info")
  @Bind(Res())
  async getFilesExtra(res: Response): Promise<void>{
    try{
      const result = await this.s3service.getAllFilesInf(process.env.AWS_BUCKET_NAME);
      res.status(HttpStatus.OK).send(result);
    }
    catch(err){
      console.log(err);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: "Internal error with s3 bucket"})
      
    }
  }
}
