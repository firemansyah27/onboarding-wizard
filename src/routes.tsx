import React from "react";
import Onboarding from "./container/Onboarding";
import CloseWindow from "./container/Onboarding/CloseWindow";

const routes = [
    {
        path: "/",
        element: <Onboarding />,
    },
    {
        path: "/closewindow",
        element: <CloseWindow />,
    },
];

export default routes;
