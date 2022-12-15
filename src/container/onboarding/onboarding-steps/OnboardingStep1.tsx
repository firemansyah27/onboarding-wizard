import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography,
  Input,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import styles from "./OnboardingStep1.module.scss";
import Divider from "@mui/material/Divider";
import InputGrid from "../../../components/InputGrid/InputGrid";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CustomDialogs from "../../../components/Dialog/Dialog";
import CustomButton from "../../../components/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import StoreContext from "../../../stores";
import { observer } from "mobx-react";
import * as yup from "yup";
import { CollectionsOutlined } from "@mui/icons-material";

interface Props {
  submitRef1?: React.LegacyRef<HTMLButtonElement> | undefined;
}

interface CompanyData {
  company_name: string | null;
  website: string | null;
  npwp: string | null;
}

const OnboardingStep1: React.FunctionComponent<Props> = ({ submitRef1 }) => {
  const [value, setValue] = useState("female");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("Jl asdf. asdfj. adfjkl");
  const { onboardingStore } = useContext(StoreContext);

  useEffect(() => {
    setTimeout(() => {
      console.log(onboardingStore.profileData);
      console.log("trigger get data");
      onboardingStore.getProfileData();
      console.log(onboardingStore.profileData);
    }, 3000);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const initialCompanyData = (): CompanyData => {
    const profileData = onboardingStore.profileData;
    return {
      company_name: profileData.company_name,
      website: profileData.website,
      npwp: profileData.npwp,
    };
  };

  // const initialAddressData = () => {};

  const validationSchema = yup.object({
    company_name: yup.string().required(),
    website: yup.string(),
    npwp: yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: onboardingStore.profileData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box className={styles.step1Container}>
      <Typography className={styles.title}>Informasi Perusahaan</Typography>
      <Typography className={styles.titleDescription}>
        Lengkapi informasi umum perusahaan dan tentukan pencatatan keuangan
        Anda.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography className={styles.generatlInformation}>
        Informasi Umum
      </Typography>
      <Grid className={styles.formContainer} container spacing={2}>
        <Grid item xs={9}>
          <form onSubmit={formik.handleSubmit} noValidate>
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
                  inputProps={{ className: styles.inputField }}
                  id="company_name"
                  name="company_name"
                  placeholder={"Masukkan nama perusahaan"}
                  aria-describedby="company-name-text"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.company_name &&
                    Boolean(formik.errors.company_name)
                  }
                />
              }
            />
            <InputGrid
              label={
                <Typography className={styles.inputLabel}>Website</Typography>
              }
              input={
                <TextField
                  inputProps={{ className: styles.inputField }}
                  id="website"
                  name="website"
                  placeholder={"Masukkan situs website"}
                  aria-describedby="website-text"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                />
              }
            />
            <InputGrid
              label={
                <Typography className={styles.inputLabel}>NPWP</Typography>
              }
              input={
                <TextField
                  inputProps={{ className: styles.inputField }}
                  id="npwp"
                  name="npwp"
                  placeholder={"Masukkan no. NPWP"}
                  aria-describedby="npwp-text"
                  value={formik.values.npwp}
                  onChange={formik.handleChange}
                  error={formik.touched.npwp && Boolean(formik.errors.npwp)}
                />
              }
            />
            <InputGrid
              label={
                <Typography
                  className={`${styles.inputLabel} ${styles.requiredField}`}
                >
                  Alamat
                </Typography>
              }
              input={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {onboardingStore.address != "" && (
                    <Typography>{onboardingStore.address}.</Typography>
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
            <button
              ref={submitRef1}
              type="submit"
              style={{ display: "none" }}
            />
          </form>
        </Grid>
        <Grid item xs={3} className={styles.uploadImageContainer}>
          <Box className={styles.uploadImage}>
            <AddAPhotoIcon sx={{ color: "#D3D3D3", fontSize: 40 }} />
            <Typography className={styles.uploadImageTitle}>
              Logo Perusahaan
            </Typography>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
            />
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
          </Box>
          <Typography className={styles.uploadImageRule}>
            *Maksimal 1mb. Format harus jpg/png.
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography className={styles.title}>
        Apakah Anda Akan Menggunakan Modul Akunting?
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label={
              <Typography className={`${styles.radioLabel}`}>
                Saya tidak memerlukan pencatatan akunting
              </Typography>
            }
          />
          <Typography className={`${styles.radioDescription}`}>
            Fitur-fitur di modul akunting akan diabaikan. Anda tidak akan
            melakukan pencatatan terhadap laba/rugi, hutang/piutang, dan fitur
            akunting lainnya.
          </Typography>
          <FormControlLabel
            value={2}
            control={<Radio />}
            label={
              <Typography className={`${styles.radioLabel}`}>
                Pakai akunting sebatas pencatatan HPP
              </Typography>
            }
          />
          <Typography className={`${styles.radioDescription}`}>
            Anda akan mendapatkan fitur akunting seperti stok, fulfillment,
            omset dan keuntungan kotor.
          </Typography>
          <FormControlLabel
            value={3}
            control={<Radio />}
            label={
              <Typography className={`${styles.radioLabel}`}>
                Gunakan modul akunting secara lengkap
              </Typography>
            }
          />
          <Typography className={`${styles.radioDescription}`}>
            Anda akan mendapatkan fitur akunting seperti stok, fulfillment,
            omset, keuntungan kotor, penggajian karyawan dan expend.
          </Typography>
        </RadioGroup>
      </FormControl>
      <CustomDialogs
        open={open}
        title={<Typography>Tambah Alamat</Typography>}
        onClose={handleOnClose}
        content={
          <Box>
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
                  inputProps={{ className: styles.inputField }}
                  id="my-input2"
                  placeholder={"Masukan Nama 1"}
                  aria-describedby="my-helper-text"
                  required
                />
              }
            />
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
                  inputProps={{ className: styles.inputField }}
                  id="my-input2"
                  placeholder={"Masukan Nama 1"}
                  aria-describedby="my-helper-text"
                  required
                />
              }
            />
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
                  inputProps={{ className: styles.inputField }}
                  id="my-input2"
                  placeholder={"Masukan Nama 1"}
                  aria-describedby="my-helper-text"
                  required
                />
              }
            />
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
                  inputProps={{ className: styles.inputField }}
                  id="my-input2"
                  placeholder={"Masukan Nama 1"}
                  aria-describedby="my-helper-text"
                  required
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
            onClick={handleOnClose}
            startIcon={<SaveIcon />}
          />
        }
      />
    </Box>
  );
};

export default observer(OnboardingStep1);
