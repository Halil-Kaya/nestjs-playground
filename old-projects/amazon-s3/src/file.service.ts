import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import { AmazonSecret } from "./enums/amazon.secret";


@Injectable()
export class FilesService {
  constructor(
  ) {}
 
 
}