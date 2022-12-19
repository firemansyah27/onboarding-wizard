import React, {
    useState,
    useContext,
    useEffect,
    ChangeEvent,
    useRef,
} from "react";
import {
    Box,
    FormControl,
    Typography,
    FormControlLabel,
    Grid,
    RadioGroup,
    Radio,
    Button,
    TextField,
    Autocomplete,
} from "@mui/material";
import styles from "./OnboardingStep1.module.scss";
import Divider from "@mui/material/Divider";
import InputGrid from "../../../../components/InputGrid/InputGrid";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CustomDialogs from "../../../../components/Dialog/Dialog";
import CustomButton from "../../../../components/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import StoreContext from "../../../../stores";
import { observer } from "mobx-react";
import * as yup from "yup";

type AccountSetting = "0" | "1" | "2";

interface Props {
    submitRef1?: React.LegacyRef<HTMLButtonElement> | undefined;
}

interface CompanyData {
    company_name: string | null;
    website: string | null;
    npwp: string | null;
}

interface ProvincesData {
    province_id: string;
    name: string;
}

const OnboardingStep1: React.FunctionComponent<Props> = ({ submitRef1 }) => {
    const [stateValue, setStateValue] = useState<ProvincesData>({
        name: "",
        province_id: "",
    });
    const [open, setOpen] = useState(false);
    const { onboardingStore } = useContext(StoreContext);

    useEffect(() => {
        onboardingStore.getProfileData();
    }, []);

    const handleChangeAccounting = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onboardingStore.setAccountingSetting(
            (event.target as HTMLInputElement).value as AccountSetting
        );
    };

    const handleOnClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const validationSchemaProfile = yup.object({
        company_name: yup.string().required(),
        website: yup.string(),
        npwp: yup.string(),
    });

    const formikProfile = useFormik({
        enableReinitialize: true,
        initialValues: onboardingStore.profileData,
        validationSchema: validationSchemaProfile,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const validationSchemaAddress = yup.object({
        address: yup.string().required(),
        district: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        postcode: yup.string().required(),
        country: yup.string().required(),
    });

    const formikAddress = useFormik({
        enableReinitialize: true,
        initialValues: onboardingStore.profileData,
        validationSchema: validationSchemaAddress,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            onboardingStore.onSubmitFormAddress(values);
            onboardingStore.setAdress(values);
            handleOnClose();
        },
    });

    const provinces = () => {
        return onboardingStore.provincesData.map((item) => {
            return item["name"];
        });
    };
    const cities = () => {
        return onboardingStore.citiesData.map((item) => {
            return item["name"];
        });
    };
    const districts = () => {
        return onboardingStore.districtsData.map((item) => {
            return item["name"];
        });
    };

    return (
        <Box className={styles.step1Container}>
            <Typography className={styles.title}>
                Informasi Perusahaan
            </Typography>
            <Typography className={styles.titleDescription}>
                Lengkapi informasi umum perusahaan dan tentukan pencatatan
                keuangan Anda.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography className={styles.generatlInformation}>
                Informasi Umum
            </Typography>
            <Grid className={styles.formContainer} container spacing={2}>
                <Grid item xs={9}>
                    <form onSubmit={formikProfile.handleSubmit} noValidate>
                        <InputGrid
                            label={
                                <Typography
                                    className={`${styles.inputLabel} ${styles.requiredField}`}
                                >
                                    Nama Perusahaan
                                </Typography>
                            }
                            input={
                                <TextField
                                    inputProps={{
                                        className: styles.inputField,
                                    }}
                                    id="company_name"
                                    name="company_name"
                                    placeholder={"Masukkan nama perusahaan"}
                                    aria-describedby="company-name-text"
                                    value={formikProfile.values.company_name}
                                    onChange={formikProfile.handleChange}
                                    onBlur={() =>
                                        onboardingStore.updateProfileData(
                                            "company_name",
                                            formikProfile.values.company_name
                                        )
                                    }
                                    error={
                                        formikProfile.touched.company_name &&
                                        Boolean(
                                            formikProfile.errors.company_name
                                        )
                                    }
                                />
                            }
                        />
                        <InputGrid
                            label={
                                <Typography className={styles.inputLabel}>
                                    Website
                                </Typography>
                            }
                            input={
                                <TextField
                                    inputProps={{
                                        className: styles.inputField,
                                    }}
                                    id="website"
                                    name="website"
                                    placeholder={"Masukkan situs website"}
                                    aria-describedby="website-text"
                                    value={formikProfile.values.website}
                                    onChange={formikProfile.handleChange}
                                />
                            }
                        />
                        <InputGrid
                            label={
                                <Typography className={styles.inputLabel}>
                                    NPWP
                                </Typography>
                            }
                            input={
                                <TextField
                                    inputProps={{
                                        className: styles.inputField,
                                    }}
                                    id="npwp"
                                    name="npwp"
                                    placeholder={"Masukkan no. NPWP"}
                                    aria-describedby="npwp-text"
                                    value={formikProfile.values.npwp}
                                    onChange={formikProfile.handleChange}
                                />
                            }
                        />
                        <button
                            ref={submitRef1}
                            type="submit"
                            style={{ display: "none" }}
                        />
                    </form>
                </Grid>
                <Grid item xs={3} className={styles.uploadImageContainer}>
                    <Box className={styles.uploadImage}>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            style={{ display: "none" }}
                            id="contained-button-file"
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ) => {
                                if (!event.target.files) return;
                                onboardingStore.setImage(event.target.files[0]);
                            }}
                        />
                        {onboardingStore.imageUrl != "" &&
                        onboardingStore.image.length > 0 ? (
                            <label
                                htmlFor="contained-button-file"
                                style={{ height: "70%", padding: 2 }}
                            >
                                <img
                                    src={onboardingStore.imageUrl}
                                    alt={onboardingStore.image[0]?.name}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        display: "block",
                                    }}
                                />
                            </label>
                        ) : (
                            <>
                                <AddAPhotoIcon
                                    sx={{ color: "#D3D3D3", fontSize: 40 }}
                                />
                                <Typography className={styles.uploadImageTitle}>
                                    Logo Perusahaan
                                </Typography>
                                <label htmlFor="contained-button-file">
                                    <Button
                                        className={styles.uploadButton}
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        sx={{ textTransform: "none" }}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </>
                        )}
                    </Box>
                    <Typography className={styles.uploadImageRule}>
                        *Maksimal 1mb. Format harus jpg/png.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <InputGrid
                        label={
                            <Typography
                                className={`${styles.inputLabel} ${styles.requiredField}`}
                            >
                                Alamat
                            </Typography>
                        }
                        input={
                            <Box>
                                {onboardingStore.address != "" && (
                                    <Typography sx={{ display: "inline" }}>
                                        {onboardingStore.address}.
                                    </Typography>
                                )}
                                <Typography
                                    className={styles.inputLabelSecondary}
                                    onClick={handleClickOpen}
                                >
                                    {onboardingStore.address != ""
                                        ? "Edit"
                                        : "Tambahkan Alamat"}
                                </Typography>
                            </Box>
                        }
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography className={styles.title}>
                Apakah Anda Akan Menggunakan Modul Akunting?
            </Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={onboardingStore.accountingSetting}
                    onChange={handleChangeAccounting}
                >
                    <FormControlLabel
                        value={"0"}
                        control={<Radio />}
                        label={
                            <Typography className={`${styles.radioLabel}`}>
                                Saya tidak memerlukan pencatatan akunting
                            </Typography>
                        }
                    />
                    <Typography className={styles.radioDescription}>
                        Fitur-fitur di modul akunting akan diabaikan. Anda tidak
                        akan melakukan pencatatan terhadap laba/rugi,
                        hutang/piutang, dan fitur akunting lainnya.
                    </Typography>
                    <FormControlLabel
                        value={"1"}
                        control={<Radio />}
                        label={
                            <Typography className={`${styles.radioLabel}`}>
                                Pakai akunting sebatas pencatatan HPP
                            </Typography>
                        }
                    />
                    <Typography className={`${styles.radioDescription}`}>
                        Anda akan mendapatkan fitur akunting seperti stok,
                        fulfillment, omset dan keuntungan kotor.
                    </Typography>
                    <FormControlLabel
                        value={"2"}
                        control={<Radio />}
                        label={
                            <Typography className={`${styles.radioLabel}`}>
                                Gunakan modul akunting secara lengkap
                            </Typography>
                        }
                    />
                    <Typography className={`${styles.radioDescription}`}>
                        Anda akan mendapatkan fitur akunting seperti stok,
                        fulfillment, omset, keuntungan kotor, penggajian
                        karyawan dan expend.
                    </Typography>
                </RadioGroup>
            </FormControl>
            <form onSubmit={formikAddress.handleSubmit} noValidate>
                <CustomDialogs
                    disablePortal
                    open={open}
                    fullWidth
                    maxWidth="md"
                    titleElement={
                        <Typography className={styles.titleAdress}>
                            Tambah Alamat
                        </Typography>
                    }
                    onClose={handleOnClose}
                    content={
                        <Box sx={{ px: 3 }}>
                            <InputGrid
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                            pt: 2,
                                        }}
                                    >
                                        <Typography
                                            className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            Alamat Lengkap
                                        </Typography>
                                    </Box>
                                }
                                input={
                                    <TextField
                                        inputProps={{
                                            className: styles.inputField,
                                        }}
                                        id="address"
                                        name="address"
                                        placeholder={"Jalan, No, Blok, dll"}
                                        aria-describedby="address-text"
                                        value={formikAddress.values.address}
                                        onChange={formikAddress.handleChange}
                                        multiline
                                        minRows={4}
                                        error={
                                            formikAddress.touched.address &&
                                            Boolean(
                                                formikAddress.errors.address
                                            )
                                        }
                                    />
                                }
                            />
                            <InputGrid
                                label={
                                    <Typography
                                        className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                    >
                                        Provinsi
                                    </Typography>
                                }
                                input={
                                    <Autocomplete
                                        id="state-autocomplete"
                                        value={
                                            formikAddress.values.state != ""
                                                ? formikAddress.values.state
                                                : null
                                        }
                                        aria-describedby="state-text"
                                        onChange={(e, v) => {
                                            formikAddress.setFieldValue(
                                                "state",
                                                v || ""
                                            );
                                        }}
                                        disablePortal
                                        options={provinces()}
                                        onFocus={() =>
                                            onboardingStore.getProvincesData()
                                        }
                                        renderOption={(props, option) => (
                                            <li {...props}>{option}</li>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                name="state"
                                                placeholder={"Pilih Provinsi"}
                                                value={
                                                    formikAddress.values.state
                                                }
                                                error={
                                                    formikAddress.touched
                                                        .state &&
                                                    Boolean(
                                                        formikAddress.errors
                                                            .state
                                                    )
                                                }
                                                className={styles.dropDownInput}
                                                {...params}
                                            />
                                        )}
                                    />
                                }
                            />
                            <InputGrid
                                label={
                                    <Typography
                                        className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                    >
                                        Kota / Kab
                                    </Typography>
                                }
                                input={
                                    <Autocomplete
                                        id="city-autocomplete"
                                        value={
                                            formikAddress.values.city != ""
                                                ? formikAddress.values.city
                                                : null
                                        }
                                        aria-describedby="city-text"
                                        onChange={(e, v) => {
                                            formikAddress.setFieldValue(
                                                "city",
                                                v || ""
                                            );
                                        }}
                                        disablePortal
                                        defaultChecked={false}
                                        options={cities()}
                                        onFocus={() =>
                                            onboardingStore.getCitiesData()
                                        }
                                        renderOption={(props, option) => (
                                            <li {...props}>{option}</li>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                name="city"
                                                placeholder={
                                                    "Pilih Kota/Kabupaten"
                                                }
                                                error={
                                                    formikAddress.touched
                                                        .city &&
                                                    Boolean(
                                                        formikAddress.errors
                                                            .city
                                                    )
                                                }
                                                className={styles.dropDownInput}
                                                {...params}
                                            />
                                        )}
                                    />
                                }
                            />
                            <InputGrid
                                label={
                                    <Typography
                                        className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                    >
                                        Kecamatan
                                    </Typography>
                                }
                                input={
                                    <Autocomplete
                                        id="district-autocomplete"
                                        value={
                                            formikAddress.values.district != ""
                                                ? formikAddress.values.district
                                                : null
                                        }
                                        aria-describedby="district-text"
                                        onChange={(e, v) => {
                                            formikAddress.setFieldValue(
                                                "district",
                                                v || ""
                                            );
                                        }}
                                        disablePortal
                                        options={districts()}
                                        onFocus={() =>
                                            onboardingStore.getDistrictsData()
                                        }
                                        renderOption={(props, option) => (
                                            <li {...props}>{option}</li>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                name="district"
                                                placeholder={"Pilih Kecamatan"}
                                                error={
                                                    formikAddress.touched
                                                        .district &&
                                                    Boolean(
                                                        formikAddress.errors
                                                            .district
                                                    )
                                                }
                                                className={styles.dropDownInput}
                                                {...params}
                                            />
                                        )}
                                    />
                                }
                            />
                            <InputGrid
                                label={
                                    <Typography
                                        className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                    >
                                        Kode Pos
                                    </Typography>
                                }
                                input={
                                    <TextField
                                        inputProps={{
                                            className: styles.inputField,
                                        }}
                                        id="postcode"
                                        name="postcode"
                                        type="tel"
                                        placeholder={"1234"}
                                        aria-describedby="postcode-text"
                                        value={formikAddress.values.postcode}
                                        onChange={formikAddress.handleChange}
                                        error={
                                            formikAddress.touched.postcode &&
                                            Boolean(
                                                formikAddress.errors.postcode
                                            )
                                        }
                                    />
                                }
                            />
                            <InputGrid
                                label={
                                    <Typography
                                        className={`${styles.inputLabelPopup} ${styles.requiredField}`}
                                    >
                                        Negara
                                    </Typography>
                                }
                                input={
                                    <TextField
                                        inputProps={{
                                            className: styles.inputField,
                                        }}
                                        id="country"
                                        name="country"
                                        placeholder={"Masukan Nama Negara"}
                                        aria-describedby="country-text"
                                        value={formikAddress.values.country}
                                        onChange={formikAddress.handleChange}
                                        error={
                                            formikAddress.touched.country &&
                                            Boolean(
                                                formikAddress.errors.country
                                            )
                                        }
                                    />
                                }
                            />
                        </Box>
                    }
                    actionContent={
                        <CustomButton
                            className={styles.modalActionButton}
                            variant={"contained"}
                            name={"Simpan"}
                            type="submit"
                            startIcon={<SaveIcon />}
                        />
                    }
                />
            </form>
        </Box>
    );
};

export default observer(OnboardingStep1);
