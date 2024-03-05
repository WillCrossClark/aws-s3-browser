import { Router } from "express";
import { S3Controller } from "../controllers/s3Controller";

export default class S3Router {
  static createRouter(): Router {
    const router = Router();
    const s3Controller = new S3Controller();

    router
      .get("/s3/files", s3Controller.getFiles)
      .get("/s3/files/download/:fileName", s3Controller.getDownloadUrl);

    return router;
  }
}
