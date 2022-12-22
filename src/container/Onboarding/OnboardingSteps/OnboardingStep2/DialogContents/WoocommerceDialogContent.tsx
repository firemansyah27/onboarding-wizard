import React, { useContext } from "react";
import {
    Typography,
    Box,
    Link,
    Button,
    TextField,
    Autocomplete,
} from "@mui/material";
import WoocommerceFullIcon from "../../../../../assets/woocommerce-full.png";
import styles from "./WoocommerceDialogContent.module.scss";
import InputGrid from "../../../../../components/InputGrid/InputGrid";
import { useFormik } from "formik";
import StoreContext from "../../../../../stores";
import { observer } from "mobx-react";
import * as yup from "yup";

export const WoocommerceDialogTitle = () => {
    return (
        <Box
            component="img"
            sx={{
                height: "100%",
                maxWidth: 150,
            }}
            alt="The house from the offer."
            src={WoocommerceFullIcon}
        />
    );
};

export interface ContentProps {
    onClose: () => void;
}

export const WoocommerceDialogContent: React.FunctionComponent<
    ContentProps
> = ({ onClose }) => {
    const { onboardingStore } = useContext(StoreContext);

    const validationSchema = yup.object({
        host: yup.string().required(),
        key: yup.string().required(),
        secret: yup.string().required(),
        version: yup.string().required(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            host: "",
            key: "",
            secret: "",
            version: "v3",
            is_use_custom_order_status: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onClose();
            onboardingStore.connectWoocommerce(values);
        },
    });
    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
            <Typography className={styles.contentText}>
                Integrasi dengan WooCommerce memerlukan kustomisasi dari sisi
                kami. Harap hubungi info@jubelio.com untuk info lebih lanjut
            </Typography>
            <Box sx={{ mt: 3 }}>
                <form
                    id="woocommerce-form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <InputGrid
                        label={
                            <Typography
                                className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                            >
                                Alamat Webstore
                            </Typography>
                        }
                        input={
                            <TextField
                                inputProps={{
                                    className: styles.inputField,
                                }}
                                id="host"
                                name="host"
                                placeholder={"Alamat Webstore"}
                                aria-describedby="host-text"
                                value={formik.values.host}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.host &&
                                    Boolean(formik.errors.host)
                                }
                            />
                        }
                    />
                    <InputGrid
                        label={
                            <Typography
                                className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                            >
                                API Key
                            </Typography>
                        }
                        input={
                            <TextField
                                inputProps={{
                                    className: styles.inputField,
                                }}
                                id="key"
                                name="key"
                                placeholder={"API Key"}
                                aria-describedby="key-text"
                                value={formik.values.key}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.key &&
                                    Boolean(formik.errors.key)
                                }
                            />
                        }
                    />
                    <InputGrid
                        label={
                            <Typography
                                className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                            >
                                API Secret
                            </Typography>
                        }
                        input={
                            <TextField
                                inputProps={{
                                    className: styles.inputField,
                                }}
                                id="secret"
                                name="secret"
                                placeholder={"API Secret"}
                                aria-describedby="secret-text"
                                value={formik.values.secret}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.secret &&
                                    Boolean(formik.errors.secret)
                                }
                            />
                        }
                    />
                    <InputGrid
                        label={
                            <Typography
                                className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                            >
                                Version
                            </Typography>
                        }
                        input={
                            <Autocomplete
                                id="version-autocomplete"
                                disabled
                                value={
                                    formik.values.version != ""
                                        ? formik.values.version
                                        : null
                                }
                                aria-describedby="version-text"
                                onChange={(e, v) => {
                                    formik.setFieldValue("version", v || "");
                                }}
                                disablePortal
                                options={["v3"]}
                                onFocus={formik.handleChange}
                                renderOption={(props, option) => (
                                    <li {...props}>{option}</li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        name="version"
                                        placeholder={"Pilih Kecamatan"}
                                        error={
                                            formik.touched.version &&
                                            Boolean(formik.errors.version)
                                        }
                                        className={styles.dropDownInput}
                                        {...params}
                                    />
                                )}
                            />
                        }
                    />
                </form>
            </Box>
        </Box>
    );
};

export const WoocommerceDialogActionContent = () => {
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
                href="https://edu.jubelio.com/documentation/menu-integrasi/integrasi-channel-penjualan-ke-jubelio/cara-integrasi-Woocommerce-ke-jubelio/"
            >
                Panduan Integrasi Jubelio ke Woocommerce
            </Link>
            <Button
                sx={{ textTransform: "none" }}
                form="woocommerce-form"
                type="submit"
                variant="contained"
                color="primary"
            >
                Sambungkan
            </Button>
        </Box>
    );
};
