import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthed } from "../../utils/authentication";

const PrivateRoutes = () => {
    const auth = isAuthed();
    return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoutes;
