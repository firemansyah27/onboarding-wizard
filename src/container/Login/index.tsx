import React, { useState, useContext } from "react";
import {
    Card,
    Divider,
    TextField,
    Typography,
    Box,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CustomButton } from "../../components/Button/Button";
import styles from "./index.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { observer } from "mobx-react";
import StoreContext from "../../stores";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { onboardingStore } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const validationSchema = yup.object({
        email: yup.string().required(),
        password: yup.string().required(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const user = await onboardingStore.authenticateUser(values);
            if (user.token) {
                navigate("/");
            } else if (user.code) {
                setLoginError(user.code);
            }
        },
    });
    return (
        <Box className={styles.loginContainer}>
            <form onSubmit={formik.handleSubmit}>
                <Card className={styles.formCard}>
                    <Typography className={styles.loginText}>Login</Typography>{" "}
                    <Divider />
                    <TextField
                        name="email"
                        className={styles.loginInput}
                        label="Email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onFocus={() => setLoginError("")}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                    />
                    <FormControl
                        className={styles.loginInput}
                        variant="standard"
                    >
                        <InputLabel
                            htmlFor="standard-adornment-password"
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                        >
                            Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onFocus={() => setLoginError("")}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <CustomButton
                        className={styles.loginButton}
                        variant="contained"
                        type="submit"
                        name={"Login"}
                    />
                    {loginError && (
                        <Typography className={styles.loginError}>
                            {loginError}
                        </Typography>
                    )}
                </Card>
            </form>
        </Box>
    );
};

export default observer(Login);
