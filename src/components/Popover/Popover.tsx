import React, { ReactElement } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import styles from "./Popover.module.scss";
import PopoverContent1 from "./Content/PopoverContent1";
PopoverContent1;
interface Props {
    onClose: () => void;
    childNode: HTMLElement | null;
}

const BasicPopover: React.FunctionComponent<Props> = ({
    childNode,
    onClose,
}) => {
    const open = Boolean(childNode);
    const id = open ? "simple-popover" : undefined;

    const contents = [<PopoverContent1 key="Popover-content-1" />];

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={childNode}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            PaperProps={{
                style: {
                    overflowX: "unset",
                    overflowY: "unset",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    borderRadius: 0,
                },
            }}
        >
            <Box
                className={styles.MuiPopoverPaper}
                sx={{ backgroundColor: "primary.main", borderRadius: 3 }}
            >
                {contents[0]}
            </Box>
            <Box
                sx={{
                    position: "relative",
                    mt: "10px",
                    "&::before": {
                        backgroundColor: "primary.main",
                        content: '""',
                        display: "block",
                        position: "absolute",
                        width: 12,
                        height: 12,
                        top: -17,
                        transform: "rotate(45deg)",
                        left: "calc(90% - 6px)",
                    },
                }}
            />
        </Popover>
    );
};

export default BasicPopover;
