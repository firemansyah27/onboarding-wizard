import React, { useState } from "react";
import "./App.scss";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./container/PrivateRoutes";
import Login from "./container/Login";
import LoginRoutes from "./container/Login/LoginRoutes";

const theme = createTheme({
    typography: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    },
    palette: {
        primary: { main: "#4B68EF" },
        text: {
            primary: "#163A50",
            secondary: "#4B68EF",
            disabled: "#E4E7EC",
        },
    },
    components: {
        MuiStepConnector: {
            styleOverrides: {
                lineVertical: {
                    minHeight: 32,
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    {routes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>
                <Route element={<LoginRoutes />}>
                    <Route key={"login"} path={"/login"} element={<Login />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default observer(App);
