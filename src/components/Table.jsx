import React from "react";
import { numberWithCommas } from "../Helper";
import "../Table.css";
const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{numberWithCommas(cases)}</td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
