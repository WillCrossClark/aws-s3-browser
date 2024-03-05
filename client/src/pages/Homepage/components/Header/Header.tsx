import React from "react";
import { Typography } from "@mui/material";
import s3Logo from "../../../../assets/s3-logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Typography variant="h5" className={styles.title}>
        AWS Bucket File Browser
      </Typography>
      <img src={s3Logo} alt="AWS S3 Logo" className={styles.logo} />
    </div>
  );
};

export default Header;
