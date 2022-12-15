import React from "react";
import Typography from "@mui/material/Typography";
import styles from "./PopoverContent1.module.scss";
const PopoverContent1 = () => {
  return (
    <>
      <Typography className={styles.content1}>Opps!</Typography>
      <Typography className={styles.content1Detail}>
        Anda belum dapat melanjutkan step jika belum melengkapi data informasi
        perusahaan.
      </Typography>
    </>
  );
};

export default PopoverContent1;
