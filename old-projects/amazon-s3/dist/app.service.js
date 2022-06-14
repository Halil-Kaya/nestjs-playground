"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const crypto_1 = require("crypto");
const amazon_secret_1 = require("./enums/amazon.secret");
let AppService = class AppService {
    async upload(file) {
        console.log(file);
        const { originalname } = file;
        const bucketS3 = amazon_secret_1.AmazonSecret.AWS_BUCKET;
        const response = await this.uploadS3(file.buffer, bucketS3, originalname);
        return response;
    }
    async getUrl(fileName) {
        const s3 = this.getS3();
        var presignedPUTURL = s3.getSignedUrl('putObject', {
            Bucket: amazon_secret_1.AmazonSecret.AWS_BUCKET,
            Key: 'image/profileeee.jpeg',
            Expires: 10
        });
        return presignedPUTURL;
    }
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        console.log(s3);
        const params = {
            Bucket: bucket,
            Key: `test/${crypto_1.randomUUID()}-${String(name)}`,
            Body: file,
        };
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
        return new aws_sdk_1.S3({
            accessKeyId: amazon_secret_1.AmazonSecret.AWS_ACCESS_KEY_ID,
            secretAccessKey: amazon_secret_1.AmazonSecret.AWS_SECRET_ACCESS_KEY,
            region: amazon_secret_1.AmazonSecret.AWS_REGION
        });
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map