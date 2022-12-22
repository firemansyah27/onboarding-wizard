import React, { FunctionComponent, ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import styles from "./Table.module.scss";

interface Column {
    [key: string]: string | number;
}

type Props = {
    fields: Column[];
    body: ReactNode;
};

const CustomTable: FunctionComponent<Props> = (props) => {
    const { fields, body } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {fields.map((value) => (
                            <TableCell
                                key={value.name}
                                className={styles.tableHead}
                                style={{ width: value.width }}
                            >
                                {value.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
