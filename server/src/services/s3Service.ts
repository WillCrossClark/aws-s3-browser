import { Service } from "typedi";
import AWS from "aws-sdk";

@Service()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.s3 = new AWS.S3();
  }

  public async listFiles(
    bucketName: string
  ): Promise<AWS.S3.ObjectList | undefined> {
    const params = {
      Bucket: bucketName,
    };

    try {
      const data = await this.s3.listObjectsV2(params).promise();
      return data.Contents;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch S3 files");
    }
  }

  public async generateDownloadUrl(
    bucketName: string,
    fileName: string
  ): Promise<string> {
    const decodedFileName = decodeURIComponent(fileName);
    const filenameForContentDisposition = decodedFileName.split("/").pop();

    const params = {
      Bucket: bucketName,
      Key: decodedFileName,
      Expires: 60,
      ResponseContentDisposition: `attachment; filename="${filenameForContentDisposition}"`,
    };

    try {
      const url = await this.s3.getSignedUrlPromise("getObject", params);
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to generate S3 download URL");
    }
  }
}
