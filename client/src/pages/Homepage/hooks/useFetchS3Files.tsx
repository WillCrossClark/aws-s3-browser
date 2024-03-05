import { useState, useEffect } from "react";
import { S3File } from "../types";

const useFetchS3Files = () => {
  const [files, setFiles] = useState<S3File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchS3Files = async (): Promise<void> => {
      try {
        const response = await fetch("/api/v1/s3/files");
        if (!response.ok) {
          throw new Error("Failed to fetch S3 files");
        }
        const data: S3File[] = await response.json();
        setFiles(data);
      } catch (error) {
        setError("Error fetching S3 files");
      }
    };

    fetchS3Files();
  }, []);

  return { files, error };
};

export default useFetchS3Files;
