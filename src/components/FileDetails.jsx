import React from 'react'
import { getRealFileName, getFileNameExtension } from '../utils/helpers';

export default function FileDetails({file, project}) { 
  return (
    <React.Fragment>
        <div className="text-center text-white-50" style={{fontSize:'120px'}}>
        <i className="bi bi-file-earmark-image"></i>
        </div>
        <table className="table table-sm table-border table-dark" >
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
            <td> {file.created_on} </td>
            </tr>
        </tbody>
        </table>
    </React.Fragment>
  )
}
