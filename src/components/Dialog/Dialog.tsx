import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose?: () => void;
}

const BootstrapDialogTitle: React.FunctionComponent<DialogTitleProps> = (
    props
) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export interface CustomDialogProps extends DialogProps {
    titleElement: ReactElement | undefined;
    content: ReactElement | undefined;
    actionContent: ReactElement | undefined;
    onClose?: () => void;
    dividers?: boolean;
}

const CustomDialogs: React.FunctionComponent<CustomDialogProps> = (props) => {
    const {
        titleElement,
        open,
        content,
        actionContent,
        onClose,
        dividers,
        ...properties
    } = props;

    return (
        <div>
            <BootstrapDialog
                {...properties}
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    style: {
                        borderRadius: 10,
                    },
                }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={onClose}
                >
                    {titleElement}
                </BootstrapDialogTitle>
                <DialogContent dividers={dividers}>{content}</DialogContent>
                <DialogActions>{actionContent}</DialogActions>
            </BootstrapDialog>
        </div>
    );
};

CustomDialogs.defaultProps = { dividers: true };
export default CustomDialogs;
