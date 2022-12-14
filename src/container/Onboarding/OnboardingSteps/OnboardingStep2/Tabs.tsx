import * as React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import styles from "./Tabs.module.scss";
import { style } from "@mui/system";
import Accordion from "./Accordion";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};

const CustomTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const indexTab1 = 0;
    const indexTab2 = 1;
    const indexTab3 = 2;

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        sx={{ textTransform: "none" }}
                        label={
                            <Typography
                                className={
                                    value === indexTab1
                                        ? styles.activeTabTitle
                                        : styles.tabTitle
                                }
                            >
                                Channel
                            </Typography>
                        }
                        {...a11yProps(indexTab1)}
                    />
                    <Tab
                        sx={{ textTransform: "none" }}
                        label={
                            <Typography
                                className={
                                    value === indexTab2
                                        ? styles.activeTabTitle
                                        : styles.tabTitle
                                }
                            >
                                Point of Sales
                            </Typography>
                        }
                        {...a11yProps(indexTab2)}
                    />
                    <Tab
                        sx={{ textTransform: "none" }}
                        label={
                            <Typography
                                className={
                                    value === indexTab3
                                        ? styles.activeTabTitle
                                        : styles.tabTitle
                                }
                            >
                                Webstore
                            </Typography>
                        }
                        {...a11yProps(indexTab3)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={indexTab1}>
                <Accordion type="channel" />
            </TabPanel>
            <TabPanel value={value} index={indexTab2}>
                <Accordion type="pos" />
            </TabPanel>
            <TabPanel value={value} index={indexTab3}>
                <Accordion type="webstore" />
            </TabPanel>
        </Box>
    );
};

export default CustomTabs;
