export interface S3File {
  Key: string;
  LastModified: string;
  Size: number;
}

export interface DownloadUrlResponse {
  downloadUrl: string;
}
