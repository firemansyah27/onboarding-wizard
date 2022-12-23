import React, { useContext } from "react";
import { Typography, Box, Link, Button } from "@mui/material";
import ShopeeFullIcon from "../../../../../assets/shopee-full.png";
import styles from "./ShopeeDialogContent.module.scss";
import { observer } from "mobx-react";
import StoreContext from "../../../../../stores";

export const ShopeeDialogTitle = () => {
    return (
        <Box
            component="img"
            sx={{
                height: "100%",
                maxWidth: 150,
            }}
            alt="The house from the offer."
            src={ShopeeFullIcon}
        />
    );
};

export const ShopeeDialogContent = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography className={styles.contentText}>
                Jubelio telah mendukung.{" "}
                <Link href="https://developer.Shopee.com/">
                    Open Platform dari Shopee
                </Link>
            </Typography>
            <br />
            <Typography className={styles.contentText}>
                Silahkan klik “Sambungkan” dan Anda akan diarahkan ke website
                Shopee untuk melakukan otorisasi agar Jubelio bisa terhubung
                dengan Toko anda di Shopee
            </Typography>
        </Box>
    );
};

export interface ContentProps {
    onClose: () => void;
}
export const ShopeeDialogActionContent: React.FunctionComponent<ContentProps> =
    observer(({ onClose }) => {
        const { onboardingStore } = useContext(StoreContext);

        const handleOnClick = async () => {
            onClose();
            onboardingStore.startLoading();
            await onboardingStore.generateLinkShopee();
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
                    href="https://edu.jubelio.com/documentation/menu-integrasi/integrasi-channel-penjualan-ke-jubelio/cara-integrasi-shopee-ke-jubelio/"
                >
                    Panduan Integrasi Jubelio ke Shopee
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
