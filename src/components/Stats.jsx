import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "../App.css";
const Stats = ({ title, cases, total, icon }) => {
  return (
    <Card className="stat-box">
      <CardContent className="card">
        <Typography
          className="stat-title"
          color="textSecondary"
          style={{ fontSize: "1.2rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
            {title}
          </div>
        </Typography>
        <h2 className="stat-case">{cases}</h2>
        <Typography className="stat-total" color="textSecondary">
          <div style={{ display: "flex" }}> Total: {total}</div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
