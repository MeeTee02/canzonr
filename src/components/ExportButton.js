import React from "react";
import "../styles/export-button.scss";
import { CSVLink } from "react-csv";

const ExportButton = ({ data, filename, isGenre = false }) => {
  const headers = [{ label: "Name", key: isGenre ? "genre" : "name" }];
  console.log(data);

  return (
    <CSVLink data={data} headers={headers} filename={`${filename}.csv`} className="export-button">
      Export
    </CSVLink>
  );
};

export default ExportButton;
