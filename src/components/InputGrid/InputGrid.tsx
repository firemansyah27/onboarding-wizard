import React, { ReactElement } from "react";
import { Input, Grid } from "@mui/material";
interface Props {
  label: ReactElement;
  input: ReactElement;
}
const InputGrid: React.FunctionComponent<Props> = ({ label, input }) => {
  return (
    <Grid sx={{ mb: 3 }} container spacing={2}>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {label}
      </Grid>
      <Grid item xs={9} sx={{ display: "flex", flexDirection: "column" }}>
        {input}
      </Grid>
    </Grid>
  );
};

export default InputGrid;
