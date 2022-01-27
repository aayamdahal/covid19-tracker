import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
const Stats = ({ title, cases, total }) => {
  return (
    <Card className="stat-box">
      <CardContent>
        <Typography className="stat-title" color="textSecondary">
          <div style={{ display: "flex" }}> {title}</div>
        </Typography>
        <h2 className="stat-case">{cases}</h2>
        <Typography className="stat-total" color="textSecondary">
          <div style={{ display: "flex" }}> total :{total}</div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
