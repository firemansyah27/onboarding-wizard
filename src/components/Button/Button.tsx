import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

export const CustomButton: React.FunctionComponent<ButtonProps> = (props) => {
    const {
        id,
        name,
        variant,
        className,
        onClick,
        startIcon,
        endIcon,
        ...properties
    } = props;
    return (
        <Button
            className={className}
            sx={{ textTransform: "none" }}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            id={id}
            {...properties}
        >
            {name}
        </Button>
    );
};
