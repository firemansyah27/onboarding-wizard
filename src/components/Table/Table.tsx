import React, { FunctionComponent, ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

type Props = {
    fields: string[];
    body: ReactNode;
};

const CustomTable: FunctionComponent<Props> = (props) => {
    const { fields, body } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {fields.map((value) => (
                            <TableCell key={value}>{value}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
