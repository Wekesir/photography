import React from "react";
import { getRealFileName, getFileNameExtension } from "../utils/helpers";

export default function FileDetails({ file, project }) {
  return (
    <React.Fragment>
      <div className="text-center text-white-50" style={{ fontSize: "80px" }}>
        <i className="bi bi-file-earmark-image"></i>
      </div>
      <table className="table table-sm table-borderless table-dark">
        <tbody>
          <tr>
            <th scope="row">File name</th>
            <td> {getRealFileName(file.filename)} </td>
          </tr>
          <tr>
            <th scope="row">File type</th>
            <td> {getFileNameExtension(file.filename)} </td>
          </tr>
          <tr>
            <th scope="row">Size</th>
            <td>Larry</td>
          </tr>
          <tr>
            <th scope="row">Project</th>
            <td> {project} </td>
          </tr>
          <tr>
            <th scope="row">Modified</th>
            <td> {file.created_on ?? "NULL"} </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}
