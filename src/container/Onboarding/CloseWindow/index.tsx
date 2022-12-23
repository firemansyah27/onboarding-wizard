import React, { useEffect } from "react";

const CloseWindow = () => {
    useEffect(() => {
        const newwindow = window.open("", "closewindow");
        newwindow?.close();
    }, []);
    return <></>;
};

export default CloseWindow;
