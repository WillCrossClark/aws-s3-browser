import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { S3Service } from "../services/s3Service";

export class S3Controller {
  private s3Service: S3Service;

  constructor() {
    this.s3Service = Container.get(S3Service);
  }

  public getFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bucketName = process.env.AWS_BUCKET_NAME!;
      const files = await this.s3Service.listFiles(bucketName);
      res.json(files);
    } catch (error) {
      console.error("Failed to get files:", error);
      next(error);
    }
  };

  public getDownloadUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bucketName = process.env.AWS_BUCKET_NAME!;
      const fileName = req.params.fileName;
      const url = await this.s3Service.generateDownloadUrl(
        bucketName,
        fileName
      );
      res.json({ downloadUrl: url });
    } catch (error) {
      console.error("Failed to generate download URL:", error);
      next(error);
    }
  };
}
