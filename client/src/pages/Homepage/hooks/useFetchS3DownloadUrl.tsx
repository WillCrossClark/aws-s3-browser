import { useState, useCallback } from "react";
import { DownloadUrlResponse } from "../types";

const useFetchS3DownloadUrl = () => {
  const [error, setError] = useState<string | null>(null);

  const fetchS3DownloadUrl = useCallback(
    async (key: string): Promise<string | undefined> => {
      try {
        const response = await fetch(
          `/api/v1/s3/files/download/${encodeURIComponent(key)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch S3 download URL");
        }
        const data: DownloadUrlResponse = await response.json();
        return data.downloadUrl;
      } catch (error) {
        setError("Error fetching download URL");
        return undefined;
      }
    },
    []
  );

  return { fetchS3DownloadUrl, error };
};

export default useFetchS3DownloadUrl;
