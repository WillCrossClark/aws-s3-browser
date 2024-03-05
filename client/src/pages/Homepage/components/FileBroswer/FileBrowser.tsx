import React, { useState, useCallback } from "react";
import { Paper, TablePagination } from "@mui/material";
import styles from "./FileBroswer.module.css";
import SearchField from "../SearchField/SearchField";
import FileTable from "../FileTable/FileTable";
import useFetchS3Files from "../../hooks/useFetchS3Files";
import useFetchS3DownloadUrl from "../../hooks/useFetchS3DownloadUrl";

const FileBrowser: React.FC = () => {
  const { files, error: filesError } = useFetchS3Files();
  const { fetchS3DownloadUrl, error: downloadError } = useFetchS3DownloadUrl();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = useCallback(
    async (key: string) => {
      try {
        const downloadUrl = await fetchS3DownloadUrl(key);
        if (downloadUrl) {
          window.location.href = downloadUrl;
        }
      } catch (error) {
        console.error("Error fetching download URL", error);
      }
    },
    [fetchS3DownloadUrl]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.Key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentFiles = filteredFiles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const error = filesError || downloadError;
  if (error) {
    return <Paper className={styles.errorContainer}>{error}</Paper>;
  }

  return (
    <Paper className={styles.container}>
      <SearchField onChange={handleSearchChange} />
      <FileTable files={currentFiles} onDownload={handleDownload} />
      <div className={styles.paginationContainer}>
        <TablePagination
          count={filteredFiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
};

export default FileBrowser;
