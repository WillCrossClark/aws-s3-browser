import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { S3File } from "./types";
import styles from "./FileTable.module.css";
import formatBytes from "../../utils/formatBytes";

interface FileTableProps {
  files: S3File[];
  onDownload: (key: string) => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, onDownload }) => (
  <Table className={styles.container}>
    <TableHead>
      <TableRow>
        <TableCell className={styles.tableCell}>File Name</TableCell>
        <TableCell className={styles.tableCell}>Last Modified</TableCell>
        <TableCell className={styles.tableCell}>Size</TableCell>
        <TableCell className={styles.tableCell}></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {files.map((file) => (
        <TableRow key={file.Key}>
          <TableCell>{file.Key}</TableCell>
          <TableCell>{file.LastModified}</TableCell>
          <TableCell>{formatBytes(file.Size)}</TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onDownload(file.Key)}
            >
              Download
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default FileTable;
