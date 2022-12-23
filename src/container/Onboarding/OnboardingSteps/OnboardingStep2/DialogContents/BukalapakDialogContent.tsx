import React, { useContext } from "react";
import { Typography, Box, Link, Button } from "@mui/material";
import BukalapakFullIcon from "../../../../../assets/bukalapak-full.png";
import styles from "./BukalapakDialogContent.module.scss";
import { observer } from "mobx-react";
import StoreContext from "../../../../../stores";

export const BukalapakDialogTitle = () => {
    return (
        <Box
            component="img"
            sx={{
                height: "100%",
                maxWidth: 200,
            }}
            alt="The house from the offer."
            src={BukalapakFullIcon}
        />
    );
};

export const BukalapakDialogContent = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography className={styles.linkOpernApi}>
                <Link href="https://developer.bukalapak.com/">
                    Jubelio mendukung API terbaru Bukalapak
                </Link>
            </Typography>
            <br />
            <Typography className={styles.contentText}>
                Jubelio memerlukan ijin Anda untuk terhubung dengan API terbaru
                Bukalapak.
            </Typography>
            <Typography className={styles.contentText}>
                Silahkan masukkan email dan password Bukalapak anda di halaman
                tersebut untuk memberi ijin akses pada Jubelio. Otorisasi akan
                dilakukan oleh pihak Bukalapak dan kami tidak menyimpan password
                anda pada sistem kami. Klik “Sambungkan” dan browser akan
                diarahkan ke website Bukalapak.
            </Typography>
            <br />
            <Typography className={styles.contentText}>
                Klik “Sambungkan” dan browser akan diarahkan ke website
                Bukalapak.
            </Typography>
        </Box>
    );
};

export interface ContentProps {
    onClose: () => void;
}

export const BukalapakDialogActionContent: React.FunctionComponent<ContentProps> =
    observer(({ onClose }) => {
        const { onboardingStore } = useContext(StoreContext);

        const handleOnClick = async () => {
            onClose();
            onboardingStore.finishedLoading();
            await onboardingStore.generateLinkBukalapak();
            onboardingStore.finishedLoading();
        };

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    p: 2,
                }}
            >
                <Link
                    className={styles.actionContentText}
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://edu.jubelio.com/documentation/menu-integrasi/integrasi-channel-penjualan-ke-jubelio/cara-integrasi-bukalapak-ke-jubelio/"
                >
                    Panduan Integrasi Jubelio ke Bukalapak
                </Link>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="primary"
                    onClick={handleOnClick}
                >
                    Sambungkan
                </Button>
            </Box>
        );
    });
